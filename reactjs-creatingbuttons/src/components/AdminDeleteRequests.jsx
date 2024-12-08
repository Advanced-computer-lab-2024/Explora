import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/cropped_image.png';
import { useNavigate } from 'react-router-dom';
const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};

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
  const navigate = useNavigate();

  const [deletionRequests, setDeletionRequests] = useState([]);
  const [error, setError] = useState(''); // For error handling
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [guideRatings, setGuideRatings] = useState({});
  const [guideComments, setGuideComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);

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
          <a href="/acc-settings" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/flagged-events" style={{ color: 'white', textDecoration: 'none' }}>Flag Event</a>
          

          <a href="/product-list" style={{ color: 'white', textDecoration: 'none' }}>Products</a>


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
                onClick={() => navigate('/category-manager')}
                style={buttonStyle}
              >
                Manage Activities
              </button>
              <button
                onClick={() => navigate('/tag-manager')}
                style={buttonStyle}
              >
                Manage Prefrences
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
                Manage Accounts
              </a>

              <button
                onClick={() => navigate('/admin-documents')}
                style={buttonStyle}
              >
                View Uploaded Documents
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/admin-complaints')}
                style={buttonStyle}
              >
                View Complaints
              </button>
              <button
                onClick={() => navigate('/viewDeleteRequests')}
                style={buttonStyle}
              >
                View Delete Requests
              </button>
              <button
                onClick={() => navigate('/promo-code')}
                style={buttonStyle}
              >
                Create Promo Code
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
                    onClick={() => navigate('/admin-view-users')}
                    style={buttonStyle}
                  >
Delete Accounts                  </button>
                  <button
                    onClick={() => navigate('/login-tourism')}
                    style={buttonStyle}
                  >
Add Tourism Governor                  </button>
                  <button
                    onClick={() => navigate('/login-admin')}
                    style={buttonStyle}
                  >
Add Admin                  </button>
                  

                  
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <div style={{ marginTop: '80px' }}></div>
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
    </div>
  );
};

export default AccountDeletionRequest;
