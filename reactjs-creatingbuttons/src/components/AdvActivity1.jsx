import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdvActivity1 = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          backgroundColor: '#008080',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          fontSize: '14px',
          cursor: 'pointer',
          zIndex: 1100,
        }}
      >
        Back
      </button>

      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center vertically
          height: '100vh',
        }}
      >
        <button
          style={{
            width: '250px',  // Adjust width for bigger button
            height: '60px',  // Adjust height for bigger button
            margin: '10px',  // Add space between buttons
            fontSize: '16px', // Increase font size
            backgroundColor: '#4CAF50', // Green background for Create button
            color: 'white', // White text
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/create-act')}
        >
          Create Activity
        </button>

        <button
          style={{
            width: '250px',
            height: '60px',
            margin: '10px',
            fontSize: '16px',
            backgroundColor: '#008CBA', // Blue background for View button
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/list')}
        >
          View Activities
        </button>
      </header>
    </div>
  );
};

export default AdvActivity1;
