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
        <button onClick={() => navigate('/product-list')}>View Products</button>

        {/* New button for Request Account Deletion */}
        <button onClick={() => navigate('/request-deletion')}>Request Account Deletion</button>
      </div>
    </header>
  );
}
