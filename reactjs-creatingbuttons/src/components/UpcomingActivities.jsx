import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpcomingActivities = () => {
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState('');
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [cashBalance, setCashBalance] = useState(0);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch upcoming activities
    fetch('http://localhost:4000/api/activity/upcoming')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((activity) => ({
          ...activity,
          date: new Date(activity.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        setActivities(formattedData);
      })
      .catch(error => console.error('Error fetching activities:', error));

    // Fetch user loyalty points
    fetch(`http://localhost:4000/users/loyalty-points/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setLoyaltyPoints(data.loyaltyPoints || 0);
        setBadgeLevel(getBadgeLevel(data.loyaltyPoints || 0));
      })
      .catch(error => console.error('Error fetching loyalty points:', error));
  }, [userId, token]);

  const handleBookTicket = (activity) => {
    const numberOfTickets = 1;

    fetch('http://localhost:4000/ticketact/bookact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        activityId: activity._id,
        numberOfTickets,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.booking && data.sale) {
          alert('Your ticket has been booked!');
          setBookedTickets(prev => [...prev, activity._id]);

          const pointsToAdd = data.loyaltyPoints || 0;
          if (pointsToAdd > 0) {
            setLoyaltyPoints(prev => {
              const updatedPoints = prev + pointsToAdd;
              setBadgeLevel(getBadgeLevel(updatedPoints));
              return updatedPoints;
            });
          }
        }
      })
      .catch(error => {
        console.error('Error booking ticket:', error);
        alert('An error occurred while booking the ticket.');
      });
  };

  const handleCancelBooking = (activity) => {
    const now = new Date();
    const eventDate = new Date(activity.date);
    const hoursDifference = (eventDate - now) / (1000 * 60 * 60);

    if (hoursDifference >= 48) {
      setBookedTickets(prev => prev.filter(ticketId => ticketId !== activity._id));
      alert(`Your booking for "${activity.name}" has been canceled.`);
    } else {
      alert('You cannot cancel your booking less than 48 hours before the event starts.');
    }
  };

  const getBadgeLevel = (points) => {
    if (points > 500000) return 'Level 3 Badge';
    if (points > 100000) return 'Level 2 Badge';
    if (points > 0) return 'Level 1 Badge';
    return '';
  };

  const shareLink = (activity) => {
    const link = `http://localhost:5173/activities/${activity._id}`;
    navigator.clipboard.writeText(link)
      .then(() => setMessage('Link copied to clipboard!'))
      .catch(() => setMessage('Failed to copy link.'));
  };

  const shareEmail = (activity) => {
    const subject = `Check out this activity: ${activity.name}`;
    const body = `I thought you might be interested in this activity:\n\n${activity.name}\nDate: ${activity.date}\nPrice: ${activity.price}$\nRating: ${activity.rating}/10\n\nYou can check it out here: http://localhost:5173/activities/${activity._id}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const redeemPoints = () => {
    const pointsRequired = 10000;
    if (loyaltyPoints >= pointsRequired) {
      const cashToAdd = (pointsRequired / 10000) * 100;
      setCashBalance(prev => prev + cashToAdd);
      setLoyaltyPoints(prev => {
        const updatedPoints = prev - pointsRequired;
        setBadgeLevel(getBadgeLevel(updatedPoints));
        return updatedPoints;
      });
      alert(`You have successfully redeemed ${pointsRequired} points for ${cashToAdd} EGP!`);
    } else {
      alert('You do not have enough loyalty points to redeem for cash.');
    }
  };

  return (
    <div className="UpcomingActivities">
      <h1 className="header">Upcoming Activities</h1>
      <div className="activities-list">
        {activities.map(activity => (
          <div key={activity._id} className="activity-card">
            <h2 className="activity-name">{activity.name}</h2>
            <p className="activity-date">Date: {activity.date}</p>
            <p className="activity-price">Price: {activity.price}$</p>
            <p className="activity-rating">Rating: {activity.rating}/10</p>

            <div className="share-buttons">
              <button onClick={() => shareLink(activity)}>Share Link</button>
              <button onClick={() => shareEmail(activity)}>Share via Email</button>
              {bookedTickets.includes(activity._id) ? (
                <button disabled>Ticket Already Booked</button>
              ) : (
                <button onClick={() => handleBookTicket(activity)}>Book Ticket</button>
              )}
            </div>
            {bookedTickets.includes(activity._id) && (
              <button onClick={() => handleCancelBooking(activity)}>Cancel Booking</button>
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
