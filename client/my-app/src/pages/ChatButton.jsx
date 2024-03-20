import React from 'react';
import { Link } from 'react-router-dom';
import chatIcon from '../assets/chat.png';
import '../styles/ChatButton.css'; // Path to your CSS file for this component

const ChatButton = () => {
  const role = localStorage.getItem('role');
  if (!role) {
    return null;
  }

  return (
    <Link to="/chatrooms" className="chat-fab">
      <img src={chatIcon} alt="Chat" />
    </Link>
  );
};

export default ChatButton;
