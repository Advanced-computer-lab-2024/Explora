import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdvActivity1 = () => {
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
        onClick={() => navigate('/create-act')}
      >
        Create Activity
      </button>
    
    </header>
  );
};

export default AdvActivity1 ;
