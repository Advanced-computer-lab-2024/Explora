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
  
  const handleViewComplaintsClick = () => {
    navigate('/complaints');  // Navigate to ComplaintsTable component
  };
  const handleFileComplaintClick = () => {
    navigate('/file-complaint');  // Navigate to FileComplaint component
  };

  const handleRequestDeletionClick = () => {
    navigate('/request-deletion');  // Navigate to AccountDeletionRequest component
  };

  return (
    <header>
      <div className="button-container">
        <button onClick={handleUpdateProfileClick}>Update my profile</button>
        <button onClick={handleViewActivitiesClick}>View upcoming activities</button> {/* Attach click handler */}
        <button onClick={handleViewComplaintsClick}>View issued complaints</button> {/* New button for complaints */}
        <button onClick={handleFileComplaintClick}>File a Complaint</button> {/* New button for filing a complaint */}
        <button onClick={handleRequestDeletionClick}>Request Account Deletion</button> {/* New button for account deletion */}



      </div>
    </header>
  );
}
