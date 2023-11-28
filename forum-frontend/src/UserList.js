import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the backend API with the provided token
        const response = await axios.get('/api/Users', {
          params: {
            token: token,
          },
        });

        // Find the user with the matching token
        const matchingUser = response.data;

        // If the logged-in user is an admin, fetch information about all users
        if (matchingUser.isAdmin) {
          const allUsersResponse = await axios.get('/api/Users/all', {
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

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>User Information</h2>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          {/* Add other user information fields as needed */}
        </div>
      ) : (
        <p>No user found with the provided token.</p>
      )}
    </div>
  );
};

export default UserList;
