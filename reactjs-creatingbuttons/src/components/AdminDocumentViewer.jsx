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

const AdminDocumentViewer = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
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

  // Fetch users from the API
  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users/requests'); // Replace with your actual endpoint
        setUsers(response.data); // Set the users state
      } catch (error) {
        console.error('Error fetching user requests:', error);
      }
    };

    fetchUserRequests();
  }, []);

  // Update the status of the user in the backend
  const updateStatusInBackend = async (userId, status) => {
    try {
      const response = await axios.put(`http://localhost:4000/users/updateStatus/${userId}`, { status });
      return response.data;  // Return the updated user data
    } catch (error) {
      console.error('Error updating status:', error);
      return null;  // Return null in case of an error
    }
  };

  // Accept a user and navigate to the Terms and Conditions page
  const handleAccept = async (userId) => {
    const updatedUser = await updateStatusInBackend(userId, 'Accepted');
    if (updatedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: 'Accepted' } : user
        )
      );
    }
  };

  // Reject a user request and remove them from the state
  const handleReject = async (userId) => {
    const updatedUser = await updateStatusInBackend(userId, 'Rejected');
    if (updatedUser) {
      // Remove the rejected user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    }
  };

  // Function to handle file downloads
  const handleDownloadFile = async (userId, fileType) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${fileType}/${userId}`, {
        responseType: 'blob', // Ensure the file is returned as a blob for download
      });

      // Check if the response is a valid PDF file
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('pdf')) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileType.toLowerCase()}_file_${userId}.pdf`); // Set the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('File is not a PDF or the content type is incorrect.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // Styles for the component
  const styles = {
    adminContainer: {
      maxWidth: '900px',
      margin: 'auto',
      padding: '20px',
      background: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    adminTitle: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    adminTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    tableHeader: {
      backgroundColor: '#f2f2f2',
      fontWeight: 'bold',
    },
    tableCell: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'center',
    },
    tableRow: {
      textAlign: 'center',
    },
    actionBtn: {
      cursor: 'pointer',
      padding: '8px 15px',
      margin: '5px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '5px',
    },
    acceptBtn: {
      backgroundColor: '#28a745',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#218838',
      },
    },
    rejectBtn: {
      backgroundColor: '#dc3545',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#c82333',
      },
    },
    downloadLink: {
      cursor: 'pointer',
      color: '#007bff',
      textDecoration: 'underline',
      '&:hover': {
        color: '#0056b3',
      },
    },
    noRequests: {
      textAlign: 'center',
      padding: '10px',
      color: '#666',
    },
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
      <div style={{ marginTop: '80px' }}>

    <div style={styles.adminContainer}>
      <h2 style={styles.adminTitle}>Review Uploaded Documents</h2>
      <table style={styles.adminTable}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Role</th>
            <th style={styles.tableCell}>Documents</th>
            <th style={styles.tableCell}>Status</th>
            <th style={styles.tableCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{user.username}</td>
                <td style={styles.tableCell}>{user.role}</td>
                <td style={styles.tableCell}>
                  {user.idFile && <span onClick={() => handleDownloadFile(user._id, 'ID')} style={styles.downloadLink}>ID File</span>}
                  {user.certificatesFile && (
                    <>
                      <br />
                      <span onClick={() => handleDownloadFile(user._id, 'Certificate')} style={styles.downloadLink}>Certificate</span>
                    </>
                  )}
                  {user.taxFile && (
                    <>
                      <br />
                      <span onClick={() => handleDownloadFile(user._id, 'Tax')} style={styles.downloadLink}>Tax File</span>
                    </>
                  )}
                </td>
                <td style={styles.tableCell}>{user.status}</td>
                <td style={styles.tableCell}>
                  <button onClick={() => handleAccept(user._id)} style={{ ...styles.actionBtn, backgroundColor: '#28a745' }}>Accept</button>
                  <button onClick={() => handleReject(user._id)} style={{ ...styles.actionBtn, backgroundColor: '#dc3545' }}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.noRequests}>No user requests available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default AdminDocumentViewer;
