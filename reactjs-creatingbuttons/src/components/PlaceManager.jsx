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

export default function MuseumsManager() {
  const [museums, setMuseums] = useState([]);
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
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    openingHours: '',
    ticketPrices: { foreigner: '', native: '', student: '' },
    tags: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentMuseumId, setCurrentMuseumId] = useState(null);

  const allowedTags = ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'];

  useEffect(() => {
    fetchMuseums();
  }, []);

  // Fetch all museums
  const fetchMuseums = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/museums/museums');
      if (Array.isArray(response.data)) {
        setMuseums(response.data);
      } else {
        console.error('Response is not an array');
      }
    } catch (error) {
      console.error('Error fetching museums:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData((prev) => ({ ...prev, tags: selectedTags }));
    } else if (['foreigner', 'native', 'student'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        ticketPrices: { ...prev.ticketPrices, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:4000/api/museums/${currentMuseumId}`, formData);
      } else {
        await axios.post('http://localhost:4000/api/museums/', formData);
      }
      fetchMuseums();
      resetForm();
    } catch (error) {
      console.error('Error saving museum:', error);
    }
  };

  // Edit a museum
  const handleEdit = (museum) => {
    setFormData(museum);
    setIsEditing(true);
    setCurrentMuseumId(museum._id);
  };

  // Delete a museum
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/museums/${id}`);
      fetchMuseums();
    } catch (error) {
      console.error('Error deleting museum:', error);
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      openingHours: '',
      ticketPrices: { foreigner: '', native: '', student: '' },
      tags: [],
    });
    setIsEditing(false);
    setCurrentMuseumId(null);
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
          <a href="/tourism-dashboard" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/places" style={{ color: 'white', textDecoration: 'none' }}>Museums and Activities</a>
          



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
                onClick={() => navigate('/places')}
                style={buttonStyle}
              >
                Manage Museums
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
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
    <div style={{ padding: '20px' }}>
      <h2>{isEditing ? 'Edit Museum' : 'Add Museum'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          name="openingHours"
          value={formData.openingHours}
          onChange={handleChange}
          placeholder="Opening Hours"
          required
        />
        <input
          name="foreigner"
          value={formData.ticketPrices.foreigner}
          onChange={handleChange}
          placeholder="Foreigner Ticket Price"
          required
        />
        <input
          name="native"
          value={formData.ticketPrices.native}
          onChange={handleChange}
          placeholder="Native Ticket Price"
          required
        />
        <input
          name="student"
          value={formData.ticketPrices.student}
          onChange={handleChange}
          placeholder="Student Ticket Price"
          required
        />
        <select
          name="tags"
          multiple
          value={formData.tags}
          onChange={handleChange}
        >
          {allowedTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <button type="submit">{isEditing ? 'Update Museum' : 'Add Museum'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <h2>Museums</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Description</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Location</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Opening Hours</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Ticket Prices</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Tags</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(museums) && museums.length > 0 ? (
            museums.map((museum) => (
              <tr key={museum._id}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{museum.name}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{museum.description}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{museum.location}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{museum.openingHours}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  Foreigner: ${museum.ticketPrices.foreigner} | Native: ${museum.ticketPrices.native} | Student: ${museum.ticketPrices.student}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {museum.tags && museum.tags.length > 0 ? museum.tags.join(', ') : 'No tags'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button onClick={() => handleEdit(museum)}>Edit</button>
                  <button onClick={() => handleDelete(museum._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                No museums available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}
