import React from 'react';
import { Link } from 'react-router-dom';


const ItinerarySearchPage = () => {
  return (
    <div>
      <h2>Itinerary Search Page</h2>
      {/* Add the "View Upcoming Itineraries" button */}
      <Link to="/UpcomingItineraries">
        <button style={{ padding: '10px', margin: '10px', fontSize: '16px' }}>
          View Upcoming Itineraries
        </button>
      </Link>


      {/* Rest of the Itinerary search page */}
      {/* You can add your existing filters and search functionality here */}
    </div>
  );
};

export default ItinerarySearchPage;
