// components/TourismDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TourismDashboard() {
  const navigate = useNavigate();

  // Navigation handlers
  const goToPlaces = () => navigate('/places');
  const goToTags = () => navigate('/tags');

  return (
    <div style={styles.container}>
      <h1>Tourism Governor Dashboard</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={goToPlaces}>
          Manage Museums & Historical Places
        </button>
        <button style={styles.button} onClick={goToTags}>
          Manage Tags for Historical Locations
        </button>
      </div>
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
