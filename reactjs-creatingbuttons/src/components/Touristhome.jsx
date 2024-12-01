import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Touristhome() {
  const navigate = useNavigate();

  const handleUpdateProfileClick = () => {
    navigate('/tourist-profile');
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

  const handleViewPastItinerariesClick = () => {
    navigate('/tourist-past-itineraries');
  };

  const handleViewPastActivitiesClick = () => {
    navigate('/tourist-previous-activities');
  };

  const handleBookHotelClick = () => {
    navigate('/book-hotel');
  };

  // New handler for viewing all booked transportations
  const handleViewBookedTransportationsClick = () => {
    navigate('/view-booked-transportations');
  };
  const handleUseGuideClick = () => {
    navigate('/vacation-guide'); // Navigate to the VacationGuide component
  };
  
  return (

    <header>
      <div className="button-container">
      <button onClick={handleUseGuideClick}>User Guide</button>

        <button onClick={handleUpdateProfileClick}>Update my profile</button>
        <button onClick={handleViewComplaintsClick}>View Issued Complaints</button>
        <button onClick={handleFileComplaintClick}>File a Complaint</button>
        <button onClick={handleAccountDeletionClick}>Request Account Deletion</button>
        <button onClick={() => navigate('/change-password')}>Change My Password</button>
        <button onClick={handleBookFlightClick}>Book Flight</button>
        <button onClick={handleBookTransportationClick}>Book Transportation</button>
        <button onClick={handleViewPastItinerariesClick}>View Past Itineraries</button>
        <button onClick={handleViewPastActivitiesClick}>View Past Activities</button>
        <button onClick={handleBookHotelClick}>Book Hotel</button>
        
        {/* New button for viewing all booked transportations */}
        <button onClick={handleViewBookedTransportationsClick}>View All My Booked Transportations</button>
      </div>
    </header>
  );
}