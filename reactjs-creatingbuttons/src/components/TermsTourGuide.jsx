import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TermsTourGuidePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL parameters

  // This function will handle the acceptance action
  const handleAccept = () => {
    alert("You have accepted the terms for Tour Guide!"); // Alert to confirm acceptance

    // Redirect to the Tour Guide dashboard or any relevant page
    navigate('/to-do'); // Or replace with the page you want to redirect to after acceptance
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Tour Guide Terms and Conditions</h2>
      <p style={styles.intro}>Please read the Tour Guide-specific terms and conditions carefully before accepting.</p>
      <div style={styles.termsContainer}>
        <h3 style={styles.subHeader}>1. Tour Guide Responsibilities</h3>
        <p style={styles.term}>
          As a Tour Guide, you agree to conduct tours in a professional manner, ensuring customer safety and satisfaction.
        </p>

        <h3 style={styles.subHeader}>2. Licensing and Certifications</h3>
        <p style={styles.term}>
          You acknowledge the requirement to maintain any necessary certifications or licenses to guide tours as per local regulations.
        </p>

        <h3 style={styles.subHeader}>3. Tour Cancellations</h3>
        <p style={styles.term}>
          You agree to notify customers promptly in case of any tour cancellations or changes.
        </p>

        <h3 style={styles.subHeader}>4. Payment Structure</h3>
        <p style={styles.term}>
          You understand and agree to the payment structure for your services as a Tour Guide, including commission and payout schedules.
        </p>

        <h3 style={styles.subHeader}>5. Code of Conduct</h3>
        <p style={styles.term}>
          You agree to adhere to our code of conduct, which includes respectful behavior toward clients and colleagues and maintaining professional integrity.
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

export default TermsTourGuidePage;
