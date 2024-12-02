import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpcomingItineraries = () => {
  const [itins, setItins] = useState([]);
  const [message, setMessage] = useState('');
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [cashBalance, setCashBalance] = useState(0);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [error, setError] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen]= useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const navigate = useNavigate();

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

  const handleItinerarySelect = (Itinerary) => {
    setSelectedItinerary(Itinerary);
    setIsPaymentModalOpen(true); // Open payment modal
  };
  
    
  //Handle Wallet Payment
  const handleWalletPayment = () => {
    alert(`Payment via Wallet for ${selectedItinerary.name} successful!`);
    setIsPaymentModalOpen(false);
    setSelectedItinerary(null);
  };
  
  
    // Handle credit card payment
  const handleCreditCardPayment = async () => {
    try {
      // Create a Stripe Checkout session
      const response = await axios.post("http://localhost:4000/stripe/create-checkout-session", {
        itemName: selectedItinerary.name,
        itemPrice: selectedItinerary.price,
      });
  
      const sessionUrl = response.data.url; // URL to redirect to Stripe Checkout
      window.location.href = sessionUrl; // Redirect the user to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to redirect to Stripe. Please try again.");
    }
  };

  /* const handleCancelBooking = (itin) => {
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
  }; */
  

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

  const handleBookmarkClick = () => {
    //function to handle bookmarking logic
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
              <button onClick={handleBookmarkClick}>Bookmark</button>
              {bookedTickets.includes(itin._id) ? (
                <button disabled>Ticket Already Booked</button>
              ) : (
                <button onClick={() => handleItinerarySelect(itin)}>Book Ticket</button>
                
              )}
              {/* {bookedTickets.includes(itin._id) && (
                <button onClick={() => handleCancelBooking(itin)}>Cancel Booking</button>
              )} */}
            </div>
          </div>
        ))}
        {/* Payment Modal */}
{isPaymentModalOpen && selectedItinerary && (
        <div style={styles.modal}>
          <h4>Selected Itinerary:</h4>
          <p>
            {selectedItinerary.name} on {selectedItinerary.date}
          </p>
          <p>
            <strong>Amount to Pay:</strong> {selectedItinerary.price}
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
      <button className="redeem-button" onClick={redeemPoints} disabled={loyaltyPoints < 10000}>
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

export default UpcomingItineraries;

