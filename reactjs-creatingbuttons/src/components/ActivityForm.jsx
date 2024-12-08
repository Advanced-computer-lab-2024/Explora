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

const ActivityForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: [],
        discount: '',
        bookingOpen: false,
    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('');
    const [advertisers, setAdvertisers] = useState([]); // Stores all advertisers
    const [selectedAdvertiser, setSelectedAdvertiser] = useState(null); // Currently selected advertiser for editing
    const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active
      // State to store name and description
      const [name, setName] = useState('');
      const [description, setDescription] = useState('');
      const [termsAccepted, setTermsAccepted] = useState(false);
      const navigate = useNavigate();
    
      const [currentTag, setCurrentTag] = useState({});
      const [users, setUsers] = useState([]); // State for users
      const [totalUsers, setTotalUsers] = useState(0); // State for total users
      const [newUsersThisMonth, setNewUsersThisMonth] = useState(0); // State for new users this month
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
    // Fetch categories and tags on component mount
    useEffect(() => {
        const fetchCategoriesAndTags = async () => {
            try {
                const categoryResponse = await axios.get('http://localhost:4000/ActivityCategories');
                const tagResponse = await axios.get('http://localhost:4000/PrefrenceTag');
                setCategories(categoryResponse.data);
                setTags(tagResponse.data);
            } catch (error) {
                console.error('Error fetching categories or tags:', error);
                setMessage('Error fetching categories or tags.');
            }
        };
        fetchCategoriesAndTags();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const updatedTags = checked
                ? [...prevData.tags, value] // Add the tag to the array if checked
                : prevData.tags.filter((tag) => tag !== value); // Remove the tag if unchecked
            return {
                ...prevData,
                tags: updatedTags,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const advertiserId = localStorage.getItem('userId');
        if (!advertiserId) {
            setMessage('Advertiser ID is missing. Please log in first.');
            return;
        }

        try {
            // Prepare the data
            const data = {
                advertiserId,
                name: formData.name,
                date: formData.date,
                time: formData.time,
                location: formData.location,
                price: parseFloat(formData.price), // Ensure it's a number
                category: formData.category, // The category name will be sent
                tags: formData.tags, // Tags will be sent as an array of tag names
                specialDiscounts: formData.discount, // This will be sent as a string
                bookingOpen: formData.bookingOpen,
            };

            // Log the data before sending to the server
            console.log('Data to be sent to server:', data);

            // Send data to the backend
            const response = await axios.post(`http://localhost:4000/Activity/create/${advertiserId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data) {
                setMessage('Activity created successfully!');
                setFormData({
                    name: '',
                    date: '',
                    time: '',
                    location: '',
                    price: '',
                    category: '',
                    tags: [],
                    discount: '',
                    bookingOpen: false,
                });
            }
        } catch (error) {
            console.error('Error submitting activity:', error);
            setMessage('Error submitting activity, please try again.');
        }
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
    
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Time:</label>
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.activityType}>
                            {category.activityType}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Tags:</label>
                {tags.map((tag) => (
                    <div key={tag._id}>
                        <input
                            type="checkbox"
                            value={tag.tag}
                            checked={formData.tags.includes(tag.tag)}
                            onChange={handleTagChange}
                        />
                        <label>{tag.tag}</label>
                    </div>
                ))}
            </div>
            <div>
                <label>Special Discounts:</label>
                <input
                    type="text"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Booking Open:</label>
                <input
                    type="checkbox"
                    name="bookingOpen"
                    checked={formData.bookingOpen}
                    onChange={(e) => setFormData({ ...formData, bookingOpen: e.target.checked })}
                />
            </div>
            <button type="submit">Create Activity</button>
            {message && <p>{message}</p>}
        </form>
        </div>
    );
};

export default ActivityForm;
