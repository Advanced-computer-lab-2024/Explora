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
  const [userId, setUserId] = useState(null); // Add state for storing user ID

  // Fetch the user ID based on the username
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const username = localStorage.getItem("username"); // Assume the username is stored in localStorage
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
  }, []); // Empty dependency array to run once on component mount

  // Fetch upcoming activities
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

  // Helper function to get the badge level based on points
  const getBadgeLevel = (points) => {
    if (points > 500000) return 'Level 3 Badge';
    else if (points > 100000) return 'Level 2 Badge';
    else if (points > 0) return 'Level 1 Badge';
    return '';
  };

  // Share activity link
  const shareLink = (place) => {
    const link = `http://localhost:3000/activities/${place._id}`;
    navigator.clipboard.writeText(link)
      .then(() => setMessage('Link copied to clipboard!'))
      .catch(() => setMessage('Failed to copy link.'));
  };

  // Share activity via email
  const shareEmail = (place) => {
    const subject = `Check out this activity: ${place.name}`;
    const body = `I thought you might be interested in this activity:\n\n${place.name}\nDate: ${place.date}\nPrice: ${place.price}$\nRating: ${place.rating}/10\n\nYou can check it out here: http://localhost:3000/activities/${place._id}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Book ticket and add loyalty points using Axios
  const handleBookTicket = async (place) => {
    try {
      // Check if userId is available
      if (!userId) {
        alert('You must be logged in to book a ticket.');
        return;
      }
  
      // Optimistically update booked tickets
      setBookedTickets((prev) => [...prev, place._id]);
  
      // Determine points and level
      let pointsToAdd = 0;
      let level = "";
  
      if (place.price <= 100000) {
        pointsToAdd = place.price * 0.5;
        level = "Level 1";
      } else if (place.price <= 500000) {
        pointsToAdd = place.price * 1;
        level = "Level 2";
      } else {
        pointsToAdd = place.price * 1.5;
        level = "Level 3";
      }
  
      // Backend call to add loyalty points using Axios
      const response = await axios.post("http://localhost:4000/api/tourists/addLoyaltyPoints", {
        touristId: userId, // Use the dynamically fetched tourist ID
        amountPaid: place.price,
        level: level,
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        // Update loyalty points and badge level
        setLoyaltyPoints((prevPoints) => {
          const newPoints = prevPoints + data.pointsEarned;
          setBadgeLevel(getBadgeLevel(newPoints));
          return newPoints;
        });
  
        alert(`You booked "${place.name}" and earned ${data.pointsEarned} points!`);
      } else {
        console.error("Error adding loyalty points:", data.message);
        alert(`Failed to add loyalty points: ${data.message}`);
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("An error occurred while booking the ticket.");
    }
  };

  // Cancel booking if within the allowed timeframe
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

  // Redeem loyalty points for cash balance
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
