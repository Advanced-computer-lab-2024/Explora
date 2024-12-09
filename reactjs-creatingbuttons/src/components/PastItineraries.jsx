import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
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

const PastItineraries = () => {
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [activityRatings, setActivityRatings] = useState({});
  const [guideRatings, setGuideRatings] = useState({});
  const [itineraryComments, setItineraryComments] = useState({});
  const [guideComments, setGuideComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
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
  const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage

  useEffect(() => {
    axios.get('http://localhost:4000/api/tour_guide_itinerary/previous')
      .then(response => {
        console.log(response.data); // Log the raw data
        const formattedData = response.data.map((place) => ({
          ...place,
          availableDates: place.availableDates || [],
          dateObject: place.availableDates ? new Date(place.availableDates[0]) : null,
          tourGuideId: place.tourGuideId,
        }));
        console.log(formattedData); // Log the formatted data
        setPlaces(formattedData);
      })
      .catch(error => {
        console.error('Error fetching itineraries:', error);
        setMessage('Failed to load itineraries.');
      });
  }, []);
  

  const shareLink = (place) => {
    const link = `http://localhost:5173/tourist-past-itineraries`;
    navigator.clipboard.writeText(link)
      .then(() => setMessage('Link copied to clipboard!'))
      .catch(() => setMessage('Failed to copy link.'));
  };

  const shareEmail = (place) => {
    const subject = `Check out this activity: ${place.name}`;
    const body = `I thought you might be interested in this activity:\n\n${place.name}\nAvailable Dates: ${place.availableDates.join(', ')}\nPrice: ${place.price}$\nRating: ${place.rating}/10\nTour Guide: ${place.tourGuideName ? place.tourGuideName : 'N/A'}\n\nYou can check it out here: http://localhost:3000/activities/${place._id}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleActivityRating = (placeId, rating) => {
    setActivityRatings((prevRatings) => ({
      ...prevRatings,
      [placeId]: rating,
    }));
  };

  const handleGuideRating = (placeId, rating) => {
    setGuideRatings((prevRatings) => ({
      ...prevRatings,
      [placeId]: rating,
    }));
  };

  const handleItineraryCommentChange = (placeId, comment) => {
    setItineraryComments((prevComments) => ({
      ...prevComments,
      [placeId]: comment,
    }));
  };

  const handleGuideCommentChange = (placeId, comment) => {
    setGuideComments((prevComments) => ({
      ...prevComments,
      [placeId]: comment,
    }));
  };

  const handleItineraryCommentSubmit = (placeId) => {
    const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }
  
    const comment = itineraryComments[placeId]; // Corrected reference to itineraryComments
    const rating = activityRatings[placeId] || 0; // Corrected reference to activityRatings
  
    if (!comment) {
      alert('Please enter a comment before submitting.');
      return;
    }
  
    const place = places.find(place => place._id === placeId); // Correctly compare _id
  
    if (!place) {
      alert('Place not found.');
      return;
    }
  
    axios.post('http://localhost:4000/reviews/rateItinerary', {
      touristId: userId,
      itineraryId: placeId,
      comment,
      rating: activityRatings[placeId] || 0, // Ensure correct rating is passed
    })
      .then(response => {
        alert(`Itinerary comment submitted for "${placeId}": ${comment}`);
        setItineraryComments((prevComments) => ({
          ...prevComments,
          [placeId]: '', // Clear comment after submission
        }));
      })
      .catch(error => {
        if (error.response) {
          console.error('Backend error:', error.response.data);
          alert(`Backend error: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          console.error('No response received from server:', error.request);
          alert('No response received from server. Please check your backend connection.');
        } else {
          console.error('Request error:', error.message);
          alert(`Request error: ${error.message}`);
        }
      });
  };
    
  const handleGuideCommentSubmit = (placeId) => {
    const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }
  
    const comment = guideComments[placeId];
    const rating = guideRatings[placeId] || 0;
  
    if (!comment) {
      alert('Please enter a comment before submitting.');
      return;
    }
  
    // Find the place object corresponding to placeId
    const place = places.find(place => place._id === placeId); // Correctly compare _id
  
    if (!place) {
      alert('Place not found.');
      return;
    }
  
    axios.post('http://localhost:4000/reviews/rateTourGuide', {
      touristId: userId,
      tourGuideId: place.tourGuideId,
      comment,
      rating,
    })
      .then(response => {
        alert(`Guide comment submitted for "${placeId}": ${comment}`);
        setGuideComments((prevComments) => ({
          ...prevComments,
          [placeId]: '', // Clear the comment after submission
        }));
      })
      .catch(error => {
        if (error.response) {
          console.error('Backend error:', error.response.data);
          alert(`Backend error: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          console.error('No response received from server:', error.request);
          alert('No response received from server. Please check your backend connection.');
        } else {
          console.error('Request error:', error.message);
          alert(`Request error: ${error.message}`);
        }
      });
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

    <div className="UpcomingItineraries">

    <div style={{ marginTop: '80px' }}>
  <h1 className="header">Previous Itineraries</h1>
      <div className="activities-list">
        {places.map((place) => (
          <div key={place._id} className="activity-card">
            <h2 className="activity-name">{place.name}</h2>
            <p className="activity-date" style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Date: {place.availableDates.join(', ')}
            </p>
            <p className="activity-price" style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Price: {place.price}$
            </p>

            <p className="tour-guide-name">Tour Guide: {place.tourGuideName ? place.tourGuideName : 'N/A'}</p>
            
            <div className="rating-container">
              <span>Rate this activity: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  onClick={() => handleActivityRating(place._id, star)} 
                  style={{ 
                    cursor: 'pointer', 
                    fontSize: '24px', 
                    color: activityRatings[place._id] >= star ? 'gold' : 'lightgray' 
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="rating-container">
              <span>Rate the tour guide: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  onClick={() => handleGuideRating(place._id, star)} 
                  style={{ 
                    cursor: 'pointer', 
                    fontSize: '24px', 
                    color: guideRatings[place._id] >= star ? 'gold' : 'lightgray' 
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="comment-section">
              <textarea
                placeholder="Comment on the itinerary..."
                className="comment-input"
                value={itineraryComments[place._id] || ''}
                onChange={(e) => handleItineraryCommentChange(place._id, e.target.value)}
              />
              <button 
                className="comment-submit" 
                onClick={() => handleItineraryCommentSubmit(place._id)} 
                disabled={!itineraryComments[place._id]}
              >
                Submit Itinerary Comment
              </button>
            </div>

            <div className="comment-section">
              <textarea
                placeholder="Comment on the tour guide..."
                className="comment-input"
                value={guideComments[place._id] || ''}
                onChange={(e) => handleGuideCommentChange(place._id, e.target.value)}
              />
              <button 
                className="comment-submit" 
                onClick={() => handleGuideCommentSubmit(place._id)} 
                disabled={!guideComments[place._id]}
              >
                Submit Guide Comment
              </button>
            </div>

            <div className="share-buttons">
            <button className="share-button" onClick={() => shareLink(place)}>
                {/* Custom SVG Icon for Share Link */}
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                  <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/>
                </svg> Share Link
              </button>
              <button className="share-button" onClick={() => shareEmail(place)}>
                {/* Custom SVG Icon for Share by Email */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                </svg> Share by Email
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default PastItineraries;
