import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'; // Adjust the path as necessary
import Footer from './Footer'; // Adjust the path as necessary
import '../styles/ChatroomPage.css'; // Ensure you create and link the CSS file for this page
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SpeechButton from "./TextToSpeech";

function ChatroomPage() {
    const [socket, setSocket] = useState(null);
    const [chatrooms, setChatrooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messageText, setMessageText] = useState('');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('fullname');
    const messagesEndRef = useRef(null);
    const currentRoomRef = useRef(currentRoom); // Ref to track the current room
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('role') === 'admin';
    const [selectedMessageId, setSelectedMessageId] = useState(null); // State to track selected message

    useEffect(() => {
        currentRoomRef.current = currentRoom; // Update ref whenever currentRoom changes
    }, [currentRoom]);

    useEffect(() => {
        const role = localStorage.getItem('role'); // Get role from localStorage

        // Redirect if not admin
        if (role == 'user' || !role) {
            navigate('/'); // Redirect to home page or a designated "not authorized" page
        }
        const forceUpdate = () => setCurrentRoom((prevRoom) => ({ ...prevRoom }))
        const newSocket = io('http://localhost:3001', {
            withCredentials: true,
            path: '/socket.io/',
        });
        setSocket(newSocket);

        newSocket.emit('getChatrooms', { role });

        newSocket.on('chatrooms', (data) => {
            setChatrooms(data);
        });

        newSocket.on('newMessage', (newMessage) => {
            if (currentRoomRef.current && newMessage.chatroomId === currentRoomRef.current._id) {
                setCurrentRoom((prevRoom) => {
                    // Check if the incoming message lacks a timestamp
                    if (!newMessage.timestamp) {
                        // Assign a client-side temporary timestamp
                        newMessage.timestamp = new Date().toISOString();
                    }
                    // If the message is for another room, ignore it
                    if (newMessage.chatroomId !== prevRoom._id) {
                        return prevRoom;
                    }

                    // If it's for the current room, append and sort
                    const newMessages = [...prevRoom.messages, newMessage];
                    newMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                    return { ...prevRoom, messages: newMessages };
                });
            }
        });
        newSocket.on('messageDeleted', (deletedMessage) => {
            // Ensure there's a current room and the deleted message belongs to this room
            if (currentRoomRef.current && deletedMessage.chatroomId === currentRoomRef.current._id) {
                setCurrentRoom((prevRoom) => {
                    // If the message is for another room, ignore it
                    if (deletedMessage.chatroomId !== prevRoom._id) {
                        return prevRoom;
                    }
        
                    // Filter out the deleted message by its ID
                    const updatedMessages = prevRoom.messages.filter((message) => message._id !== deletedMessage.messageId);
                    
                    return { ...prevRoom, messages: updatedMessages };
                });
            }
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (!socket || !currentRoom || messageText.trim() === '') return;

        const newMessage = {
            senderEmail: email,
            content: messageText,
            name: name,
            chatroomId: currentRoom._id,
        };

        socket.emit('sendMessage', currentRoom._id, newMessage);
        setMessageText('');
    };

    const handleChatroomClick = (chatroom) => {
        setCurrentRoom(chatroom);
        if (socket) {
            socket.emit('joinRoom', chatroom._id);
        }
    };

    const scrollToBottom = () => {
        // Assuming .chat-messages is the class for your chat messages container
        const chatMessagesContainer = document.querySelector('.chat-messages');

        if (chatMessagesContainer) {
            // Scroll to the bottom of the chat messages container
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }
    };
    const handleDeleteMessage = (messageToDel) => {
        if (!isAdmin) return;
        socket.emit('deleteMessage', messageToDel);
        setCurrentRoom((prevRoom) => {
            const updatedMessages = prevRoom.messages.filter((message) => message !== messageToDel);
            return { ...prevRoom, messages: updatedMessages };
        });
        setSelectedMessageId(null); // Reset selected message ID after deletion
        console.log("chatroomid", currentRoomRef.current._id, "messageToDel", messageToDel)
    };

    const handleSelectMessage = (messageId) => {
        if (selectedMessageId === messageId) {
            setSelectedMessageId(null); // Unset the selectedMessageId if the same message is clicked again
        } else {
            setSelectedMessageId(messageId); // Set the selectedMessageId to the clicked message's ID
        }
    };

    const toggleMessageSelect = (message) => {
        setCurrentRoom((prevRoom) => {
            const updatedMessages = prevRoom.messages.map((messages) => {
                if (messages === message) {
                    return { ...message, selected: !message.selected };
                }
                return message;
            });
            console.log("updatedMessages", message)

            return { ...prevRoom, messages: updatedMessages };
        });
    };


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    };

    useEffect(scrollToBottom, [currentRoom?.messages]);

    return (
        <div className="chatroom-page">
            <Header />
            <div className="chatroom-content">
                <aside className="sidebar">
                    {chatrooms.map((chatroom) => (
                        <div key={chatroom._id} className="chatroom-entry" onClick={() => handleChatroomClick(chatroom)}>
                            <img src={chatroom.image} alt="Chatroom" className="chatroom-image" />
                            <span className="chatroom-name">{chatroom.name}</span>
                        </div>
                    ))}
                </aside>
                <main className="chat-area">
                    {!currentRoom ? (
                        <div className="chat-prompt">Please select a chatroom to start chatting.</div>
                    ) : (
                        <>
                            <div className="chatroom-header">{currentRoom.name}</div>
                            <div className="chat-messages">
                                {currentRoom.messages
                                    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                                    .map((message, index) => (
                                        <div key={index}
                                            className={`message ${message.senderEmail === email ? 'sent' : 'received'} ${message.selected ? 'selected' : ''}`}
                                            title={formatDate(message.timestamp)}
                                            onClick={() => handleSelectMessage(message)} // Toggle select on click
                                        >
                                            {isAdmin && selectedMessageId === message && (
                                <span className="delete-button" onClick={() => handleDeleteMessage(message)}>Delete</span>
                            )}
                                            <span className="message-author">{message.senderEmail === email ? 'You' : message.name}</span>: <span className="message-content">{message.content}</span>
                                        </div>
                                    ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && messageText.trim()) {
                                            sendMessage();
                                        }
                                    }}
                                />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </>
                    )}
                </main>
            </div>
            <SpeechButton />
            <Footer />
        </div>
    );
}

export default ChatroomPage;
