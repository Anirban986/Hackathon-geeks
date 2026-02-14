import React from 'react';
import './ChatbotPopup.css';
import Chatbot from '../chatbot/Chatbot';

const ChatbotPopup = ({ onClose }) => {
  return (
    <div className="chatbot-overlay">
      <div className="chatbot-window">
      
        <Chatbot />
      </div>
    </div>
  );
};
export default ChatbotPopup;