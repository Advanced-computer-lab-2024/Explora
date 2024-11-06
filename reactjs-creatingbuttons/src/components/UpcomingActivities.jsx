import React, { useState, useEffect } from 'react';

const UpcomingActivities = () => {
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState('');
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [cashBalance, setCashBalance] = useState(0);
  const [ratings, setRatings] = useState({}); // State for ratings
  const [comments, setComments] = useState({}); // State for comments

  useEffect(() => {
    fetch('http://localhost:4000/api/activity/upcoming')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((place) => ({
          ...place,
          date: place.date.split('T')[0],
          dateObject: new Date(place.date),
        }));
        setPlaces(formattedData);
      });
  }, []);

  const getBadgeLevel = (points) => {
    if (points > 500000) return 'Level 3 Badge';
    else if (points > 100000) return 'Level 2 Badge';
    else if (points > 0) return 'Level 1 Badge';
    return '';
  };

  const shareLink = (place) => {
    const link = `http://localhost:3000/activities/${place._id}`;
    navigator.clipboard.writeText(link)
      .then(() => setMessage('Link copied to clipboard!'))
      .catch(() => setMessage('Failed to copy link.'));
  };

  const shareEmail = (place) => {
    const subject = `Check out this activity: ${place.name}`;
    const body = `I thought you might be interested in this activity:\n\n${place.name}\nDate: ${place.date}\nPrice: ${place.price}$\nRating: ${place.rating}/10\n\nYou can check it out here: http://localhost:3000/activities/${place._id}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleBookTicket = (place) => {
    setBookedTickets((prev) => [...prev, place._id]);
    let pointsToAdd = 0;

    if (place.price <= 100000) pointsToAdd = place.price * 0.5;
    else if (place.price <= 500000) pointsToAdd = place.price * 1;
    else pointsToAdd = place.price * 1.5;

    setLoyaltyPoints((prevPoints) => {
      const newPoints = prevPoints + pointsToAdd;
      setBadgeLevel(getBadgeLevel(newPoints));
      return newPoints;
    });

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

  const redeemPoints = () => {
    const pointsRequired = 10000;
    if (loyaltyPoints >= pointsRequired) {
      const cashToAdd = (pointsRequired / 10000) * 100;
      setCashBalance((prevBalance) => prevBalance + cashToAdd);
      setLoyaltyPoints((prevPoints) => prevPoints - pointsRequired);
      setBadgeLevel(getBadgeLevel(loyaltyPoints - pointsRequired));
      alert(`You have successfully redeemed ${pointsRequired} points for ${cashToAdd} EGP!`);
    } else {
      alert('You do not have enough loyalty points to redeem for cash.');
    }
  };

  const handleRating = (placeId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [placeId]: rating,
    }));

    alert(`You rated "${placeId}" with ${rating} stars!`);
  };

  const handleCommentChange = (placeId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [placeId]: comment,
    }));
  };

  const handleCommentSubmit = (placeId) => {
    alert(`Comment submitted for "${placeId}": ${comments[placeId]}`);
    // Here you can implement any further logic, such as sending the comment to your backend.
    setComments((prevComments) => ({
      ...prevComments,
      [placeId]: '', // Clear the comment field after submission
    }));
  };

  return (
    <div className="upcoming-activities">
      <h1 className="header">Upcoming Activities</h1>
      <div className="activities-list">
        {places.map((place) => (
          <div key={place._id} className="activity-card">
            <h2 className="activity-name">{place.name}</h2>
            <p className="activity-date">Date: {place.date}</p>
            <p className="activity-price">Price: {place.price}$</p>
            <p className="activity-rating">Rating: {place.rating}/10</p>
            
            {/* Star Rating Section */}
            <div className="rating-container">
              <span>Rate this activity: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  onClick={() => handleRating(place._id, star)} 
                  style={{ 
                    cursor: 'pointer', 
                    fontSize: '24px', 
                    color: ratings[place._id] >= star ? 'gold' : 'lightgray' 
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Comment Section */}
            <div className="comment-section">
              <textarea
                placeholder="Add your comment here..."
                className="comment-input"
                value={comments[place._id] || ''}
                onChange={(e) => handleCommentChange(place._id, e.target.value)}
              />
              <button 
                className="comment-submit" 
                onClick={() => handleCommentSubmit(place._id)} 
                disabled={!comments[place._id]}
              >
                Submit Comment
              </button>
            </div>

            <div className="share-buttons">
              <button onClick={() => shareLink(place)}>Share Link</button>
              <button onClick={() => shareEmail(place)}>Share via Email</button>
              {bookedTickets.includes(place._id) ? (
                <button disabled>Ticket Already Booked</button>
              ) : (
                <button onClick={() => handleBookTicket(place)}>Book Ticket</button>
              )}
              {bookedTickets.includes(place._id) && (
                <button onClick={() => handleCancelBooking(place)}>Cancel Booking</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="points-container">
        <div className="loyalty-points">
          Loyalty Points: {loyaltyPoints} 
          {badgeLevel && <span className="badge">{badgeLevel}</span>}
        </div>
        <div className="cash-balance">
          Cash Balance: {cashBalance} EGP
        </div>
      </div>
      <button className="redeem-button" onClick={redeemPoints} disabled={loyaltyPoints < 10000}>
        Redeem 10,000 Points for 100 EGP
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UpcomingActivities;
