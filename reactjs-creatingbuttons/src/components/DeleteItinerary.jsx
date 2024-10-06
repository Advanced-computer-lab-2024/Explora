import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteItinerary = () => {
  const navigate = useNavigate();

  const handleDeleteItinerary = () => {
    navigate('/delete-itinerary');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <button 
        style={{ width: '200px', height: '50px', fontSize: '16px' }}
      >
        View Itineraries
      </button>
      <button 
        onClick={handleDeleteItinerary} 
        style={{ width: '200px', height: '50px', fontSize: '16px' }}
      >
        Delete Itinerary
      </button>
    </div>
  );
};

export default DeleteItinerary;
