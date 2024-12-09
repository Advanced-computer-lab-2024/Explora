import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/cropped_image.png';
import { useNavigate } from 'react-router-dom';

const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  width: '100%',
  textAlign: 'center',
  margin: '10px 0',
};

const inputStyle = {
  padding: '12px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: '15px',
  width: '100%',
  fontSize: '16px',
  boxSizing: 'border-box',
};

const formContainerStyle = {
  padding: '30px',
  maxWidth: '600px',
  margin: 'auto',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  marginTop: '100px',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '24px',
  color: '#333',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '15px 30px',
  backgroundColor: '#008080',
  color: 'white',
  position: 'fixed',
  top: '0',
  width: '100%',
  zIndex: 1000,
};

const logoStyle = {
  height: '60px',
  marginRight: '20px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '80px',
  right: '0',
  backgroundColor: '#008080',
  color: 'white',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  width: '200px',
  padding: '10px 0',
  zIndex: 1000,
};

const CompanyProfileForm = () => {
  const [advertisers, setAdvertisers] = useState([]);
  const [selectedAdvertiser, setSelectedAdvertiser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvertisers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/advertisers');
        setAdvertisers(response.data);
      } catch (err) {
        console.error('Error fetching advertisers:', err);
      }
    };

    fetchAdvertisers();
  }, []);

  const handleChange = (e) => {
    setSelectedAdvertiser({ ...selectedAdvertiser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('You must accept the terms and conditions to submit the form.');
      return;
    }

    try {
      if (isEditing && selectedAdvertiser._id) {
        const response = await axios.put(`http://localhost:4000/api/advertisers/${selectedAdvertiser._id}`, selectedAdvertiser);
        alert(response.data.message || 'Advertiser updated successfully');
        setAdvertisers(advertisers.map(ad => (ad._id === selectedAdvertiser._id ? selectedAdvertiser : ad)));
      } else {
        const response = await axios.post('http://localhost:4000/api/advertisers/create', selectedAdvertiser);
        alert(response.data.message || 'Advertiser created successfully');
        setAdvertisers([...advertisers, response.data]);
      }
      setSelectedAdvertiser(null);
      setIsEditing(false);
      setTermsAccepted(false);
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      if (err.response) {
        alert(err.response.data.error || 'An unexpected error occurred');
      } else {
        alert('Failed to connect to the server');
      }
    }
  };

  const handleEdit = (advertiser) => {
    setSelectedAdvertiser(advertiser);
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setSelectedAdvertiser({ companyName: '', website: '', hotline: '', profile: '', username: '', email: '', password: '' });
    setIsEditing(false);
  };

  return (
    <div>
      <nav style={navStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />
        <div>
          <a href="/company" style={linkStyle}>Home</a>
        </div>
      </nav>

      <div style={{ marginTop: '100px' }}></div>

      <div style={formContainerStyle}>
        <h2 style={headerStyle}>{isEditing ? 'Update Advertiser Profile' : 'Create Advertiser Profile'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="companyName"
            placeholder="Company Name"
            value={selectedAdvertiser?.companyName || ''}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="website"
            placeholder="Website"
            value={selectedAdvertiser?.website || ''}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="hotline"
            placeholder="Hotline"
            value={selectedAdvertiser?.hotline || ''}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="profile"
            placeholder="Profile"
            value={selectedAdvertiser?.profile || ''}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="username"
            placeholder="Username"
            value={selectedAdvertiser?.username || ''}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={selectedAdvertiser?.email || ''}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={selectedAdvertiser?.password || ''}
            onChange={handleChange}
            required={!isEditing}
            style={inputStyle}
          />

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              style={{ marginRight: '10px' }}
            />
            <label>I accept the terms and conditions</label>
          </div>

          <button type="submit" style={buttonStyle}>
            {isEditing ? 'Update Profile' : 'Create Profile'}
          </button>
        </form>

        {!isEditing && (
          <button onClick={handleCreateNew} style={buttonStyle}>
            Create New Profile
          </button>
        )}

        <h3>All Profiles</h3>
        <ul>
          {advertisers.map(advertiser => (
            <li key={advertiser._id} style={{ marginBottom: '10px' }}>
              <strong>{advertiser.companyName}</strong>
              <br />
              <button onClick={() => handleEdit(advertiser)} style={buttonStyle}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
