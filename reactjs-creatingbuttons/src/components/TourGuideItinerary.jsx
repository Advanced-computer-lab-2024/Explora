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
        style={{
          width: '250px',
          height: '60px',
          margin: '10px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/read-itinerary')}
      >
        Read Itinerary
      </button>
      <button
        style={{
          width: '250px',
          height: '60px',
          margin: '10px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/update-itinerary')}
      >
        Update Itinerary
      </button>
      <button
        style={{
          width: '250px',
          height: '60px',
          margin: '10px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/delete-itinerary')}
      >
        Delete Itinerary
      </button>
    </header>
  );
};

export default TourGuideItinerary;
