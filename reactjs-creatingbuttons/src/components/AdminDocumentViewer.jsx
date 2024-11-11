import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const AdminDocumentViewer = () => {
  // Sample data for demonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Tour Guide', status: 'Pending', documents: ['ID', 'Certificate'], termsAccepted: false },
    { id: 2, name: 'Jane Smith', role: 'Advertiser', status: 'Pending', documents: ['ID', 'Tax Card'], termsAccepted: false },
    { id: 3, name: 'Sam Wilson', role: 'Seller', status: 'Pending', documents: ['ID', 'Tax Card'], termsAccepted: false }
  ]);

  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle Accept action
 // Function to handle Accept action
const handleAccept = (userId) => {
  // Update the state to reflect the accepted status
  setUsers(prevUsers =>
    prevUsers.map(user =>
      user.id === userId ? { ...user, status: 'Accepted' } : user
    )
  );

  // Show alert for acceptance
  alert(`User with ID ${userId} has been accepted.`);
};

// Function to handle Reject action
const handleReject = (userId) => {
  // Update the state to filter out the rejected user
  setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

  // Show alert for rejection
  alert(`User with ID ${userId} has been rejected.`);
};


  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Review Uploaded Documents</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Role</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Documents</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.role}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {user.documents.join(', ')}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.status}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <span 
                  onClick={() => handleAccept(user.id)} 
                  style={{
                    cursor: 'pointer',
                    color: '#007bff',
                    marginRight: '10px',
                    textDecoration: 'underline'
                  }}
                >
                  Accept
                </span>
                <span 
                  onClick={() => handleReject(user.id)} 
                  style={{
                    cursor: 'pointer',
                    color: '#000000',
                    textDecoration: 'underline'
                  }}
                >
                  Reject
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDocumentViewer;
