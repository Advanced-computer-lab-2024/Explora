import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const UpcomingActivities = () => {
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState('');
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [cashBalance, setCashBalance] = useState(0);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [itins, setItins] = useState([]);


  const userId = "67322cdfa472e2e7d22de84a";

  useEffect(() => {
    const savedPoints = localStorage.getItem('loyaltyPoints');
    if (savedPoints) {
      setLoyaltyPoints(Number(savedPoints));
      setBadgeLevel(getBadgeLevel(Number(savedPoints)));
    }
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await axios.get(`http://localhost:4000/api/users/${username}`);
        
        if (response.status === 200) {
          setUserId(response.data._id); // Set user ID in the state
          console.log("User ID fetched:", response.data._id);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUpcomingActivities = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/activity/upcoming');
        const data = await response.json();

        if (response.ok) {
          const formattedData = data.map((place) => ({
            ...place,
            date: place.date.split('T')[0],
            dateObject: new Date(place.date),
          }));
          setPlaces(formattedData);
        } else {
          console.error("Failed to fetch activities:", data.message);
        }
      } catch (error) {
        console.error("Error fetching upcoming activities:", error);
      }
    };

    fetchUpcomingActivities();
  }, []);

  const getBadgeLevel = (points) => {
    if (points > 500000) return 'Level 3 Badge';
    else if (points > 100000) return 'Level 2 Badge';
    else if (points > 0) return 'Level 1 Badge';
    return '';
  };

  const shareLink = (place) => {
    const link = `http://localhost:4000/api/activity/${place._id}`;
    navigator.clipboard.writeText(link)
      .then(() => setMessage('Link copied to clipboard!'))
      .catch(() => setMessage('Failed to copy link.'));
  };

  const shareEmail = (place) => {
    const subject = `Check out this activity: ${place.name}`;
    const body = `I thought you might be interested in this activity:\n\n${place.name}\nDate: ${place.date}\nPrice: ${place.price}$\nRating: ${place.rating}/10\n\nYou can check it out here: http://localhost:3000/activities/${place._id}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

  const handleBookTicket = async (place) => {
    try {
      if (!userId) {
        alert('You must be logged in to book a ticket.');
        return;
      }

      if (bookedTickets.includes(place._id)) {
        alert('Ticket Already Booked');
        return;
      }

      setBookedTickets((prev) => [...prev, place._id]);

      const level = place.price > 500000 ? 3 : place.price > 100000 ? 2 : 1;

      const response = await axios.post("http://localhost:4000/api/tourists/addLoyaltyPoints", {
        touristId: userId,
        amountPaid: place.price,
        level,
      });

      if (response.status === 200) {
        const data = response.data;
        const newPoints = loyaltyPoints + data.pointsEarned;

        setLoyaltyPoints(newPoints);
        localStorage.setItem('loyaltyPoints', newPoints);
        setBadgeLevel(getBadgeLevel(newPoints));

        alert(`You booked "${place.name}" and earned ${data.pointsEarned} points!`);
      }
    } catch (error) {
      alert("An error occurred while booking the ticket.");
    }
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

  const redeemPoints = async () => {
    try {
      if (loyaltyPoints < 10000) {
        alert('Insufficient loyalty points.');
        return;
      }

      const response = await axios.post("http://localhost:4000/api/tourists/redeemPoints", {
        touristId: userId,
        pointsToRedeem: 10000,
      });

      if (response.status === 200) {
        const data = response.data;
        const updatedPoints = data.remainingPoints;

        setCashBalance(data.walletBalance);
        setLoyaltyPoints(updatedPoints);
        localStorage.setItem('loyaltyPoints', updatedPoints);
        setBadgeLevel(getBadgeLevel(updatedPoints));

        alert(`Successfully redeemed 10,000 points for ${data.cashAdded} EGP.`);
      }
    } catch (error) {
      alert("Error during redemption.");
    }
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

            <div className="share-buttons">
              {bookedTickets.includes(place._id) ? (
                <button disabled>Ticket Already Booked</button>
              ) : (
                <button onClick={() => handleBookTicket(place)}>Book Ticket</button>
              )}
              <button onClick={() => shareLink(place)}>Share Link</button>
              <button onClick={() => shareEmail(place)}>Share via Email</button>
            </div>

            {bookedTickets.includes(place._id) && (
              <button onClick={() => handleCancelBooking(place)}>Cancel Booking</button>
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
      <button onClick={redeemPoints} disabled={loyaltyPoints < 10000}>
        Redeem 10,000 Points for 100 EGP
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UpcomingActivities;