import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchPageHeader = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      {/* Back Button */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          style={{
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>

      <h1>Search for</h1>
      <div>
        {/* Link buttons to different search pages */}
        <Link to="/SiteSearchPage">
          <button style={buttonStyle}>Sites</button>
        </Link>
        <Link to="/ActivitySearchPage">
          <button style={buttonStyle}>Activities</button>
        </Link>
        <Link to="/ItinerarySearchPage">
          <button style={buttonStyle}>Itineraries</button>
        </Link>
      </div>
    </div>
  );
};

// Add some basic button styling
const buttonStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

export default SearchPageHeader;
