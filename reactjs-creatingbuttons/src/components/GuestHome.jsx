import React from 'react';
import { useNavigate } from 'react-router-dom';

const GuestHome = () => {
  const navigate = useNavigate();  // Initialize navigate function

  const handleUploadDocumentsClick = () => {
    navigate('/upload-documents'); // Redirect to upload documents page
  };

  const handleSearchClick = () => {
    navigate('/tourist-search'); // Redirect to TouristSearch page
  };

  return (
    <header>
      <div className="button-container">
        <button onClick={handleUploadDocumentsClick}>Upload Required Documents</button>
        <button onClick={handleSearchClick}>Search for Museums, Historical Places, or Activities</button>
      </div>
    </header>
  );
};

export default GuestHome;
