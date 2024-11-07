import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TouristProfile = () => {
  // State to store the profile data
  const [profileData, setProfileData] = useState({
    email: 'tourist@example.com',
    username: 'touristUser', // Non-editable
    nationality: 'USA',
    dob: '1990-01-01',
    jobStatus: 'job',
    wallet: '1000.00$' // Non-editable
  });

  // State to toggle between edit mode and view mode
  const [isEditable, setIsEditable] = useState(false);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Toggle between edit and view mode
  const handleEditToggle = (e) => {
    e.preventDefault();
    console.log('Toggling edit mode. Current isEditable:', isEditable);
    setIsEditable(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    setIsEditable(false); // Stop editing after saving
  };

  return (
    <div>
      <h2>Tourist Profile</h2>

      <Link to="/ProfileDetailsPage">
        <button style={buttonStyle}>View Profile Details</button>
      </Link>
      <Link to="/SearchPageHeader">
        <button style={buttonStyle}>Sites/Activities/Itineraries</button>
      </Link>
      {/* New button to view products */}
      <Link to="/product-list-tourist">
        <button style={buttonStyle}>View Products</button>
      </Link>
      {/* New button to view completed activities */}
      <Link to="/CompletedActivities">
        <button style={buttonStyle}>Completed Activities</button>
      </Link>
      {/* New button to view completed itineraries */}
      <Link to="/CompletedItineraries">
        <button style={buttonStyle}>Completed Itineraries</button>
      </Link>
      {/* Dropdown Button for Booking */}
      <BookDropdown />
    </div>
  );
};

// Dropdown Button Component for Booking
const BookDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Handle navigation based on selection
  const handleSelect = (option) => {
    setShowDropdown(false); // Close dropdown after selection
    if (option === 'flight') {
      navigate('/FlightBooking'); // Redirect to flight booking page
    } else if (option === 'hotel') {
      navigate('/HotelBooking'); // Redirect to hotel booking page
    } else if (option === 'ticket') {
      navigate('/Event-Activity-ItineraryBooking');
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
      <button onClick={toggleDropdown} style={buttonStyle}>
        Book ▼
      </button>
      {showDropdown && (
        <div style={dropdownStyle}>
          <button onClick={() => handleSelect('flight')} style={dropdownItemStyle}>
            Book a Flight
          </button>

          <button onClick={() => handleSelect('hotel')} style={dropdownItemStyle}>
            Book a Hotel
          </button>

          <button onClick={() => handleSelect('ticket')} style={dropdownItemStyle}>
            Book a ticket to an event/activity or itinerary
          </button>
        </div>
      )}
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
  backgroundColor: '#202124',
  color: 'white',
};

const dropdownStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1,
};

const dropdownItemStyle = {
  display: 'block',
  width: '100%',
  padding: '10px 20px',
  fontSize: '14px',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'white',
  textAlign: 'left',
};

export default TouristProfile;
