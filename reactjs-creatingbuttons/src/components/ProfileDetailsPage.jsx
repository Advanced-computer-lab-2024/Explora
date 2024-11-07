import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileDetailsPage  = () => {
    // State to store the profile data
    const [profileData, setProfileData] = useState({
      email: 'tourist@example.com',
      username: 'touristUser', // Non-editable
      password: 'pass', // Non-editable
      mobileNumber: '+1234567890',
      nationality: 'USA',
      dateOfBirth: '1990-01-01',
      job: 'job'
    });

    useEffect(() => {
      // Fetch the user's profile data
      axios.get('http://localhost:4000/api/tourists/id/6700f0f299fb90dc8f7502e2')
      .then((response) => {
        console.log('Profile data:', response.data);
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
    }, []); // Empty dependency array to run only once
  
  
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
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedProfileData = {
        email: profileData.email,
        password: profileData.password,
        mobileNumber: profileData.mobileNumber,
        nationality: profileData.nationality,
        dateOfBirth: profileData.dateOfBirth,
        job: profileData.job
      };
      try {
        console.log(updatedProfileData)
        await axios.put('http://localhost:4000/api/tourists/update/6700f0f299fb90dc8f7502e2', updatedProfileData);
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
      console.log('Profile updated:', updatedProfileData);
      setIsEditable(false);// Stop editing after saving
    };
  
return (
     <div> 
    <h2>Profile Details</h2>


<form onSubmit={handleSubmit}>
{/* Email Field */}
<div>
  <label>Email: </label>
  <input
    type="email"
    name="email"
    value={profileData.email}
    onChange={handleChange}
    disabled={!isEditable}
    // enabled={isEditable}

  />
</div>

{/* Username Field */}
<div>
  <label>Username: </label>
  <input
    type="text"
    name="username"
    value={profileData.username}
    disabled
  />
</div>
<div>
  <label>password </label>
  <input
    name="password"
    className="form-input"
    value={profileData.password}
    onChange={handleChange}
    disabled={!isEditable}
    // enabled={isEditable}
    type="password"
  >
  </input>
</div>
<div>
  <label>mobile number : </label>
  <input
    name="mobileNumber"
    className="form-input"
    value={profileData.mobileNumber}
    onChange={handleChange}
    disabled={!isEditable}
    type="tel"
    />
  </div>

  {/* Nationality Field */}
  <div>
    <label>Nationality: </label>
    <input
    type="text"
    name="nationality"
    className="form-input"
    value={profileData.nationality}
    onChange={handleChange}
    disabled={!isEditable}
    />
  </div>

  {/* Date of Birth Field */}
<div>
  <label>Date of Birth: </label>
  <input
    type="datetime-local"
    name="dateOfBirth"
    value={new Date(profileData.dateOfBirth).toISOString().slice(0, -1)}
    onChange={handleChange}
    disabled={!isEditable}
  />
</div>

{/* Job/Student Status Field */}
<div>
  <label>Job : </label>
  <input
    name="job"
    className="input-select"
    value={profileData.job}
    onChange={handleChange}
    disabled={!isEditable}
    enabled={isEditable}
    type="text"
  >
  </input>
</div>

{/* Wallet Field (Non-Editable) */}
<div>
  <label>Wallet: </label>
  <input
    type="text"
    name="wallet"
    value={profileData.wallet}
    disabled
  />
</div>

{/* Button to toggle between editing and saving */}
<button type={isEditable ? "Save Profile" : "button"} onClick={isEditable ? handleSubmit : handleEditToggle}>
  {isEditable ? "Save Profile" : "Edit Profile"}
</button>

</form>
</div>
     );
  };



export default ProfileDetailsPage;