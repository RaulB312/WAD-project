import { useState } from 'react';
import axios from './Api';

const AuthPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [adminRegisterPassword, setAdminRegisterPassword] = useState('');
  const [pass, setPass] = useState('');

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
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.id);
        setToken(user.token); // Set token in state or context
      }
      // Handle successful login
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', {
        username: registerUsername,
        password: registerPassword,
      });

      const user = response.data;

      if (user.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.id);
        setToken(user.token); // Set token in state or context
      }

      // Optionally, you can navigate to another page or update the UI for successful registration
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error);
    }
  };


  const handleAdminRegister = async () => {
    try {
      const response = await axios.post('/register/admin', {
        username: registerUsername,
        password: adminRegisterPassword,
      }, {
        params: {
          'pass': pass,
        }
      });

      const user = response.data;

      if (user.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.id);
        setToken(user.token); // Set token in state or context
      }

      // Optionally, you can navigate to another page or update the UI for successful admin registration
    } catch (error) {
      // Handle admin registration error
      console.error('Admin registration error:', error);
    }
  };



  return (
    <div className="form-container">
      <div>
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
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
      <div>
        <h2>Register</h2>
        <form>
          <label htmlFor="registerUsername">Username:</label>
          <input
            type="text"
            id="registerUsername"
            placeholder="Enter your username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <label htmlFor="registerPassword">Password:</label>
          <input
            type="password"
            id="registerPassword"
            placeholder="Enter your password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
      <div>
        <h2>Admin Register</h2>
        <form>
          <label htmlFor="registerUsername">Username:</label>
          <input
            type="text"
            id="registerUsername"
            placeholder="Enter your username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <label htmlFor="adminRegisterPassword">Password:</label>
          <input
            type="password"
            id="adminRegisterPassword"
            placeholder="Enter your password"
            value={adminRegisterPassword}
            onChange={(e) => setAdminRegisterPassword(e.target.value)}
          />
          <label htmlFor="pass">Admin Pass:</label>
          <input
            type="password"
            id="pass"
            placeholder="Enter admin pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="button" onClick={handleAdminRegister}>
            Admin Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
