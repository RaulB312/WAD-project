// Login.js

import React, { useState } from 'react';
import axios from './Api';
import './FormStyles.css'; // Import the common styles

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('/login', {
        params: {
          username: username,
          password: password,
        },
      });
      const user = response.data;
      if (user.token) {
        // Store the token in local storage
        localStorage.setItem('token', user.token);
        // Optionally, you can store other user data as well
        localStorage.setItem('userId', user.id);
      }
      // Store user data in your application state or context
    } catch (error) {
      // Handle login error
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
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
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;
