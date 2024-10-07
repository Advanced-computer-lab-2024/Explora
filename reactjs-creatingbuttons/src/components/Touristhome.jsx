import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

export default function Touristhome() {
  const navigate = useNavigate();  // Initialize navigate function

  const handleUpdateProfileClick = () => {
    navigate('/tourist-profile');  // Navigate to TouristProfile component
  };

  const handleViewActivitiesClick = () => {
    navigate('/tourist-search');  // Navigate to TouristSearch component
  };

  return (
    <header>
      <div className="button-container">
        <button onClick={handleUpdateProfileClick}>Update my profile</button>
        <button onClick={handleViewActivitiesClick}>View upcoming activities</button> {/* Attach click handler */}
      </div>
    </header>
  );
}
