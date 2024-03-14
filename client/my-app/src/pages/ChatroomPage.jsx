import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'; // Adjust the path as necessary
import Footer from './Footer'; // Adjust the path as necessary
import '../styles/ChatroomPage.css'; // Ensure you create and link the CSS file for this page
import io from 'socket.io-client';

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
        const newSocket = io('http://localhost:3001', {
            withCredentials: true,
            path: '/socket.io',
        });
        setSocket(newSocket);

        newSocket.emit('getChatrooms');

        newSocket.on('chatrooms', (data) => {
            setChatrooms(data);
        });

        newSocket.on('newMessage', (newMessage) => {
            alert("new msg")
            const currentRoom = currentRoomRef.current; // Access the current room from the ref
            if (currentRoom && newMessage.chatroomId === currentRoom._id) {
                setCurrentRoom((prevRoom) => {
                    if (prevRoom._id === newMessage.chatroomId) {
                        return {
                            ...prevRoom,
                            messages: [...prevRoom.messages, newMessage],
                        };
                    }
                    return prevRoom;
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
            timestamp: new Date(),
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
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
                                <input type="text" placeholder="Type a message..." value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default ChatroomPage;
