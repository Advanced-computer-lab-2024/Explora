import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cropped_image.png';

const FileComplaint = () => {
  const [complaint, setComplaint] = useState({
    title: '',
    body: '',
    date: new Date().toISOString().slice(0, 10),
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () =>
    setTimeout(() => setIsHistoryOptionsVisible(false), 900);
  const handleClosePromoModal = () => setShowPromoModal(false);

  useEffect(() => {
    setShowPromoModal(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = '67322cdfa472e2e7d22de84a'; // Example user ID
      const response = await axios.post(
        `http://localhost:4000/complaints/${userId}`,
        complaint,
        {
          headers: {
            'Content-Type': 'application/json', // Ensures the server receives JSON
          },
        }
      );

      // Check if the complaint was created successfully (HTTP status 201 for created)
      if (response.status === 201) {
        setMessage('Your complaint has been filed successfully!');
        setComplaint({ title: '', body: '', date: new Date().toISOString().slice(0, 10) });
      }
    } catch (err) {
      console.error('Error filing complaint:', err);
      setMessage('There was an error filing your complaint. Please try again later.');
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/tourist-home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/UpcomingActivities" style={{ color: 'white', textDecoration: 'none' }}>Activities</a>
          <a href="/book-flight" style={{ color: 'white', textDecoration: 'none' }}>Flights</a>
          <a href="/book-hotel" style={{ color: 'white', textDecoration: 'none' }}>Hotels</a>
          <a href="/UpcomingItineraries" style={{ color: 'white', textDecoration: 'none' }}>Itineraries</a>
          <a href="/UpcomingBookedEvents" style={{ color: 'white', textDecoration: 'none' }}>Upcoming Events</a>
          <a href="/product-list-tourist" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
          <a href="/Notifications" style={{ color: 'white', textDecoration: 'none' }}>Notifications</a>
        </div>
        <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <svg
            onClick={toggleDropdown}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"
              fill="white"
            />
          </svg>
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
                onClick={() => navigate('/ProfileDetailsPage')}
                style={buttonStyle}
              >
                Profile
              </button>
              <a
                href="/history"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                History
              </a>
              <button onClick={() => navigate('/cart')} style={buttonStyle}>
                Cart
              </button>
              <button onClick={() => navigate('/')} style={buttonStyle}>
                Log Out
              </button>
              <button onClick={() => navigate('/file-complaint')} style={buttonStyle}>
                File Complaint
              </button>
              <button onClick={() => navigate('/change-password')} style={buttonStyle}>
                Change Password
              </button>
              <button onClick={() => navigate('/Bookmarks')} style={buttonStyle}>
                Bookmarks
              </button>
              <button onClick={() => navigate('/my-promo-codes')} style={buttonStyle}>
                My Promo Codes
              </button>
              <button onClick={() => navigate('/my-promo-codes')} style={buttonStyle}>
                Current Orders
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
                  <button
                    onClick={() => navigate('/tourist-previous-activities')}
                    style={buttonStyle}
                  >
                    Past Activities
                  </button>
                  <button
                    onClick={() => navigate('/tourist-past-itineraries')}
                    style={buttonStyle}
                  >
                    Past Itineraries
                  </button>
                  <button onClick={() => navigate('/past-orders')} style={buttonStyle}>
                    Past Orders
                  </button>
                  <button
                    onClick={() => navigate('/view-booked-transportations')}
                    style={buttonStyle}
                  >
                    Booked Transportations
                  </button>
                  <button onClick={() => navigate('/PastBookedEvents')} style={buttonStyle}>
                    Booked Events
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <div style={containerStyle}>
        <div style={headerStyle}>
          <FontAwesomeIcon icon={faCircleExclamation} size="lg" style={{ marginRight: '10px', color: '#008080' }} />
          <h2 style={titleStyle}>File a Complaint</h2>
        </div>
        <div style={formCardStyle}>
          <form onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Title:</label>
              <input
                type="text"
                name="title"
                value={complaint.title}
                onChange={handleChange}
                placeholder="Enter complaint title"
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Problem:</label>
              <textarea
                name="body"
                value={complaint.body}
                onChange={handleChange}
                placeholder="Describe your issue"
                rows="4"
                required
                style={textareaStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Date:</label>
              <input
                type="date"
                name="date"
                value={complaint.date}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={buttonStyle}>Submit Complaint</button>
          </form>
          {message && <p style={feedbackMessageStyle}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: '100px', // Adjust this value to give enough space for the nav bar
};


const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '30px',
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

const titleStyle = {
  margin: 0,
  color: '#333',
};

const formCardStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
  display: 'block',
  marginBottom: '5px',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

const textareaStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '12px 20px',
  fontSize: '16px',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#008080',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  width: '100%',
};

const feedbackMessageStyle = {
  marginTop: '20px',
  fontSize: '16px',
  color: '#008080',
  textAlign: 'center',
};

export default FileComplaint;
