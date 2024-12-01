import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BirthdayPromoModal from './BirthdayPromoModal'; // Import the modal
import './Touristhome.css'; // Import the CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faExclamation, faCircleXmark, faLock, faPlane, faBus, faCity, faBinoculars, faHotel, faCar, faGripLines } from '@fortawesome/free-solid-svg-icons'; // Import the grip lines icon

export default function Touristhome() {
  const navigate = useNavigate();
  const [showPromoModal, setShowPromoModal] = useState(true);

  const handleClosePromoModal = () => setShowPromoModal(false);

  useEffect(() => {
    setShowPromoModal(true);
  }, []);

  const handleUpdateProfileClick = () => navigate('/tourist-profile');
  const handleViewComplaintsClick = () => navigate('/complaints');
  const handleFileComplaintClick = () => navigate('/file-complaint');
  const handleAccountDeletionClick = () => navigate('/request-account-deletion');
  const handleBookTransportationClick = () => navigate('/book-transportation');
  const handleBookFlightClick = () => navigate('/book-flight');
  const handleViewPastItinerariesClick = () => navigate('/tourist-past-itineraries');
  const handleViewPastActivitiesClick = () => navigate('/tourist-previous-activities');
  const handleBookHotelClick = () => navigate('/book-hotel');
  const handleViewBookedTransportationsClick = () => navigate('/view-booked-transportations');
  
  const handleHomeClick = () => navigate('/home');
  const handleLogoutClick = () => navigate('/logout');

  return (
    <div className="main-container">
      {/* Background Image */}
      <div className="background-image">
        <header className="custom-header">
          <div className="header-left">
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleLogoutClick}>Log Out</button>
            <button onClick={handleUpdateProfileClick}>View Profile</button>
          </div>
          <div className="header-right">
            <h1>Explora</h1>
          </div>
        </header>
      </div>

      {showPromoModal && <BirthdayPromoModal onClose={handleClosePromoModal} />}
 {/* Services Text Section */}
 <div className="services-section">
        <FontAwesomeIcon icon={faGripLines} className="service-icon" /> {/* Updated icon */}
        <span className="services-text">Services</span>
        <FontAwesomeIcon icon={faGripLines} className="service-icon" /> {/* Updated icon */}
      </div>

      <div className="button-container">
        <button onClick={handleUpdateProfileClick}>
          <FontAwesomeIcon icon={faUser} />
          Update Profile
        </button>
        <button onClick={handleViewComplaintsClick}>
          <FontAwesomeIcon icon={faExclamation} />
          View Issued Complaints
        </button>
        <button onClick={handleFileComplaintClick}>
          <FontAwesomeIcon icon={faCircleXmark} />
          File a Complaint
        </button>
        <button onClick={() => navigate('/change-password')}>
          <FontAwesomeIcon icon={faLock} />
          Change My Password
        </button>
        <button onClick={handleBookFlightClick}>
          <FontAwesomeIcon icon={faPlane} />
          Book Flight
        </button>
        <button onClick={handleBookTransportationClick}>
          <FontAwesomeIcon icon={faBus} />
          Book Transportation
        </button>
        <button onClick={handleViewPastItinerariesClick}>
          <FontAwesomeIcon icon={faCity} />
          View Past Itineraries
        </button>
        <button onClick={handleViewPastActivitiesClick}>
          <FontAwesomeIcon icon={faBinoculars} />
          View Past Activities
        </button>
        <button onClick={handleBookHotelClick}>
          <FontAwesomeIcon icon={faHotel} />
          Book Hotel
        </button>
        <button onClick={handleViewBookedTransportationsClick}>
          <FontAwesomeIcon icon={faCar} />
          View All My Booked Transportations
        </button>
      </div>
    </div>
  );
}
