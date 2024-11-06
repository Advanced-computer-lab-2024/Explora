import React, { useState } from 'react';
import axios from 'axios';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Make sure to initialize this state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    // Show loading indicator while processing
    setLoading(true);
    setError('');

    try {
      // Replace the URL with the correct backend URL if needed
      const response = await axios.post('http://localhost:4000/change-password', {
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      if (response.status === 200) {
        alert('Password changed successfully!');
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setError('Failed to change password. Please try again.');
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Current Password:
            <input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            New Password:
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Confirm New Password:
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
            />
          </label>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', background: '#000000', color: '#fff', border: 'none', cursor: 'pointer' }} disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
}
