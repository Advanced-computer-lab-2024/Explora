import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TermsAndConditionsPage = ({ onAccept }) => {
  const navigate = useNavigate();
  const { userId, role } = useParams(); // Get userId and role from the URL parameters

  // This function will handle the acceptance action
  const handleAccept = () => {
    alert("You have accepted the terms and conditions!"); // Alert for acceptance

    // Perform the redirection based on role
   
      navigate('/to-do'); // Redirect to /to-do for TourGuide
    

    onAccept(); // Call the function passed as prop to handle any additional actions
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Terms and Conditions</h2>
      <p style={styles.intro}>Please read the terms and conditions carefully before accepting.</p>
      <div style={styles.termsContainer}>
        <h3 style={styles.subHeader}>1. Acceptance of Terms</h3>
        <p style={styles.term}>
          By accessing or using our services, you agree to comply with and be bound by these terms and conditions.
        </p>

        <h3 style={styles.subHeader}>2. User Responsibilities</h3>
        <p style={styles.term}>
          Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
        </p>

        <h3 style={styles.subHeader}>3. Modification of Terms</h3>
        <p style={styles.term}>
          We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated effective date.
        </p>

        <h3 style={styles.subHeader}>4. Limitation of Liability</h3>
        <p style={styles.term}>
          Our liability is limited to the fullest extent permitted by law. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
        </p>
        
        {/* Add more sections as needed */}
      </div>
      <button style={styles.acceptButton} onClick={handleAccept}>Accept Terms</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: 'auto',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  intro: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '16px',
  },
  termsContainer: {
    marginBottom: '30px',
  },
  subHeader: {
    marginTop: '20px',
    color: '#555',
  },
  term: {
    marginBottom: '15px',
    lineHeight: '1.6',
    color: '#444',
  },
  acceptButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#000000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default TermsAndConditionsPage;
