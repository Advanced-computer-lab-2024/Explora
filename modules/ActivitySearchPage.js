import React from 'react';
import { Link } from 'react-router-dom';


const ActivitySearchPage = () => {
  return (
    <div>
      <h1>Activity Search Page</h1>

      {/* Add the "View Upcoming Activities" button */}
      <Link to="/UpcomingActivities">
        <button style={{ padding: '10px', margin: '10px', fontSize: '16px' }}>
          View Upcoming Activities
        </button>
      </Link>

      {/* Rest of the activity search page */}
      {/* You can add your existing filters and search functionality here */}

    </div>
  );
};

export default ActivitySearchPage;
