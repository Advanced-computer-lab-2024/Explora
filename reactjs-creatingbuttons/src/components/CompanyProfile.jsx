import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyProfile.css'; // Import the CSS file

const CompanyProfile = () => {
  const [advertisers, setAdvertisers] = useState([]);

  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/advertisers');
        setAdvertisers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdvertisers();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-title">Advertisers Profiles List</h2>
      {advertisers.length === 0 ? (
        <p className="no-profiles">No profiles found.</p>
      ) : (
        <ul className="profile-list">
          {advertisers.map((advertiser) => (
            <li key={advertiser._id} className="profile-card">
              <h3 className="company-name">{advertiser.companyName}</h3>
              <p><strong>Website:</strong> {advertiser.website || 'N/A'}</p>
              <p><strong>Hotline:</strong> {advertiser.hotline || 'N/A'}</p>
              <p><strong>Profile Description:</strong> {advertiser.profile || 'N/A'}</p>
              <p><strong>Username:</strong> {advertiser.username}</p>
              <p><strong>Email:</strong> {advertiser.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyProfile;

