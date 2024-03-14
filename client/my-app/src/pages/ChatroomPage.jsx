import React, { useState, useEffect } from 'react';
import Header from './Header'; // Adjust the path as necessary
import Footer from './Footer'; // Adjust the path as necessary
import '../styles/ChatroomPage.css'; // Ensure you create and link the CSS file for this page
import io from 'socket.io-client';

function ChatroomPage() {
    const [socket, setSocket] = useState(null);
    const [chatrooms, setChatrooms] = useState([]); // State to hold the list of chatrooms
    const [currentRoom, setCurrentRoom] = useState(null); // State to track the current room
    const [messageText, setMessageText] = useState(''); // State to track messaged typed
    const email = localStorage.getItem('email')
    const name = localStorage.getItem('fullname')

    useEffect(() => {
    if (socket == null || currentRoom == null) return;

    // Listen for new messages
    const handleNewMessage = (newMessage) => {
        // Update the currentRoom state with the new message
        setCurrentRoom(prevRoom => {
            const updatedMessages = [...prevRoom.messages, newMessage];
            return { ...prevRoom, messages: updatedMessages };
        });
    };

    socket.on('newMessage', handleNewMessage);

    // Cleanup
    return () => {
        socket.off('newMessage', handleNewMessage);
    };
}, [socket, currentRoom]);

    useEffect(() => {
        // Establish WebSocket connection
        const newSocket = io('http://localhost:3001', {
        withCredentials: true, // Send credentials with the request (like cookies or authentication headers)
        path: '/socket.io' // Specify the path if your server is configured to use a custom path
});
        setSocket(newSocket);

        // Fetch chatrooms using WebSocket
        newSocket.emit('getChatrooms');

        // Listen for incoming chatrooms from the server
        newSocket.on('chatrooms', (data) => {
            setChatrooms(data);
        });

        // Cleanup function to close WebSocket connection
        return () => newSocket.close();
    }, []);

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

    const sendMessage = () => {
        if (!socket || !currentRoom || messageText.trim() === '') return;
        
    
        const newMessage = {
            senderEmail: email,
            content: messageText,
            timestamp: new Date(),
            name: name
        };
        alert(currentRoom._id + " "+ newMessage.senderEmail)
    
        socket.emit('sendMessage', currentRoom._id, newMessage);
        
    
        setMessageText('');
    };
    const handleChatroomClick = (chatroom) => {
        
        setCurrentRoom(chatroom);
        if (socket) {
            socket.emit('joinRoom', chatroom._id);
        }
    };
   


    // const sendMessage = async () => {
    //     if (!currentRoom || messageText.trim() === '') return;

    //     try {
    //         const response = await fetch(`http://localhost:3001/api/auth/chatrooms/${currentRoom._id}/send`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 content: messageText,
    //                 senderEmail: email, // Assuming you store email in localStorage
    //                 name: name
                    
    //                 // Add other required fields...
    //             }),
    //         });

    //         if (response.status != 200) alert("error");
    //         // throw new Error('Failed to send message');

    //         const result = await response.json();
    //         console.log('Message sent:', result);
    //         setMessageText(''); // Clear the input after sending
    //         // Optionally, fetch the updated messages for the currentRoom here
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // };

    return (
        <div className="chatroom-page">
            <Header />
            <div className="chatroom-content">
                <aside className="sidebar">
                    {chatrooms.map(chatroom => (
                        <div key={chatroom._id} className="chatroom-entry" onClick={() => handleChatroomClick(chatroom)}>
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
                                    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                                    .map((message) => (
                                        <div
                                            key={message._id}
                                            className={`message ${message.senderEmail === localStorage.getItem('email') ? 'sent' : 'received'}`}
                                        >
                                            <span className="message-author">{message.senderEmail === localStorage.getItem('email') ? 'You' : message.name}</span>: <span className="message-content">{message.content}</span>
                                        </div>
                                    ))}

                            </div>
                        </>
                    )}
                    <div className="message-input">
                        <input 
                        type="text" 
                        placeholder="Type a message..." 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send</button>
                        
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default ChatroomPage;
