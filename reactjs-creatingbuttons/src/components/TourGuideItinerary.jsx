import React from 'react';
import { useNavigate } from 'react-router-dom';

const TourGuideItinerary = () => {
  const navigate = useNavigate();

  return (
    <header style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically
      height: '100vh',
    }}>
      <button
        style={{
          width: '250px',  // Adjust width for bigger button
          height: '60px',  // Adjust height for bigger button
          margin: '10px',  // Add space between buttons
          fontSize: '16px', // Increase font size
        }}
        onClick={() => navigate('/create-itinerary')}
      >
        Create Itinerary
      </button>
      <button
  onClick={() => navigate(-1)}
  style={{
    position: 'absolute',
    top: '20px',        // Adjust as needed for spacing
    left: '20px',       // Adjust as needed for spacing
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
>
  Go Back
</button>

      <button
        style={{
          width: '250px',
          height: '60px',
          margin: '10px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/itinerariesList')}
      >
        View Itinerary
      </button>
    </header>
  );
};

export default TourGuideItinerary;
