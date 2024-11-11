import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TermsAdvertiserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL parameters

  // This function will handle the acceptance action
  const handleAccept = () => {
    alert("You have accepted the terms for Advertiser!");

    // Redirect to the Advertiser dashboard or any relevant page
    navigate('/company'); // Replace with the page you want to redirect to after acceptance
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Advertiser Terms and Conditions</h2>
      <p style={styles.intro}>Please read the Advertiser-specific terms and conditions carefully before accepting.</p>
      <div style={styles.termsContainer}>
        <h3 style={styles.subHeader}>1. Advertiser Responsibilities</h3>
        <p style={styles.term}>
          As an Advertiser, you agree to maintain accurate advertising content and comply with our advertising policies.
        </p>

        <h3 style={styles.subHeader}>2. Payment Terms</h3>
        <p style={styles.term}>
          You acknowledge and agree to our payment terms, including fees for advertising services.
        </p>

        <h3 style={styles.subHeader}>3. Limitation of Liability</h3>
        <p style={styles.term}>
          Our liability is limited to the extent permitted by law, and we are not liable for any damages related to your advertisements.
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

export default TermsAdvertiserPage;
