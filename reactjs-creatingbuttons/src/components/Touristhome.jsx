// Touristhome.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BirthdayPromoModal from './BirthdayPromoModal'; // Import the modal

export default function Touristhome() {
  const navigate = useNavigate();
  const [showPromoModal, setShowPromoModal] = useState(true); // Initially show the modal

  const handleClosePromoModal = () => {
    setShowPromoModal(false);
  };

  useEffect(() => {
    // Simulating it always being the user's birthday to show the modal
    setShowPromoModal(true); 
  }, []);

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

  const handleViewBookedTransportationsClick = () => {
    navigate('/view-booked-transportations');
  };

  return (
    <header>
      {/* Show the promo modal if showPromoModal is true */}
      {showPromoModal && <BirthdayPromoModal onClose={handleClosePromoModal} />}

      <div className="button-container">
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
        <button onClick={handleViewBookedTransportationsClick}>View All My Booked Transportations</button>
      </div>
    </header>
  );
}
