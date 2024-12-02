import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

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
  const [error, setError] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen]= useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [userId, setUserId] = useState("67322cdfa472e2e7d22de84a");
  const navigate = useNavigate();

 

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

  const [loading, setLoading] = useState(true);

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
        setError(data.message || "Failed to fetch activities");
      }
    } catch (err) {
      setError("Error fetching upcoming activities");
    } finally {
      setLoading(false);
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

const handleActivitySelect = (Activity) => {
  setSelectedActivity(Activity);
  setIsPaymentModalOpen(true); // Open payment modal
};

  
//Handle Wallet Payment
const handleWalletPayment = () => {
  alert(`Payment via Wallet for ${selectedActivity.name} successful!`);
  setIsPaymentModalOpen(false);
  setSelectedActivity(null);
};


  // Handle credit card payment
const handleCreditCardPayment = async () => {
  try {
    // Create a Stripe Checkout session
    const response = await axios.post("http://localhost:4000/stripe/create-checkout-session", {
      itemName: selectedActivity.name,
      itemPrice: selectedActivity.price,
    });

    const sessionUrl = response.data.url; // URL to redirect to Stripe Checkout
    window.location.href = sessionUrl; // Redirect the user to Stripe Checkout
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    alert("Failed to redirect to Stripe. Please try again.");
  }
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;


  /* const handleCancelBooking = (place) => {
    const now = new Date();
    const timeDifference = place.dateObject - now;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference >= 48) {
      setBookedTickets((prev) => prev.filter(ticketId => ticketId !== place._id));
      alert(`Your booking for "${place.name}" has been canceled.`);
    } else {
      alert('You can not cancel your booking 48 hours before the event starts.');
    }
  };
*/
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

  const handleBookmarkClick = () => {
    //function to handle bookmarking logic
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
                <button onClick={() => handleActivitySelect(place)}>Book Ticket</button>
              )}
              <button onClick={() => shareLink(place)}>Share Link</button>
              <button onClick={() => shareEmail(place)}>Share via Email</button>
              <button onClick={handleBookmarkClick}>Bookmark</button>
            </div>
            {/*
            {bookedTickets.includes(place._id) && (
              <button onClick={() => handleCancelBooking(place)}>Cancel Booking</button>
            )}
            */}
          </div>
          
        ))}
        {/* Payment Modal */}
{isPaymentModalOpen && selectedActivity && (
        <div style={styles.modal}>
          <h4>Selected Activity:</h4>
          <p>
            {selectedActivity.name} on {selectedActivity.date}
          </p>
          <p>
            <strong>Amount to Pay:</strong> {selectedActivity.price}
          </p>
          <h4>Choose Payment Method:</h4>
          <div style={styles.modalButtonContainer}>
          <button onClick={handleCreditCardPayment} style={styles.creditCardButton}>
            Pay with Credit Card
          </button>
          <button onClick={handleWalletPayment} style={styles.bookButton}>
            Pay with Wallet
          </button>
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          </div>
        </div>
      )}
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

const styles = {
  pageContainer: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f4f4f9',
      minHeight: '100vh',
  },
  error: {
      color: 'red',
      marginBottom: '15px',
      textAlign: 'center',
  },
  searchBarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
  },
  inputField: {
      padding: '10px',
      width: '48%',
      borderRadius: '5px',
      border: '1px solid #ccc',
  },
  selectContainer: {
      marginBottom: '20px',
  },
  reactSelect: {
      control: (styles) => ({
          ...styles,
          borderRadius: '5px',
          border: '1px solid #ccc',
      }),
  },
  filtersContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginBottom: '20px',
  },
  filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '150px',
  },
  selectInput: {
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
  },
  resultsContainer: {
      marginTop: '30px',
  },
  resultsList: {
      listStyleType: 'none',
      padding: '0',
  },
  resultItem: {
      padding: '10px',
      backgroundColor: '#fff',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
  },
  resultLink: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      textDecoration: 'none',
  },
  details: {
      fontSize: '14px',
      color: '#777',
      marginTop: '5px',
  },
  bookButton: {
      padding: '10px 15px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },   
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      textAlign: 'center',
    },
    modalButtonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
      marginTop: '20px',
    },
    modalButton: {
      flex: '1',
      padding: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      color: 'white',
      transition: 'background-color 0.3s',
    },
    creditCardButton: {
      padding: '10px 15px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px',
    },
    cancelButton: {
      padding: '10px 15px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

export default UpcomingActivities;
