import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cropped_image.png';

const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};

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
 const [guideRatings, setGuideRatings] = useState({});
 const [guideComments, setGuideComments] = useState({});
 const [isEditable, setIsEditable] = useState(false);
 const navigate = useNavigate();
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);
 const [showPromoModal, setShowPromoModal] = useState(false);

 const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
 const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
 const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);
 const handleClosePromoModal = () => setShowPromoModal(false);

 useEffect(() => {
     setShowPromoModal(true);
   }, []);



  useEffect(() => {
    // Fetch upcoming itineraries
    fetch('http://localhost:4000/api/tour_guide_itinerary/upcoming')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
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
      .catch((error) => setError('Error fetching data: ' + error.message));
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
    const link = `http://localhost:4000/api/tour_guide_itinerary/${itin._id}`;
    navigator.clipboard
      .writeText(link)
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

      if (response.ok) {
        alert('Payment via Wallet for itinerary is successful!');
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
      const response = await axios.post('http://localhost:4000/stripe/create-checkout-session', {
        itemName: selectedItinerary.name,
        itemPrice: selectedItinerary.price,
      });
      const sessionUrl = response.data.url;
      window.location.href = sessionUrl;
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      alert('Failed to redirect to Stripe. Please try again.');
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
    <div>
           <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1px 5px',
          backgroundColor: '#008080',
          color: 'white',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          justifyContent: 'space-between',
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/tourist-home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/UpcomingActivities" style={{ color: 'white', textDecoration: 'none' }}>Activities</a>
          <a href="/book-flight" style={{ color: 'white', textDecoration: 'none' }}>Flights</a>
          <a href="/book-hotel" style={{ color: 'white', textDecoration: 'none' }}>Hotels</a>
          <a href="/UpcomingItineraries" style={{ color: 'white', textDecoration: 'none' }}>Itineraries</a>
          <a href="/UpcomingBookedEvents" style={{ color: 'white', textDecoration: 'none' }}>Upcoming Events</a>

          <a href="/product-list-tourist" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
          <a href="/Notifications" style={{ color: 'white', textDecoration: 'none' }}>Notifications</a>


        </div>

        {/* SVG Icon */}
        <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <svg
            onClick={toggleDropdown}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" fill="white" />
          </svg>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '80px',
                right: '0',
                backgroundColor: '#008080',
                color: 'white',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                width: '200px',
                padding: '10px 0',
                zIndex: 1000,
              }}
              onMouseEnter={handleMouseEnterHistory}
              onMouseLeave={handleMouseLeaveHistory}
            >
              <button
                onClick={() => navigate('/ProfileDetailsPage')}
                style={buttonStyle}
              >
                Profile
              </button>
              <a
                href="/history"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                History
              </a>

              <button
                onClick={() => navigate('/cart')}
                style={buttonStyle}
              >
                Cart
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/file-complaint')}
                style={buttonStyle}
              >
                File Complaint
              </button>
              <button
                onClick={() => navigate('/change-password')}
                style={buttonStyle}
              >
                Change Password
              </button>
              <button
                onClick={() => navigate('/Bookmarks')}
                style={buttonStyle}
              >
                Bookmarks
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
                My Promo Codes
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
                Current Orders
              </button>

              {isHistoryOptionsVisible && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '220px',
                    backgroundColor: '#008080',
                    color: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '200px',
                    padding: '10px 0',
                    zIndex: 1000,
                  }}
                >
                  <button
                    onClick={() => navigate('/tourist-previous-activities')}
                    style={buttonStyle}
                  >
                    Past Activities
                  </button>
                  <button
                    onClick={() => navigate('/tourist-past-itineraries')}
                    style={buttonStyle}
                  >
                    Past Itineraries
                  </button>
                  <button
                    onClick={() => navigate('/past-orders')}
                    style={buttonStyle}
                  >
                    Past Orders
                  </button>
                  <button
                    onClick={() => navigate('/view-booked-transportations')}
                    style={buttonStyle}
                  >
                    Booked Transportations
                  </button>
                  <button
                    onClick={() => navigate('/PastBookedEvents')}
                    style={buttonStyle}
                  >
                    Booked Events
                  </button>

                  
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
<div className="UpcomingItineraries">
<div style={{ marginTop: '80px' }}>

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
    <div style={{ marginTop: '80px' }}>

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
</div>
</div>
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

