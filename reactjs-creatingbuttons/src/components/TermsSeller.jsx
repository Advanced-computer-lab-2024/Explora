import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TermsSellerPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL parameters

  // This function will handle the acceptance action
  const handleAccept = () => {
    alert("You have accepted the terms for Seller!");

    // Redirect to the Seller home or any relevant page
    navigate('/seller-home'); // Or replace with the page you want to redirect to after acceptance
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Seller Terms and Conditions</h2>
      <p style={styles.intro}>Please read the Seller-specific terms and conditions carefully before accepting.</p>
      <div style={styles.termsContainer}>
        <h3 style={styles.subHeader}>1. Seller Responsibilities</h3>
        <p style={styles.term}>
          As a Seller, you agree to maintain accurate product listings and comply with our sales policies.
        </p>

        <h3 style={styles.subHeader}>2. Commission Fees</h3>
        <p style={styles.term}>
          You acknowledge and agree to our commission structure for sales made through the platform.
        </p>

        <h3 style={styles.subHeader}>3. Limitation of Liability</h3>
        <p style={styles.term}>
          Our liability is limited to the extent permitted by law, and we are not liable for any loss of revenue or business.
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

export default TermsSellerPage;
