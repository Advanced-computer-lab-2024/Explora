import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import logo from '../assets/cropped_image.png';
const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};

const Bookmarks = () => {
  // const [touristId] = useState("674b64cbd03522fb24ac9d06"); // Hardcoded tourist ID

  const [bookmarks, setBookmarks] = useState({ activities: [], itineraries: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);
  const handleClosePromoModal = () => setShowPromoModal(false);

  useEffect(() => {
    setShowPromoModal(true);
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/tour_guide_itinerary/bookmark/${touristId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        setBookmarks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [touristId]);

  const handleDelete = async (id, type) => {
    try {
        // Send DELETE request to the backend
        const response = await axios.delete(
            `http://localhost:4000/api/tour_guide_itinerary/bookmark/${touristId}/${id}`
        );

        // Check if deletion was successful
        if (response.status === 200) {
            // Update local state if the backend deletion succeeds
            setBookmarks((prevBookmarks) => ({
                ...prevBookmarks,
                [type]: prevBookmarks[type].filter((item) => item._id !== id),
            }));
        }
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        alert("Failed to delete the bookmark. Please try again.");
    }
};

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
          <a href="/tourist-home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/UpcomingActivities" style={{ color: 'white', textDecoration: 'none' }}>Activities</a>
          <a href="/book-flight" style={{ color: 'white', textDecoration: 'none' }}>Flights</a>
          <a href="/book-hotel" style={{ color: 'white', textDecoration: 'none' }}>Hotels</a>
          <a href="/UpcomingItineraries" style={{ color: 'white', textDecoration: 'none' }}>Itineraries</a>
          <a href="/UpcomingBookedEvents" style={{ color: 'white', textDecoration: 'none' }}>Upcoming Events</a>
          <a href="/product-list-tourist" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
          <a href="/Notifications" style={{ color: 'white', textDecoration: 'none' }}>Notifications</a>
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

              <button
                onClick={() => navigate('/cart')}
                style={buttonStyle}
              >
                Cart
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/file-complaint')}
                style={buttonStyle}
              >
                File Complaint
              </button>
              <button
                onClick={() => navigate('/change-password')}
                style={buttonStyle}
              >
                Change Password
              </button>
              <button
                onClick={() => navigate('/Bookmarks')}
                style={buttonStyle}
              >
                Bookmarks
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
                My Promo Codes
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
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
                  <button
                    onClick={() => navigate('/past-orders')}
                    style={buttonStyle}
                  >
                    Past Orders
                  </button>
                  <button
                    onClick={() => navigate('/view-booked-transportations')}
                    style={buttonStyle}
                  >
                    Booked Transportations
                  </button>
                  <button
                    onClick={() => navigate('/PastBookedEvents')}
                    style={buttonStyle}
                  >
                    Booked Events
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <div style={{ marginTop: '80px' }}>
  <h1 className="header">Bookmarks </h1>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        {/* Activities */}
        <h2>Activities</h2>
        {bookmarks.activities.length > 0 ? (
          bookmarks.activities.map((activity) => (
            <div
              key={activity._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{activity.name}</h3>
              <p>{activity.location}</p>
              <p>
                {new Date(activity.date).toLocaleDateString()} at {activity.time}
              </p>
              <p>Price: ${activity.price}</p>
              <p>Rating: {activity.rating}/5</p>
              <button
                style={buttonStyle}
                onClick={() => handleDelete(activity._id, 'activities')}
              >
                Delete Bookmark
              </button>
            </div>
          ))
        ) : (
          <p>No bookmarked activities available.</p>
        )}

        {/* Itineraries */}
        <h2>Itineraries</h2>
        {bookmarks.itineraries.length > 0 ? (
          bookmarks.itineraries.map((itinerary) => (
            <div
              key={itinerary._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{itinerary.tourGuideName}'s Itinerary</h3>
              <p>Locations: {itinerary.locations}</p>
              <p>Duration: {itinerary.duration} hours</p>
              <p>Price: ${itinerary.price}</p>
              <button
                style={buttonStyle}
                onClick={() => handleDelete(itinerary._id, 'itineraries')}
              >
                Delete Bookmark
              </button>
            </div>
          ))
        ) : (
          <p>No bookmarked itineraries available.</p>
        )}
      </div>
    </div>
    </div>
  );
};



export default Bookmarks;
