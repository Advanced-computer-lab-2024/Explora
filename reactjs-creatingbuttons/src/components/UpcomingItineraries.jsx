import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  // const [touristId] = useState('674b64cbd03522fb24ac9d06'); // Hardcoded for now
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage
  const [itineraryId, setItineraryId] = useState(null); // Set after selecting the activity
  const [enteredPromocode, setEnteredPromocode] = useState('');
  const [enteredPromocodeCredit, setEnteredPromocodeCredit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


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
    fetch(`http://localhost:4000/users/loyalty-points/${touristId}`, {
      headers: {
        // Authorization:` Bearer ${token}`, // Include the token for authentication
      },
    })
      .then(response => response.json())
      .then(data => {
        setLoyaltyPoints(data.loyaltyPoints || 0); // Set loyalty points or default to 0
        setBadgeLevel(getBadgeLevel(data.loyaltyPoints || 0)); // Set badge level
      })
      .catch(error => console.error('Error fetching loyalty points:', error));
  }, []);

  const getBadgeLevel = (points) => {
    if (points > 500000) return 'Level 3 Badge';
    if (points > 100000) return 'Level 2 Badge';
    if (points > 0) return 'Level 1 Badge';
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

  const handleItinerarySelect = (itinerary) => {
    setSelectedItinerary(itinerary);
    setItineraryId(itinerary._id);
    setIsPaymentModalOpen(true);
  };

  const handleWalletPayment = async () => {
    const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
    if (!touristId) {
      setErrorMessage('User not logged in. Please log in first.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/tour_guide_itinerary/bookWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          touristId,
          itineraryId,
          promoCode: enteredPromocode,  // Send the entered promo code
        }),
      });
  
      // Parse the response body as JSON
      const data = await response.json();
  
      if (response.ok) {
        alert('Payment via Wallet for itinerary is successful!');
        
        if (data.savedBooking && data.sale) {
          setBookedTickets((prev) => [...prev, itineraryId]); // Add the current itinerary to booked tickets
  
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
      } else {
        alert('You have already booked this itinerary.');
      }
    } catch (error) {
      console.error('Error during wallet payment:', error);
      alert('An error occurred. Please try again.');
    }
  
    setIsPaymentModalOpen(false);
    setSelectedItinerary(null);
  };
  
  const handleCreditCardPayment = async () => {
    try {
      const frontendUrl = window.location.origin;
      console.log("Frontend URL:", frontendUrl); // Log it for debugging

      // Log the data being sent in the request
      const requestData = {
        touristId,
        itineraryId,
        frontendUrl,
        promoCode: enteredPromocodeCredit,
      };
      console.log("Request Data:", requestData);

      // Send request to the backend to create a Stripe Checkout session
      const response = await axios.post("http://localhost:4000/api/tour_guide_itinerary/bookStripe", requestData);
  
      const sessionUrl = response.data.url; // URL to redirect to Stripe Checkout
      window.location.href = sessionUrl; // Redirect the user to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to redirect to Stripe. Please try again.");
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

  const handleBookmarkClick = async (itinerary) => {
    const touristId = localStorage.getItem('userId');  
    if (!touristId) {
      setErrorMessage('User not logged in. Please log in first.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/tour_guide_itinerary/bookmark/${touristId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: itinerary._id }), // Directly use itinerary._id
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Success
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to bookmark the itinerary.");
      }
    } catch (error) {
      console.error("Error bookmarking the itinerary:", error);
      alert("An error occurred while bookmarking. Please try again.");
    }
  };
  
  
  return (
    <div className="UpcomingItineraries">
            {/* Back Button */}
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>

      <h1 className="header">Upcoming Itineraries</h1>
      <div className="activities-list">
        
      {itins.map((itin) => (
  <div key={itin._id} className="activity-card">
    <h2 className="activity-name">{itin.locations}</h2>
    <p className="activity-rating">TourGuide: {itin.tourGuideName}</p>
    <p className="activity-date">Date: {itin.availableDates.join(', ')}</p> 
    <p className="activity-price">Price: {itin.price}$</p>
    <p className="activity-rating">Language: {itin.language}</p>

    <div className="share-buttons">
      <button onClick={() => shareLink(itin)}>Share Link</button>
      <button onClick={() => shareEmail(itin)}>Share via Email</button>
      <button onClick={() => handleBookmarkClick(itin)}>Bookmark</button>
      {bookedTickets.includes(itin._id) ? (
        <button disabled>Ticket Already Booked</button>
      ) : (
        <button onClick={() => handleItinerarySelect(itin)}>Book Ticket</button>
      )}
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
      <div style={styles.paymentOption}>
        <button onClick={handleCreditCardPayment} style={styles.creditCardButton}>
          Pay with Credit Card
        </button>
        <input
          type="text"
          placeholder="Enter Promocode"
          value={enteredPromocodeCredit}
          onChange={(e) => setEnteredPromocodeCredit(e.target.value)}
          style={styles.promocodeInput}
        />
      </div>
      <div style={styles.paymentOption}>
        <button onClick={handleWalletPayment} style={styles.bookButton}>
          Pay with Wallet
        </button>
        <input
          type="text"
          placeholder="Enter Promocode"
          value={enteredPromocode}
          onChange={(e) => setEnteredPromocode(e.target.value)}
          style={styles.promocodeInput}
        />
      </div>
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
      margin: '10px',
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
      width: '750px',
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
      margin: '10px',
    },
    promocodeInput: {
      marginTop: '10px',
      width: '90%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '14px',
      textAlign: 'center',
    },
  };

export default UpcomingItineraries;