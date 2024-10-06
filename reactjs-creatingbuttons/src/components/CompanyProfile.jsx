import React from 'react';
//import './CompanyProfile.css';

const CompanyProfile = ({ profileData, onEdit }) => {
  if (!profileData) {
    return <p>No profile available. Please create a profile.</p>;
  }

  return (
    <div className="company-profile-wrapper">
      <div className="company-banner">
        <h1>{profileData.name}</h1>
        <p>{profileData.profileDescription}</p>
      </div>
      <div className="company-details">
        <p><strong>Website:</strong> <a href={profileData.website} target="_blank" rel="noopener noreferrer">{profileData.website}</a></p>
        <p><strong>Hotline:</strong> {profileData.hotline}</p>
      </div>
      <button onClick={onEdit}>Edit Profile</button>
    </div>
  );
};

export default CompanyProfile;
