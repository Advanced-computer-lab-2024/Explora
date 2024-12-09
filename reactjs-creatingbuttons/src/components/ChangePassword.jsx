import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cropped_image.png'; // Make sure to update the path if necessary

const ChangePassword = () => {

  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);
  const handleClosePromoModal = () => setShowPromoModal(false);

  useEffect(() => {
    setShowPromoModal(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/users/changePassword', {
        username,
        password: currentPassword,
        newPassword,
      });

      setMessage(response.data.message);
      setError(''); // Clear any previous error
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong, please try again.');
      setMessage(''); // Clear any previous success message
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          backgroundColor: '#008080',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          fontSize: '14px',
          cursor: 'pointer',
          zIndex: 1100,
        }}
      >
        Back
      </button>

    
      <div style={containerStyle}>
        <div style={headerStyle}>
          <FontAwesomeIcon icon={faLock} style={{ fontSize: '50px', color: '#008080', marginBottom: '15px' }} />
          <h2 style={{ marginBottom: '20px', color: '#008080' }}>Change Password</h2>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>
              Current Password:
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>
              Confirm New Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px 0',
              background: '#008080', // Teal color for button
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  maxWidth: '400px',
  margin: 'auto',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: '100px', // Added margin-top
};

const headerStyle = {
  textAlign: 'center',
};

const buttonStyle = {
  width: '100%',
  padding: '10px 0',
  background: '#008080',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px',
};

export default ChangePassword;
