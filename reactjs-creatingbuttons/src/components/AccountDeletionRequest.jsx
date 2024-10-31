import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const AccountDeletionRequest = () => {
  const [username, setUsername] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Frontend feedback before actual backend implementation
    alert('Your request for account deletion has been submitted successfully!');

    // Optionally, if you want to simulate sending data to a backend:
    const deletionRequest = {
      username: username,
      reason: reason,
    };

    // Uncomment this part when you want to connect to a backend
    /*
    try {
      const response = await axios.post('http://localhost:4000/delete-account', deletionRequest);
      console.log('Response:', response.data);
      setMessage('Your account deletion request has been processed.');
    } catch (error) {
      console.error('Error submitting deletion request:', error);
      setMessage('There was an error processing your request. Please try again later.');
    }
    */

    // Clear the form fields after submission
    setUsername('');
    setReason('');
  };

  return (
    <header>
      <div className="account-deletion-request">
        <h2>Request Account Deletion</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reason">Reason for Deletion:</label>
            <input
            type="text"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <button type="submit">Request Deletion</button>
        </form>
        {message && <p>{message}</p>} {/* Display success/error message */}
      </div>
    </header>
  );
};

export default AccountDeletionRequest;
