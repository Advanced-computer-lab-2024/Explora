import React, { useState } from 'react';

export default function LogInAdmin() {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('New Username:', newUsername);
    console.log('New Password:', newPassword);
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
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
