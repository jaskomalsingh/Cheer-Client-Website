import React, { useState, useEffect } from 'react';
import Header from './Header'; // Adjust the path as necessary
import Footer from './Footer'; // Adjust the path as necessary
import '../styles/ChatroomPage.css'; // Ensure you create and link the CSS file for this page

function ChatroomPage() {
    const [chatrooms, setChatrooms] = useState([]); // State to hold the list of chatrooms
    const [currentRoom, setCurrentRoom] = useState(null); // State to track the current room

    useEffect(() => {
        // Call the backend API to fetch chatrooms when the component mounts
        fetch('http://localhost:3001/api/auth/getchatrooms')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setChatrooms(data);
            })
            .catch((error) => {
                console.error('Error fetching chatrooms:', error);
            });
    }, []);

    return (
        <div className="chatroom-page">
            <Header />
            <div className="chatroom-content">
                <aside className="sidebar">
                    {chatrooms.map(chatroom => (
                        <div key={chatroom._id} className="chatroom-entry" onClick={() => setCurrentRoom(chatroom)}>
                            <img src={chatroom.image} alt="Chatroom" className="chatroom-image" />
                            <span className="chatroom-name">{chatroom.name}</span>
                        </div>
                    ))}
                </aside>
                <main className="chat-area">
                    {!currentRoom ? (
                        <div className="chat-prompt">Please open a chatroom to start chatting.</div>
                    ) : (
                        <>
                            <div className="chatroom-header">{currentRoom.name}</div>
                            <div className="chat-messages">
                                {/* Sort and map through currentRoom.messages to display messages */}
                                {currentRoom.messages
                                    .sort((a, b) => (a._id > b._id ? 1 : -1))
                                    .map((message) => (
                                        <div
                                            key={message._id}
                                            className={`message ${message.senderEmail === localStorage.getItem('email') ? 'sent' : 'received'}`}
                                        >
                                            <span className="message-author">{message.senderEmail === localStorage.getItem('email') ? 'You' : message.senderEmail}</span>: <span className="message-content">{message.content}</span>
                                        </div>
                                    ))}
                            </div>
                        </>
                    )}
                    <div className="message-input">
                        <input type="text" placeholder="Type a message..." />
                        <button>Send</button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default ChatroomPage;
