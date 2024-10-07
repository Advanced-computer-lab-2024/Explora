import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyProfileForm = () => {
  const [advertisers, setAdvertisers] = useState([]); // Stores all advertisers
  const [selectedAdvertiser, setSelectedAdvertiser] = useState(null); // Currently selected advertiser for editing
  const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active

  // Empty advertiser template
  const emptyAdvertiser = {
    companyName: '',
    website: '',
    hotline: '',
    profile: '',
    username: '',
    email: '',
    password: ''
  };

  // Fetch all advertiser profiles on component mount
  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/advertisers'); // Adjust the API endpoint
        setAdvertisers(response.data); // Set the fetched advertisers
      } catch (err) {
        console.error('Error fetching advertisers:', err);
      }
    };

    fetchAdvertisers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setSelectedAdvertiser({ ...selectedAdvertiser, [e.target.name]: e.target.value });
  };

  // Handle form submission for both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && selectedAdvertiser._id) {
        // Update existing profile
        const response = await axios.put(`http://localhost:4000/api/advertisers/update/${selectedAdvertiser._id}`, selectedAdvertiser);
        alert(response.data.message || 'Advertiser updated successfully');
        setAdvertisers(advertisers.map(ad => (ad._id === selectedAdvertiser._id ? selectedAdvertiser : ad))); // Update the advertiser list
      } else {
        // Create new profile
        const response = await axios.post('http://localhost:4000/api/advertisers/create', selectedAdvertiser);
        alert(response.data.message || 'Advertiser created successfully');
        setAdvertisers([...advertisers, response.data]); // Add the new advertiser to the list
      }
      setSelectedAdvertiser(null); // Reset form
      setIsEditing(false); // Exit editing mode
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      if (err.response) {
        alert(err.response.data.error || 'An unexpected error occurred');
      } else {
        alert('Failed to connect to the server');
      }
    }
  };

  // Select an advertiser for editing
  const handleEdit = (advertiser) => {
    setSelectedAdvertiser(advertiser);
    setIsEditing(true); // Switch to editing mode
  };

  // Create a new profile
  const handleCreateNew = () => {
    setSelectedAdvertiser(emptyAdvertiser); // Reset form for new profile
    setIsEditing(false); // Switch to create mode
  };

  return (
    <div>
      <h2>{isEditing ? 'Update Advertiser Profile' : 'Create Advertiser Profile'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="companyName"
          placeholder="Company Name"
          value={selectedAdvertiser?.companyName || ''}
          onChange={handleChange}
          required
        />
        <input
          name="website"
          placeholder="Website"
          value={selectedAdvertiser?.website || ''}
          onChange={handleChange}
        />
        <input
          name="hotline"
          placeholder="Hotline"
          value={selectedAdvertiser?.hotline || ''}
          onChange={handleChange}
        />
        <input
          name="profile"
          placeholder="Profile"
          value={selectedAdvertiser?.profile || ''}
          onChange={handleChange}
        />
        <input
          name="username"
          placeholder="Username"
          value={selectedAdvertiser?.username || ''}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={selectedAdvertiser?.email || ''}
          onChange={handleChange}
          required
        />
        {!isEditing && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={selectedAdvertiser?.password || ''}
            onChange={handleChange}
            required
          />
        )}
        {/* Password only required for creation */}
        <button type="submit">{isEditing ? 'Update Profile' : 'Create Profile'}</button>
      </form>

      {/* Button to create a new profile */}
      {!isEditing && <button onClick={handleCreateNew}>Create New Profile</button>}

      {/* List of all advertisers */}
      <h3>All Profiles</h3>
      <ul>
        {advertisers.map(advertiser => (
          <li key={advertiser._id}>
            <strong>{advertiser.companyName}</strong>
            <br />
            <button onClick={() => handleEdit(advertiser)}>Edit</button>
            {/* Optionally add delete button here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyProfileForm;
