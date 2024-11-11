import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Inline CSS styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  }
};

const AccountDeletionRequest = () => {
  const [deletionRequests, setDeletionRequests] = useState([]);
  const [error, setError] = useState(''); // For error handling

  useEffect(() => {
    // Fetch deletion requests from the backend
    axios
      .get('http://localhost:4000/Admin/delete-requests') // Ensure this is the correct endpoint
      .then(response => {
        setDeletionRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching deletion requests:', error);
      });
  }, []);

  // Function to handle user deletion by username
  const handleDeleteUser = (username) => {
    axios
      .delete(`http://localhost:4000/Admin/delete-user/${username}`) // Send the username in the URL
      .then(response => {
        alert('User deleted successfully');
        // Remove the deleted request from the UI
        setDeletionRequests(deletionRequests.filter(request => request.user?.username !== username));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Account Deletion Requests</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Request ID</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Reason</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {deletionRequests.map(request => {
            const user = request.user || {}; // Safe default if user is null or undefined
            const isDeleted = request.status === "Resolved";

            return (
              <tr key={request._id}>
                <td style={styles.td}>{request._id}</td>
                <td style={styles.td}>{user.username ? user.username : 'Unknown'}</td>
                <td style={styles.td}>{request.reason}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDeleteUser(user.username)} // Pass the username
                    disabled={isDeleted}
                    style={isDeleted ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
                  >
                    {isDeleted ? 'User Deleted' : 'Delete User'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccountDeletionRequest;
