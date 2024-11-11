import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const PastActivities = () => {
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [activityRatings, setActivityRatings] = useState({});
  const [guideRatings, setGuideRatings] = useState({});
  const [itineraryComments, setItineraryComments] = useState({});
  const [guideComments, setGuideComments] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/api/activity/previous-activities')
      .then(response => {
        console.log(response.data); // Check if the tourGuide is available here
        const formattedData = response.data.map((place) => ({
          ...place,
          date: place.date ? place.date.split('T')[0] : 'Date not available',
          dateObject: place.date ? new Date(place.date) : null,
        }));
        setPlaces(formattedData);
      })
      .catch(error => {
        console.error('Error fetching activity:', error);
        setMessage('Failed to load activity.');
      });
  }, []);
  
  const shareLink = (place) => {
    const link = `http://localhost:4000/api/activity/${place._id}`;
    navigator.clipboard.writeText(link)
      .then(() => setMessage('Link copied to clipboard!'))
      .catch(() => setMessage('Failed to copy link.'));
  };

  const shareEmail = (place) => {
    const subject = `Check out this activity: ${place.name}`;
    const body = `I thought you might be interested in this activity:\n\n${place.name}\nDate: ${place.date}\nPrice: ${place.price}$\nRating: ${place.rating}/10\nTour Guide: ${place.tourGuideName ? place.tourGuideName : 'N/A'}\n\nYou can check it out here: http://localhost:3000/activities/${place._id}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleActivityRating = (placeId, rating) => {
    setActivityRatings((prevRatings) => ({
      ...prevRatings,
      [placeId]: rating,
    }));
    alert(`You rated "${placeId}" activity with ${rating} stars!`);
  };

  const handleGuideRating = (placeId, rating) => {
    setGuideRatings((prevRatings) => ({
      ...prevRatings,
      [placeId]: rating,
    }));
    alert(`You rated the guide for "${placeId}" with ${rating} stars!`);
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
    alert(`Itinerary comment submitted for "${placeId}": ${itineraryComments[placeId]}`);
    setItineraryComments((prevComments) => ({
      ...prevComments,
      [placeId]: '',
    }));
  };

  const handleGuideCommentSubmit = (placeId) => {
    alert(`Guide comment submitted for "${placeId}": ${guideComments[placeId]}`);
    setGuideComments((prevComments) => ({
      ...prevComments,
      [placeId]: '',
    }));
  };

  return (
    <div className="UpcomingItineraries">
      <h1 className="header">Previous Activities</h1>
      <div className="activities-list">
        {places.map((place) => (
          <div key={place._id} className="activity-card">
            <h2 className="activity-name">{place.name}</h2>
            <p className="activity-date">Date: {place.date}</p>
            <p className="activity-price">Price: {place.price}$</p>
            <p className="activity-rating">Activity Rating: {place.rating}/10</p>
            
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
                Submit Comment
              </button>
            </div>

           

            <div className="share-buttons">
              <button className="share-button" onClick={() => shareLink(place)}>Share Link</button>
              <button className="share-button" onClick={() => shareEmail(place)}>Share by Email</button>
            </div>

            
          </div>
        ))}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default PastActivities;
