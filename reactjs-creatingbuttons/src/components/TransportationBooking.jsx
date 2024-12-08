import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
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

export default function TransportationBooking() {
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // State to track the selected transportation option
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State to track modal visibility
  const [enteredPromocode, setEnteredPromocode] = useState('');
  const [enteredPromocodeCredit, setEnteredPromocodeCredit] = useState('');
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage
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
    const fetchTransportationOptions = async () => {
      try {
        const response = await fetch('http://localhost:4000/transportation/');
        const data = await response.json();

        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          setTransportationOptions(data);
        } else {
          console.error('Expected data to be an array, but got:', data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transportation options:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTransportationOptions();
  }, []);

  

  const handleWalletPayment = async () => {
    const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
    if (!touristId) {
      setErrorMessage('User not logged in. Please log in first.');
      return;
    }
    const bookingData = {
      touristId,
      transportationId: selectedOption._id, // Get the transportationId from the selected option
      seats: 1, // Number of seats (modify as needed)
      promoCode:enteredPromocode,
    };
  
    try {
      const response = await fetch('http://localhost:4000/transportationBook/bookWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(`Booking confirmed! Booking ID: ${data._id}`);
        setIsPaymentModalOpen(false); // Close the modal after successful booking
      } else {
        const errorText = await response.text(); // Read raw text in case JSON parsing fails
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText); // Try parsing as JSON
          errorMessage = errorData.message || 'An unknown error occurred';
        } catch {
          errorMessage = errorText || 'An unknown error occurred';
        }
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      alert(`Booking failed: ${error.message}`);
    }
  };
  

  const handleCreditCardPayment = async () => {
    try {
      const frontendUrl = window.location.origin;
      console.log("Frontend URL:", frontendUrl); // Log it for debugging

      // Log the data being sent in the request
      const requestData = {
        touristId,
        transportationId: selectedOption._id, // Get the transportationId from the selected option
        seats: 1, // Number of seats (modify as needed)
        frontendUrl,
        promoCode: enteredPromocodeCredit,
      };
      console.log("Request Data:", requestData);

      // Send request to the backend to create a Stripe Checkout session
      const response = await axios.post("http://localhost:4000/transportationBook/bookStripe", requestData);
  
      const sessionUrl = response.data.url; // URL to redirect to Stripe Checkout
      window.location.href = sessionUrl; // Redirect the user to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to redirect to Stripe. Please try again.");
    }
  };

  const handleOpenModal = (option) => {
    setSelectedOption(option); // Set the selected option
    setIsPaymentModalOpen(true); // Open the payment modal
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false); // Close the modal
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
      
    <div style={styles.container}>
      <h1 style={styles.header}>Book a Transportation</h1>
      <div style={styles.cardContainer}>
        {transportationOptions.map((option) => (
          <div key={option._id} style={styles.card}>
            <h2 style={styles.cardTitle}>{option.method}</h2>
            <p style={styles.cardDescription}>From: {option.origin} To: {option.destination}</p>
            <p style={styles.cardTime}>Date: {new Date(option.date).toLocaleDateString()}</p>
            <p style={styles.cardTime}>Time: {option.time}</p>
            <p style={styles.cardPrice}>Price: {option.currency} {option.price}</p>
            <button
              style={styles.bookButton}
              onClick={() => handleOpenModal(option)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
  
      {/* Payment Modal */}
      {isPaymentModalOpen && selectedOption && (
        <div style={styles.modal}>
          <h4>Selected Transportation</h4>
          <p>Transportation Method: {selectedOption.method}</p>
          <p>From: {selectedOption.origin}</p>
          <p>To: {selectedOption.destination}</p>
          <p>Amount to Pay: {selectedOption.currency} {selectedOption.price}</p>
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
    </div>
  );
  
}

const styles = {
 
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    marginTop: '100px'
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '20px',
    margin: '10px 0',
  },
  cardDescription: {
    color: '#555',
    fontSize: '14px',
  },
  cardTime: {
    color: '#777',
    fontSize: '13px',
  },
  cardPrice: {
    fontWeight: 'bold',
    margin: '10px 0',
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
  creditButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
  closeButton: {
    padding: '10px 15px',
    backgroundColor: '#dc3545',
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