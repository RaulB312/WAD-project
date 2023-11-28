// CreateMessage.js

import React, { useState } from 'react';
import axios from './Api';
import './FormStyles.css';

function CreateMessage() {
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  const handleCreateMessage = async () => {
    try {
      const response = await axios.post('/api/messages', {
        userId: localStorage.getItem('userId'),
        text: text,
      },{
        params: {
          token: token
        }
      });
      // Optionally, handle success response
      console.log('Message created:', response.data);
      // Clear the input field
      setText('');
    } catch (error) {
      // Handle create message error
      console.error('Error creating message:', error);
    }
  }

  return (
    <div className="form-container">
      <h2>Create a Message</h2>
      <form>
        <label htmlFor="message">Message Text:</label>
        <input
          type="text"
          id="message"
          placeholder="Enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="button" onClick={handleCreateMessage}>Create Message</button>
      </form>
    </div>
  );
}

export default CreateMessage;
