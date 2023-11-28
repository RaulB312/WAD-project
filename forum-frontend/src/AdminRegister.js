// AdminRegister.js

import React, { useState } from 'react';
import axios from './Api';
import './FormStyles.css'; // Import the common styles

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pass, setPass] = useState('');

  const handleAdminRegister = async () => {
    try {
      const response = await axios.post('/register/admin', {
        username,
        password,
      }, {
        params: {
          'pass': pass,
        }
      });
      const user = response.data;
      // Store user data in your application state or context
    } catch (error) {
      // Handle admin registration error
    }
  }

  return (
    <div className="form-container">
      <h2>Admin Registration</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="pass">Admin Pass:</label>
        <input
          type="password"
          id="pass"
          placeholder="Enter admin pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="button" onClick={handleAdminRegister}>Register as Admin</button>
      </form>
    </div>
  );
}

export default AdminRegister;
