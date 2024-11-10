import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add your password change logic here, e.g., API call
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    // Assuming password change is successful
    // navigate('/success-page');  // Redirect to a success page or similar
    console.log("Password changed successfully!");
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

        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', background: '#000000', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Change Password
        </button>
      </form>
    </div>
  );
}