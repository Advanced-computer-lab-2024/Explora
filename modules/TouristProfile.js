import React, { useState } from 'react';
import { Link } from 'react-router-dom';


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
};

export default TouristProfile;
