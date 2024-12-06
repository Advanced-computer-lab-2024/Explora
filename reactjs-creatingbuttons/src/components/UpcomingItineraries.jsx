import React, { useState, useEffect } from 'react';

const UpcomingItineraries = () => {
  const [itins, setItins] = useState([]);
  const [message, setMessage] = useState('');
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [cashBalance, setCashBalance] = useState(0);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch upcoming itineraries
    fetch('http://localhost:4000/api/tour_guide_itinerary/upcoming')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((itin) => {
          const formattedDate = itin.availableDates
            ? new Date(itin.availableDates).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'No Date Available';
          return { ...itin, date: formattedDate };
        });
        setItins(formattedData);
      })
      .catch(error => console.error('Error fetching itineraries:', error));
  
    // Fetch user loyalty points
    fetch(`http://localhost:4000/users/loyalty-points/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authentication
      },
    })
      .then(response => response.json())
      .then(data => {
        setLoyaltyPoints(data.loyaltyPoints || 0); // Set loyalty points or default to 0
        setBadgeLevel(getBadgeLevel(data.loyaltyPoints || 0)); // Set badge level
      })
      .catch(error => console.error('Error fetching loyalty points:', error));
  }, []);
  
  const handleBookTicket = (itin) => {
    const numberOfTickets = 1; // Assume 1 ticket for simplicity
  
    // Booking ticket API call
    fetch('http://localhost:4000/ticket/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        itineraryId: itin._id,
        numberOfTickets,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      alert(`Your ticket has been booked!`);
  
      // Update the loyalty points and badge level based on the response
      if (data.booking && data.sale) {
        setBookedTickets((prev) => [...prev, itin._id]); 
        const pointsToAdd = data.loyaltyPoints; // Use the loyaltyPoints returned from the backend
        
        // Ensure that pointsToAdd is a valid number before updating
        if (typeof pointsToAdd === 'number' && !isNaN(pointsToAdd)) {
          setLoyaltyPoints((prevPoints) => {
            const newPoints = prevPoints + pointsToAdd;
            setBadgeLevel(getBadgeLevel(newPoints)); // Update badge level based on new points
            return newPoints; // Update loyalty points state
          });
        } else {
          console.error('Invalid loyalty points:', pointsToAdd);
        }
      }
    })
    .catch((error) => {
      console.error('Error booking ticket:', error);
      alert('An error occurred while booking the ticket.');
    });
  };
  
  // Function to determine badge level based on loyalty points
  const getBadgeLevel = (loyaltyPoints) => {
    if (loyaltyPoints > 500000) return 'Level 3 Badge';
    else if (loyaltyPoints > 100000) return 'Level 2 Badge';
    else if (loyaltyPoints > 0) return 'Level 1 Badge';
    return '';
  };
    
  const shareLink = (itin) => {
    const link = `http://localhost:5173/UpcomingItineraries`;
    
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

  const handleCancelBooking = (itin) => {
    const now = new Date();
    const timeDifference = new Date(itin.availableDates) - now; // Time difference in milliseconds
    const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours

    // Check if the cancellation can happen based on the 48-hour rule
    if (hoursDifference >= 48) {
      setBookedTickets((prev) => prev.filter(ticketId => ticketId !== itin._id));
      alert(`Your booking for "${itin.locations}" has been canceled.`);
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

  return (
<div className="UpcomingItineraries">
  <h1 className="header">Upcoming Itineraries</h1>
  <div className="activities-list">
    {itins.map((itin) => (
      <div key={itin._id} className="activity-card">
        <h2 className="activity-name">{itin.locations}</h2>
        <p className="activity-rating">Tour Guide: {itin.tourGuideName}</p>
        <p className="activity-date">Date: {itin.date}</p>
        <p className="activity-price">Price: {itin.price}$</p>
        <p className="activity-language">Language: {itin.language}</p>
        <p className="activity-timeline">Timeline: {itin.timeline}</p>
        <p className="activity-pickup">Pickup Location: {itin.pickupLocation}</p>
        <p className="activity-dropoff">Dropoff Location: {itin.dropoffLocation}</p>

        <div className="share-buttons">
          <button onClick={() => shareLink(itin)}>Share Link</button>
          <button onClick={() => shareEmail(itin)}>Share via Email</button>
          {bookedTickets.includes(itin._id) ? (
            <button disabled>Ticket Already Booked</button>
          ) : (
            <button onClick={() => handleBookTicket(itin)}>Book Ticket</button>
          )}
            </div>
          {bookedTickets.includes(itin._id) && (
            <button onClick={() => handleCancelBooking(itin)}>Cancel Booking</button>
          )}
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
