import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const PastItineraries = () => {
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [activityRatings, setActivityRatings] = useState({});
  const [guideRatings, setGuideRatings] = useState({});
  const [itineraryComments, setItineraryComments] = useState({});
  const [guideComments, setGuideComments] = useState({});

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
    <div className="UpcomingItineraries">
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
            <p className="tour-guide-id">Tour Guide: {place.tourGuideId ? place.tourGuideId : 'N/A'}</p>
            
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
                  <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.563-1.563-4.096-1.561-5.657 0l-4.998 4.998c-.183.182-.347.375-.491.575-.436.622-.733 1.305-.907 2.01-.208.632-.389 1.269-.557 1.906zm-.143 1.436c.207-.662.465-1.308.771-1.926.102-.222.208-.448.314-.672.65-.951 1.429-1.688 2.267-2.511 1.155-.911 2.366-1.552 3.743-2.242 1.378-.665 2.845-.85 4.271-.607zm5.574 5.563c-1.279-.976-.97-.025-.532.485.153-.62-.384-.937-.708-1.418z"/>
                </svg>
                Share Link
              </button>

              <button className="share-button" onClick={() => shareEmail(place)}>
                {/* Custom SVG Icon for Email */}
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                  <path d="M20.995 2.563l-8.999 8.999c-.295.295-.658.439-1.022.439s-.727-.145-1.022-.439l-9-8.999a2.392 2.392 0 0 0-3.389 3.389l8.999 8.999c.295.295.658.439 1.022.439s.727-.145 1.022-.439l8.999-8.999c.294-.294.438-.656.438-1.022s-.145-.728-.438-1.022a2.392 2.392 0 0 0-3.389-3.389z"/>
                </svg>
                Share via Email
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastItineraries;
