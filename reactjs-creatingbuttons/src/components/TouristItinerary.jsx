import React from 'react';
import { useNavigate } from 'react-router-dom';

const TouristItinerary = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <h1>Tourist Itinerary</h1>
    
      <button
        style={{
          width: '250px',
          height: '60px',
          margin: '10px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/create-itinerary-tourist')}
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
        onClick={() => navigate('/read-itinerary-tourist')}
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
        onClick={() => navigate('/update-itinerary-tourist')}
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
        onClick={() => navigate('/delete-itinerary-tourist')}
      >
        Delete Itinerary
      </button>
    </div>
  );
};

export default TouristItinerary;
