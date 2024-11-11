import React, { useState, useEffect } from 'react';

const UpcomingItineraries = () => {
  const [itins, setItins] = useState([]);
  const [message, setMessage] = useState('');
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [cashBalance, setCashBalance] = useState(0);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/api/tour_guide_itinerary/upcoming')
      .then(response => response.json())
      .then(data => {
        // Format the date if available
        const formattedData = data.map((itin) => {
          const formattedDate = itin.availableDates ? new Date(itin.availableDates).toLocaleDateString('en-US', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          }) : 'No Date Available';
          return { ...itin, date: formattedDate };
        });
        setItins(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getBadgeLevel = (points) => {
    if (points > 500000) return 'Level 3 Badge';
    else if (points > 100000) return 'Level 2 Badge';
    else if (points > 0) return 'Level 1 Badge';
    return '';
  };

  const shareLink = (itin) => {
    const link = `http://localhost:4000/api/tour_guide_itinerary/${itin._id}`;
    
    // Ensure user feedback on successful copy
    navigator.clipboard.writeText(link)
        .then(() => setMessage('Link copied to clipboard!'))
        .catch((err) => setMessage(`Failed to copy link: ${err.message}`));
  };

  const shareEmail = (itin) => {
    const subject = `Check out this activity: ${itin.name}`;
    const body = `I thought you might be interested in this activity:\n\n${itin.name}\nDate: ${itin.date}\nPrice: ${itin.price}$\nRating: ${itin.rating}/10\n\nYou can check it out here: http://localhost:3000/activities/${itin._id}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleBookTicket = (itin) => {
    setBookedTickets((prev) => [...prev, itin._id]);
    let pointsToAdd = 0;

    if (itin.price <= 100000) pointsToAdd = itin.price * 0.5;
    else if (itin.price <= 500000) pointsToAdd = itin.price * 1;
    else pointsToAdd = itin.price * 1.5;

    setLoyaltyPoints((prevPoints) => {
      const newPoints = prevPoints + pointsToAdd;
      setBadgeLevel(getBadgeLevel(newPoints));
      return newPoints;
    });

    alert(`Your ticket for "${itin.name}" has been booked!`);
  };

  const handleCancelBooking = (itin) => {
    const now = new Date();
    const timeDifference = new Date(itin.availableDates) - now; // Time difference in milliseconds
    const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours

    // Check if the cancellation can happen based on the 48-hour rule
    if (hoursDifference >= 48) {
      setBookedTickets((prev) => prev.filter(ticketId => ticketId !== itin._id));
      alert(`Your booking for "${itin.name}" has been canceled.`);
    } else {
      alert('You can not cancel your booking less than 48 hours before the event starts.');
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

  const handleRating = (itinId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [itinId]: rating,
    }));

    alert(`You rated "${itinId}" with ${rating} stars!`);
  };

  const handleCommentChange = (itinId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [itinId]: comment,
    }));
  };

  const handleCommentSubmit = (itinId) => {
    alert(`Comment submitted for "${itinId}": ${comments[itinId]}`);
    setComments((prevComments) => ({
      ...prevComments,
      [itinId]: '',
    }));
  };

  return (
    <div className="UpcomingItineraries">
      <h1 className="header">Upcoming Itineraries</h1>
      <div className="activities-list">
        {itins.map((itin) => (
          <div key={itin._id} className="activity-card">
            <h2 className="activity-name">{itin.locations}</h2>
            <p className="activity-rating">TourGuide: {itin.tourGuideName}</p>
            <p className="activity-date">Date: {itin.availableDates}</p>
            <p className="activity-price">Price: {itin.price}$</p>
            <p className="activity-rating">language: {itin.language}</p>


            <div className="share-buttons">
              <button onClick={() => shareLink(itin)}>Share Link</button>
              <button onClick={() => shareEmail(itin)}>Share via Email</button>
              {bookedTickets.includes(itin._id) ? (
                <button disabled>Ticket Already Booked</button>
              ) : (
                <button onClick={() => handleBookTicket(itin)}>Book Ticket</button>
              )}
              {bookedTickets.includes(itin._id) && (
                <button onClick={() => handleCancelBooking(itin)}>Cancel Booking</button>
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

export default UpcomingItineraries;
