import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sellerhome() {
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <h1>Seller Home</h1>

        {/* Add navigation to CreateSeller component */}
        <button onClick={() => navigate('/create-seller')}>Create Profile</button>
        <button>View Profiles</button>
        <button onClick={() => navigate('/update-seller')}>Update my profile</button>
        <button onClick={() => navigate('/product-list-seller')}>View Products</button>
        <button onClick={() => navigate('/request-account-deletion')}> Request Account Deletion </button>
        <button onClick={() => navigate('/change-password')}>Change My Password</button>
        <button onClick={() => navigate('/upload-image')}>
          Upload Logo
        </button>
      </div>
    </header>
  );
}
