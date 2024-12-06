import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const AccountDeletionRequest = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [deletionReason, setDeletionReason] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const navigate = useNavigate(); // Initialize the navigate function

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirmation) {
      alert('Please confirm the deletion request.');
      return;
    }

    try {
      // Send the deletion request to the backend
      const response = await axios.post('http://localhost:4000/Request/requestDeletion', {
        username,
        email, // Sending email to backend as well
        reason: deletionReason,
      });

      if (response.status === 200) {
        alert('Your account deletion request has been submitted.');
        
        // Redirect to the default page (HomeTest)
        navigate('/'); // This will redirect to the "/" route (HomeTest)
      }
    } catch (error) {
      // Handle any errors
      console.error('Error submitting deletion request:', error);
      alert(error.response?.data?.message || 'An error occurred while submitting the deletion request.');
    }

    // Reset the form fields
    setUsername('');
    setEmail('');
    setDeletionReason('');
    setAdditionalComments('');
    setConfirmation(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff', // White background for the whole page
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          background: '#ffffff', // White background for the form container
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <FontAwesomeIcon icon={faUserSlash} style={{ fontSize: '50px', color: '#008080', marginBottom: '15px' }} />
        <h2 style={{ marginBottom: '20px', color: '#008080' }}>Request Account Deletion</h2>
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
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Reason for Deletion:
              <select
                value={deletionReason}
                onChange={(e) => setDeletionReason(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              >
                <option value="" disabled>Select a reason</option>
                <option value="Privacy concerns">Privacy concerns</option>
                <option value="Too many notifications">Too many notifications</option>
                <option value="Not using the account">Not using the account</option>
                <option value="Prefer another platform">Prefer another platform</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>
              Additional Comments (Optional):
              <textarea
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                placeholder="Let us know if there's anything else you'd like to share."
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  minHeight: '80px',
                }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>
              <input
                type="checkbox"
                checked={confirmation}
                onChange={(e) => setConfirmation(e.target.checked)}
                required
                style={{ marginRight: '5px' }}
              />
              I confirm that I want to delete my account and all related data.
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
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountDeletionRequest;
