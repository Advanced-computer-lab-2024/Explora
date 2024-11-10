import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function LogInTourism() {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize navigate function

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputData = {
      username: newUsername,
      password: newPassword,
    };

    try {
      const response = await axios.post('http://localhost:4000/Governor', inputData);
      console.log('New Username:', newUsername);
      console.log('New Password:', newPassword);
      console.log('Profile created:', response.data);
      setMessage('Profile successfully created!');
      // Redirect after successful form submission
      navigate('/CreatedPop');
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error:', error.response.data.msg);
        setMessage(`Failed to create profile: ${error.response.data.msg}`);
      } else {
        console.error('Error:', error.message);
        setMessage('Failed to create profile, please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">New Username:</label>
        <input
          type="text"
          id="username"
          value={newUsername}
          onChange={handleUsernameChange}
          placeholder="Enter new username"
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
            width: '100%',
          }}
        />

        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={newPassword}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
            width: '100%',
          }}
        />
        {message && <p>{message}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}