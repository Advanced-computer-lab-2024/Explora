import React, { useState, useEffect } from 'react';
import './NoUsed.css';  // Import the CSS file for styling

const UpcomingItineraries = () => {
  const [itins, setItins] = useState([]);
  const [message, setMessage] = useState('');
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [cashBalance, setCashBalance] = useState(0);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Retrieve the role from localStorage

  useEffect(() => {
    fetch('http://localhost:4000/api/tour_guide_itinerary/upcoming')
      .then(response => response.json())
      .then(data => {
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

  // Fetch initial loyalty points and badge level
  useEffect(() => {
    // Fetch initial loyalty points (assumed to be available in user profile)
    fetch(`http://localhost:4000/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.loyaltyPoints) {
        setLoyaltyPoints(data.loyaltyPoints);
        setBadgeLevel(getBadgeLevel(data.loyaltyPoints));
      }
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [userId, token]);

  const getBadgeLevel = (points) => {
    if (points > 500000) return 'Level 3 Badge';
    else if (points > 100000) return 'Level 2 Badge';
    else if (points > 0) return 'Level 1 Badge';
    return '';
  };

  const handleBookTicket = (itin) => {
    const numberOfTickets = 1; // Assume 1 ticket for simplicity
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
        if (data.message === 'Booking successful') {
          setBookedTickets((prev) => [...prev, itin._id]);
          let pointsToAdd = 0;

          if (itin.price <= 100000) pointsToAdd = itin.price * 0.5;
          else if (itin.price <= 500000) pointsToAdd = itin.price * 1;
          else pointsToAdd = itin.price * 1.5;

          setLoyaltyPoints((prevPoints) => {
            const newPoints = prevPoints + pointsToAdd;
            setBadgeLevel(getBadgeLevel(newPoints));  // Update badge level based on new points
            return newPoints;
          });
          alert(`Your ticket has been booked!`);
        } else {
          alert(`Booking failed: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error booking ticket:', error);
        alert('An error occurred while booking the ticket.');
      });
  };

  const handleCancelBooking = (itin) => {
    const bookingId = itin._id; // Assuming each itinerary has a unique _id for booking
    fetch(`http://localhost:4000/ticket/cancel/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Booking successfully canceled') {
          setBookedTickets((prev) => prev.filter((ticketId) => ticketId !== itin._id));
          alert('Your booking has been canceled.');
        } else {
          alert(`Cancellation failed: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error canceling booking:', error);
        alert('An error occurred while canceling the booking.');
      });
  };

  const redeemPoints = () => {
    const pointsRequired = 10000;
    if (loyaltyPoints >= pointsRequired) {
      const cashToAdd = (pointsRequired / 10000) * 100;
      // Use the functional form of the setter to ensure the latest state
      setCashBalance((prevBalance) => {
        const newBalance = prevBalance + cashToAdd;
        return newBalance;
      });
      setLoyaltyPoints((prevPoints) => {
        const newPoints = prevPoints - pointsRequired;
        setBadgeLevel(getBadgeLevel(newPoints));  // Update badge level based on new points
        return newPoints;
      });
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
