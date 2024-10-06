import React, { useState } from 'react';

export default function UpdateSeller() {
  // State to store name and description
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
    <header>
    <div>
      <h1>Update Seller Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description of yourself"
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
    </header>
  );
}
