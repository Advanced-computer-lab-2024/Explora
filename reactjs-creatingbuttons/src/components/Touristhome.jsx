import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Touristhome() {
  const navigate = useNavigate();

  const handleUpdateProfileClick = () => {
    navigate('/tourist-profile');
  };

  const handleViewActivitiesClick = () => {
    navigate('/tourist-search');
  };

  const handleViewComplaintsClick = () => {
    navigate('/complaints');
  };

  const handleFileComplaintClick = () => {
    navigate('/file-complaint');
  };

  const handleAccountDeletionClick = () => {
    navigate('/request-account-deletion');
  };

  const handleBookTransportationClick = () => {
    navigate('/book-transportation');
  };

  const handleBookFlightClick = () => {
    navigate('/book-flight');
  };

  const handleViewPreviousActivitiesClick = () => {
    navigate('/tourist-previous-activities');
  };

  // New handler for booking a hotel
  const handleBookHotelClick = () => {
    navigate('/book-hotel'); // Redirect to the BookHotel page
  };

  return (
    <header>
      <div className="button-container">
        <button onClick={handleUpdateProfileClick}>Update my profile</button>
        <button onClick={handleViewActivitiesClick}>View upcoming activities</button>
        <button onClick={handleViewComplaintsClick}>View Issued Complaints</button>
        <button onClick={handleFileComplaintClick}>File a Complaint</button>
        <button onClick={handleAccountDeletionClick}>Request Account Deletion</button>
        <button onClick={() => navigate('/change-password')}>Change My Password</button>
        <button onClick={handleBookFlightClick}>Book Flight</button>
        <button onClick={handleBookTransportationClick}>Book Transportation</button>
        <button onClick={handleViewPreviousActivitiesClick}>View previous events/activities</button>
        
        {/* New button for booking a hotel */}
        <button onClick={handleBookHotelClick}>Book Hotel</button>
      </div>
    </header>
  );
}
