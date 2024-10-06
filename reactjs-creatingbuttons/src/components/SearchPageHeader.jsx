import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SearchPageHeader = () => {



  return(
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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