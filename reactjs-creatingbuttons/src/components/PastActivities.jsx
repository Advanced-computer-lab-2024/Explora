import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import activity1 from '../assets/outdoor activities vietnam tourism-9.jpg';

const PastActivities = () => {
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState('');
  const [activityRatings, setActivityRatings] = useState({});
  const [itineraryComments, setItineraryComments] = useState({});

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
    
  };

  const handleItineraryCommentChange = (placeId, comment) => {
    setItineraryComments((prevComments) => ({
      ...prevComments,
      [placeId]: comment,
    }));
  };

  const handleItineraryCommentSubmit = (placeId) => {
    setItineraryComments((prevComments) => ({
      ...prevComments,
      [placeId]: '',
    }));
  };

  return (
    <div className="UpcomingItineraries">
      <h1 className="header">Previous Activities</h1>
      <div className="activities-list">
        {places.map((place) => (
    <div key={place._id} className="activity-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {/* Center the image by using inline Flexbox styles */}
    <img src={activity1} alt={place.name} width="350" height="auto" />
    <h2 className="activity-name">{place.name}</h2>
    <p className="activity-date" style={{ fontSize: '20px', fontWeight: 'bold' }}>
      Date: {place.date}
    </p>
    <p className="activity-price" style={{ fontSize: '20px', fontWeight: 'bold' }}>
      Price: {place.price}$
    </p>

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
      <p>{message}</p>
    </div>
  );
};

export default PastActivities;
