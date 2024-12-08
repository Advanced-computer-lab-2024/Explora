import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/cropped_image.png';
import { useNavigate } from 'react-router-dom';
const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};

const CompanyProfileForm = () => {
  const [advertisers, setAdvertisers] = useState([]); // Stores all advertisers
  const [selectedAdvertiser, setSelectedAdvertiser] = useState(null); // Currently selected advertiser for editing
  const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active
    // State to store name and description
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();
  
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState({});
    const [users, setUsers] = useState([]); // State for users
    const [totalUsers, setTotalUsers] = useState(0); // State for total users
    const [newUsersThisMonth, setNewUsersThisMonth] = useState(0); // State for new users this month
    const [message, setMessage] = useState('');
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [badgeLevel, setBadgeLevel] = useState('');
    const [guideRatings, setGuideRatings] = useState({});
    const [guideComments, setGuideComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);
  
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
    const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);

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
    if (!termsAccepted) {
      alert('You must accept the terms and conditions to submit the form.');
      return;
    }

    try {
      if (isEditing && selectedAdvertiser._id) {
        // Update existing profile
        const response = await axios.put(`http://localhost:4000/api/advertisers/${selectedAdvertiser._id}`, selectedAdvertiser);
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
      setTermsAccepted(false); // Reset terms acceptance
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
           <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1px 5px',
          backgroundColor: '#008080',
          color: 'white',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          justifyContent: 'space-between',
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/company" style={{ color: 'white', textDecoration: 'none' }}>Home</a>

          


        </div>

        {/* SVG Icon */}
        <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <svg
            onClick={toggleDropdown}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" fill="white" />
          </svg>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              style={{
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
              }}
              onMouseEnter={handleMouseEnterHistory}
              onMouseLeave={handleMouseLeaveHistory}
            >
              <button
                onClick={() => navigate('/advertisers/create')}
                style={buttonStyle}
              >
                Create Profile
              </button>
             

              <button
                onClick={() => navigate('/create-act')}
                style={buttonStyle}
              >
                Create Activity
              </button>
              <button
                onClick={() => navigate('/advertisers')}
                style={buttonStyle}
              >
               View Profiles
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
             
              <button
                onClick={() => navigate('/change-password')}
                style={buttonStyle}
              >
                Change Password
              </button>
              <button
                onClick={() => navigate('/request-account-deletion')}
                style={buttonStyle}
              >
                Request Account Deletion
              </button>
              
            

              {isHistoryOptionsVisible && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '220px',
                    backgroundColor: '#008080',
                    color: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '200px',
                    padding: '10px 0',
                    zIndex: 1000,
                  }}
                >
                

                  
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <div style={{ marginTop: '80px' }}>
</div>
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
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={selectedAdvertiser?.password || ''}
          onChange={handleChange}
          required={isEditing ? false : true} // Password is required only if creating a new advertiser
        />
        
        {/* Terms and Conditions Checkbox */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            style={{ marginRight: '5px' }}
          />
          <label style={{ margin: 0 }}>I accept the terms and conditions</label>
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>
          {isEditing ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>

      {/* Button to create a new profile */}
      {!isEditing && <button onClick={handleCreateNew} style={{ marginTop: '10px' }}>Create New Profile</button>}

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
    </div>
  );
};

export default CompanyProfileForm;
