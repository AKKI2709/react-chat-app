import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import './App.css';

const user_list = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin'];

const App = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== '') {
      const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = {
        username: randomUser,
        content: message,
        likes: 0,
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage('');
    }
  };

  const handleLikeClick = (index) => {
    const updatedMessages = [...chatMessages];
    updatedMessages[index].likes += 1;
    setChatMessages(updatedMessages);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="message-thread">
          {chatMessages.map((message, index) => (
            <div key={index} className="message">
              <div className="message-content">
                <span className="username">{message.username}: </span>
                <span className="content">{message.content}</span>
              </div>
              <div className="message-actions">
                <button className="like-button" onClick={() => handleLikeClick(index)}>
                  <FaThumbsUp />
                </button>
                <span className="like-count">{message.likes}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <textarea
            className="message-input"
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button className="send-button" onClick={handleSendClick}>
            Send
          </button>
        </div>
      </div>
      <Picker
        onSelect={handleEmojiSelect}
        set="apple"
        emojiSize={24}
        sheetSize={32}
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '10px',
        }}
      />
    </div>
  );
};

export default App;
