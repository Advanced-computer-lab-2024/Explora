import React from 'react';
import { useNavigate } from 'react-router-dom';

const TourGuideItinerary = () => {
  const navigate = useNavigate();

  // Inline CSS styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f9',
      fontFamily: 'Arial, sans-serif',
    },
    button: {
      width: '250px',
      height: '60px',
      margin: '15px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: '#4caf50',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    buttonHover: {
      backgroundColor: '#45a049',
      transform: 'scale(1.05)',
    },
    goBackButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    goBackHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
    },
  };

  // Button hover effects (simple state toggle)
  const [hovered, setHovered] = React.useState(null);

  return (
    <div style={styles.container}>
      {/* Go Back Button */}
      <button
        style={{
          ...styles.goBackButton,
          ...(hovered === 'goBack' ? styles.goBackHover : {}),
        }}
        onMouseEnter={() => setHovered('goBack')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>

      {/* Create Itinerary Button */}
      <button
        style={{
          ...styles.button,
          ...(hovered === 'create' ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setHovered('create')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/create-itinerary')}
      >
        Create Itinerary
      </button>

      {/* View Itinerary Button */}
      <button
        style={{
          ...styles.button,
          ...(hovered === 'view' ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setHovered('view')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/itinerariesList')}
      >
        View Itinerary
      </button>
    </div>
  );
};

export default TourGuideItinerary;
