import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'; // Adjust the path as necessary
import Footer from './Footer'; // Adjust the path as necessary
import '../styles/ChatroomPage.css'; // Ensure you create and link the CSS file for this page
import io from 'socket.io-client';
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

    useEffect(() => {
        currentRoomRef.current = currentRoom; // Update ref whenever currentRoom changes
    }, [currentRoom]);

    useEffect(() => {
        const forceUpdate = () => setCurrentRoom((prevRoom) => ({ ...prevRoom }))
        const newSocket = io('http://localhost3001:', {
            withCredentials: true,
            path: '/socket.io/',
        });
        setSocket(newSocket);

        newSocket.emit('getChatrooms');

        newSocket.on('chatrooms', (data) => {
            setChatrooms(data);
        });

        newSocket.on('newMessage', (newMessage) => {
            if (currentRoomRef.current && newMessage.chatroomId === currentRoomRef.current._id) {
                setCurrentRoom((prevRoom) => {
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
                                        <div key={index} className={`message ${message.senderEmail === email ? 'sent' : 'received'}`}>
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
            <SpeechButton/>
            <Footer />
        </div>
    );
}

export default ChatroomPage;
