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
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1px 5px',
          backgroundColor: '#008080',
          color: 'white',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          justifyContent: 'space-between',
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/tourist-home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/UpcomingActivities" style={{ color: 'white', textDecoration: 'none' }}>Activities</a>
          <a href="/book-flight" style={{ color: 'white', textDecoration: 'none' }}>Flights</a>
          <a href="/book-hotel" style={{ color: 'white', textDecoration: 'none' }}>Hotels</a>
          <a href="/UpcomingItineraries" style={{ color: 'white', textDecoration: 'none' }}>Itineraries</a>
          <a href="/UpcomingBookedEvents" style={{ color: 'white', textDecoration: 'none' }}>Upcoming Events</a>
          <a href="/product-list-tourist" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
          <a href="/Notifications" style={{ color: 'white', textDecoration: 'none' }}>Notifications</a>
        </div>

        {/* SVG Icon */}
        <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <svg
            onClick={toggleDropdown}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" fill="white" />
          </svg>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '80px',
                right: '0',
                backgroundColor: '#008080',
                color: 'white',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                width: '200px',
                padding: '10px 0',
                zIndex: 1000,
              }}
              onMouseEnter={handleMouseEnterHistory}
              onMouseLeave={handleMouseLeaveHistory}
            >
              <button
                onClick={() => navigate('/ProfileDetailsPage')}
                style={buttonStyle}
              >
                Profile
              </button>
              <a
                href="/history"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                History
              </a>

              <button
                onClick={() => navigate('/cart')}
                style={buttonStyle}
              >
                Cart
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/file-complaint')}
                style={buttonStyle}
              >
                File Complaint
              </button>
              <button
                onClick={() => navigate('/change-password')}
                style={buttonStyle}
              >
                Change Password
              </button>
              <button
                onClick={() => navigate('/Bookmarks')}
                style={buttonStyle}
              >
                Bookmarks
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
                My Promo Codes
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
                Current Orders
              </button>

              {isHistoryOptionsVisible && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '220px',
                    backgroundColor: '#008080',
                    color: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '200px',
                    padding: '10px 0',
                    zIndex: 1000,
                  }}
                >
                  <button
                    onClick={() => navigate('/tourist-previous-activities')}
                    style={buttonStyle}
                  >
                    Past Activities
                  </button>
                  <button
                    onClick={() => navigate('/tourist-past-itineraries')}
                    style={buttonStyle}
                  >
                    Past Itineraries
                  </button>
                  <button
                    onClick={() => navigate('/past-orders')}
                    style={buttonStyle}
                  >
                    Past Orders
                  </button>
                  <button
                    onClick={() => navigate('/view-booked-transportations')}
                    style={buttonStyle}
                  >
                    Booked Transportations
                  </button>
                  <button
                    onClick={() => navigate('/PastBookedEvents')}
                    style={buttonStyle}
                  >
                    Booked Events
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
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
