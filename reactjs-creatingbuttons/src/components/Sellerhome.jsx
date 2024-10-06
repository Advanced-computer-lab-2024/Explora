import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sellerhome() {
  const navigate = useNavigate();

  return (
    <header>
    <div>
      <h1>Seller Home</h1>
      <button onClick={() => navigate('/update-seller')}>Update my profile</button>
      <button onClick={() => navigate('/product-list')}>View Products</button>
    </div>
    </header>
  );
}
