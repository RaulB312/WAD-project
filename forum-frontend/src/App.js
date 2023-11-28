// App.js
import React, { useState, useEffect } from 'react';
import ForumPage from './ForumPage';
import AuthPage from './AuthPage';
import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // You might want to add additional logic here to handle token expiration or other scenarios.
  }, [token]);

  return (
    <div>
      {token ? (
        <ForumPage token={token} />
      ) : (
        <AuthPage setToken={setToken} />
      )}
    </div>
  );
}

export default App;