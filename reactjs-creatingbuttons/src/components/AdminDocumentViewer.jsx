import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDocumentViewer = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
  );
};

export default AdminDocumentViewer;
