import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GuestHome() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <h1>Welcome to Guest Home</h1>
      
      <button
        onClick={() => navigate('/tourist-search')}
        style={{
          width: '300px',
          height: '73px',
          margin: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          backgroundColor: '#000000',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Search for Museums, Historical Places, or Activities
      </button>

      <button
        onClick={() => navigate('/upload-documents')}
        style={{
          width: '300px',
          height: '50px',
          margin: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          backgroundColor: '#000000',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Upload Required Documents
      </button>
    </div>
  );
}
