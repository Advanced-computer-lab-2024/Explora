import React, { useState, useEffect } from 'react';
//import './PastItineraries.css'; // Ensure to import the CSS file

const PastItineraries = () => {
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState('');
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [activityRatings, setActivityRatings] = useState({});
  const [guideRatings, setGuideRatings] = useState({});
  const [itineraryComments, setItineraryComments] = useState({});
  const [guideComments, setGuideComments] = useState({});

  useEffect(() => {
    const sampleData = [
      {
        _id: '1',
        name: 'Historical Museum Tour',
        date: '2024-11-15',
        price: 500,
        rating: 8,
        tourGuide: 'Alice Johnson',
      },
      {
        _id: '2',
        name: 'City Walking Tour',
        date: '2024-12-05',
        price: 35,
        rating: 9,
        tourGuide: 'Bob Smith',
      },
      {
        _id: '3',
        name: 'Mountain Hiking Adventure',
        date: '2025-01-10',
        price: 30,
        rating: 7,
        tourGuide: 'Cathy Brown',
      },
    ];

    const formattedData = sampleData.map((place) => ({
      ...place,
      dateObject: new Date(place.date),
    }));
    setPlaces(formattedData);
  }, []);

  const shareLink = (place) => {
    const link = `http://localhost:3000/activities/${place._id}`;
    navigator.clipboard.writeText(link)
      .then(() => setMessage('Link copied to clipboard!'))
      .catch(() => setMessage('Failed to copy link.'));
  };

  const shareEmail = (place) => {
    const subject = `Check out this activity: ${place.name}`;
    const body = `I thought you might be interested in this activity:\n\n${place.name}\nDate: ${place.date}\nPrice: ${place.price}$\nRating: ${place.rating}/10\nTour Guide: ${place.tourGuide}\n\nYou can check it out here: http://localhost:3000/activities/${place._id}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleBookTicket = (place) => {
    setBookedTickets((prev) => [...prev, place._id]);
    let pointsToAdd = 0;

    if (place.price <= 100000) pointsToAdd = place.price * 0.5;
    else if (place.price <= 500000) pointsToAdd = place.price * 1;
    else pointsToAdd = place.price * 1.5;

    alert(`Your ticket for "${place.name}" has been booked!`);
  };

  const handleCancelBooking = (place) => {
    const now = new Date();
    const timeDifference = place.dateObject - now;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference >= 48) {
      setBookedTickets((prev) => prev.filter(ticketId => ticketId !== place._id));
      alert(`Your booking for "${place.name}" has been canceled.`);
    } else {
      alert('You can only cancel your booking 48 hours before the event starts.');
    }
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
      <h1 className="header">Previous Itineraries</h1>
      <div className="activities-list">
        {places.map((place) => (
          <div key={place._id} className="activity-card">
            <h2 className="activity-name">{place.name}</h2>
            <p className="activity-date">Date: {place.date}</p>
            <p className="activity-price">Price: {place.price}$</p>
            <p className="activity-rating">Activity Rating: {place.rating}/10</p>
            <p className="tour-guide-name">Tour Guide: {place.tourGuide}</p>
            
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
                              <button className="share-button" onClick={() => shareLink(place)}>Share Link</button>
              <button className="share-button" onClick={() => shareEmail(place)}>Share via Email</button>
            </div>
          </div>
        ))}
      </div>
     
      <div>{message}</div>
    </div>
  );
};

export default PastItineraries;
