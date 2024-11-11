import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountDeletionRequest = () => {
  const [deletionRequests, setDeletionRequests] = useState([]);

  useEffect(() => {
    // Fetch deletion requests from the backend
    axios
      .get('http://localhost:4000/Admin/delete-requests')  // Ensure this is the correct endpoint
      .then(response => {
        setDeletionRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching deletion requests:', error);
      });
  }, []);

  // Function to handle user deletion
  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:4000/Admin/delete-user/${id}`)  // Ensure this is the correct endpoint
      .then(response => {
        alert('User deleted successfully');
        // Remove the deleted request from the UI
        setDeletionRequests(deletionRequests.filter(request => request.user._id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      });
  };

  return (
    <div className="account-deletion-request-container">
      <h2>Account Deletion Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Username</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deletionRequests.map(request => {
            // Ensure `request.user` exists before trying to access `request.user.username`
            const user = request.user || {};  // Safe default if user is null or undefined
            return (
              <tr key={request._id}>
                <td>{request._id}</td>
                <td>{user.username ? user.username : 'Unknown'}</td> {/* Safely access username */}
                <td>{user.id ? user.id : 'Unknown'}</td> {/* Safely access username */}
                <td>{request.reason}</td>
                <td>{request.status}</td>
                <td>
                  <button onClick={() => handleDeleteUser(request.user._id)}>
                    Delete User
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
