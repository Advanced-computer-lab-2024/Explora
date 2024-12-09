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
      {/* New button for View Cart */}
      <Link to="/view-cart">
        <button style={buttonStyle}>View Cart</button>
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
    if (option === 'bookedFlights') {
      navigate('/booked-flights'); // Redirect to booked flights page
    } else if (option === 'hotelReservations') {
      navigate('/hotel-reservations'); // Redirect to hotel reservations page
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginTop: '40px' }}>
      {/* Back Button positioned at top-left */}
      <div style={backButtonContainerStyle}>
        <button
          onClick={() => navigate(-1)}
          style={backButtonStyle}
        >
          Back
        </button>
      </div>

      <button onClick={toggleDropdown} style={buttonStyle}>
        Book ▼
      </button>
      {showDropdown && (
        <div style={dropdownStyle}>
          {/* New buttons */}
          <button onClick={() => handleSelect('bookedFlights')} style={dropdownItemStyle}>
            Booked Flights
          </button>

          <button onClick={() => handleSelect('hotelReservations')} style={dropdownItemStyle}>
            Hotel Reservations
          </button>
        </div>
      )}
    </div>
  );
};

// Button and dropdown styles
const buttonStyle = {
  margin: '20px 10px',
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

// Style for the fixed back button container at top-left
const backButtonContainerStyle = {
  position: 'fixed',
  top: '60px',  // Increased the value to move it lower
  left: '20px',
  zIndex: '1000', // Ensure it stays on top of other elements
};

const backButtonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  fontSize: '14px',
  cursor: 'pointer',
};

export default TouristProfile;
