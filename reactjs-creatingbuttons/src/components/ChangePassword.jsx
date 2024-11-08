import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try {
      const response = await axios.put('http://localhost:4000/api/tour_guide_profile/change-password', {
        password: currentPassword,
        newPassword,
      }, {
        withCredentials: true, // Allows cookies to be sent with the request
      });

      setSuccess(response.data.message);
      setError('');
      // Redirect to a success page or show a success message
      navigate('/success-page');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
      setSuccess('');
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
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', background: '#000000', color: '#fff', border: 'none', cursor: 'pointer' }} disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
}
}