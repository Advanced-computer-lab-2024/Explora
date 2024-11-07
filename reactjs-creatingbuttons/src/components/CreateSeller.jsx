import React, { useState } from 'react';

export default function CreateSeller() {
  // State to store name and description
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for updating profile (e.g., sending data to backend)
    console.log({
      name,
      description,
    });
    alert('Profile updated!');
  };

  return (
    <header style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div>
        <h1>Create Seller Profile</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '16px' }}>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{ width: '100%', padding: '8px', fontSize: '14px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '16px' }}>Description: </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description of yourself"
              required
              style={{ width: '100%', padding: '8px', fontSize: '14px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '15px', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              style={{ marginRight: '0px' }}  // Reduced the margin
            />
            <label style={{ display: 'inline-block', margin: 0 }}>
              I accept the terms and conditions
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '4px' }}>
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
