import { useEffect, useState } from 'react';
import axios from './Api';


const ForumPage = () => {
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
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
      // Update the messages state with the new message
      setMessages([...messages, response.data]);
      // Optionally, handle success response
      console.log('Message created:', response.data);
      // Clear the input field
      setText('');
    } catch (error) {
      // Handle create message error
      console.error('Error creating message:', error);
    }
  }

  
  const handleDeleteMessage = async (id) => {
    try {
      // Get user information to check admin status
      const userResponse = await axios.get('/api/Users/', {
        params: {
          token: token,
        },
      });
  
      const isAdmin = userResponse.data.isAdmin;
  
      // Check if the user is an admin before deleting the message
      if (isAdmin) {
        await axios.delete(`/api/messages?id=${id}`, {
          params: {
            token: token,
          },
        });
  
        // Update the messages state by removing the deleted message
        setMessages(messages.filter((message) => message.id !== id));
        console.log('Message deleted successfully');
      } else {
        console.log('User is not authorized to delete messages');
        // Optionally, show a notification or handle unauthorized deletion
      }
    } catch (error) {
      // Handle delete message error
      console.error('Error deleting message:', error);
    }
  };


  const handleLogout = () => {
    // Clear token and user ID from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Redirect to the login page
    window.location.reload();
  };


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Get user information to check admin status
        const userResponse = await axios.get('/api/Users/', {
          params: {
            token: token,
          },
        });

        const isAdmin = userResponse.data.isAdmin;

        // Fetch messages based on admin status
        const messagesResponse = isAdmin
          ? await axios.get('/api/messages/all', {
              params: {
                token: token,
              },
            })
          : await axios.get('/api/messages', {
              params: {
                token: token,
              },
            });

        // Set the fetched messages in the state
        setMessages(messagesResponse.data);
      } catch (error) {
        // Handle fetch messages error
        console.error('Error fetching messages:', error);
      }
    };

    // Call the fetchMessages function
    fetchMessages();
  }, [token]);


  const fetchData = async () => {
    try {
      // Get user information
      const userResponse = await axios.get('/api/users', {
        params: {
          token: token,
        },
      });

      // Find the user with the matching token
      const matchingUser = userResponse.data;

      // If the logged-in user is an admin, fetch information about all users
      if (matchingUser.isAdmin) {
        const allUsersResponse = await axios.get('/api/users/all', {
          params: {
            token: token,
          },
        });
        setUser(allUsersResponse.data);
      } else {
        // If the logged-in user is not an admin, set user state with the matching user
        setUser(matchingUser || null);
      }
    } catch (error) {
      // Handle error
      console.error('Error fetching user information:', error);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, [token]);



  const handleDeleteUser = async (id) => {
    try {
      // Send a DELETE request to delete the user
      const response = await axios.delete(`/api/users?id=${id}`, {
        params: {
          token: token,
        },
      });

      // Update the state to remove the deleted user
      setUser((prevUser) => {
        // If the user state is an array, filter out the deleted user
        if (Array.isArray(prevUser)) {
          return prevUser.filter((user) => user.id !== id);
        }
        // If the user state is a single user object, set it to null
        return null;
      });

      // Optionally, handle success response
      console.log('User deleted successfully:', response.data);
    } catch (error) {
      // Handle delete user error
      console.error('Error deleting user:', error);
    }
  };



  return (
    <div className="forum-page">
      <div className="user-list-container">
        <h2>User Information</h2>
        {user ? (
          <div>
            {Array.isArray(user) && user.length > 1 ? (
              <div>
                <h3>All Users</h3>
                {user.map((userData) => (
                  <div key={userData.id}>
                    <p>ID: {userData.id}</p>
                    <p>Username: {userData.username}</p>
                    <button type="button" onClick={() => handleDeleteUser(userData.id)}>
                      x
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p>ID: {user.id}</p>
                <p>Username: {user.username}</p>
              </>
            )}
          </div>
        ) : (
          <p>No user found with the provided token.</p>
        )}
      </div>
      <div className="logout-button">
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="message-content-container">
        <div className="message-list">
          {/* Render messages here */}
          {messages.map((message) => (
            <div key={message.id} className={message.userId === parseInt(localStorage.getItem('userId')) ? 'logged-in-user' : ''}>
              <p>{message.text}</p>
              {/* Add a delete button with an onClick event */}
                <button type="button" onClick={() => handleDeleteMessage(message.id)}>
                  &times; {/* Use the "times" symbol (×) as the content for the red circle */}
                </button>
            </div>
          ))}
        </div>
        <div className="message-box">
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
            <div className="rounded-button">
              <button type="button" onClick={handleCreateMessage}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;