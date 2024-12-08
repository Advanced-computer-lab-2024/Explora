import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cropped_image.png';

const FlightBooking = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookedFlights, setBookedFlights] = useState([]);
 // const [touristId] = useState("674b64cbd03522fb24ac9d06"); // Hardcoded for now
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage
  const [searchId, setSearchId] = useState(null); // Assume this gets set after the search
  const [flightId, setFlightId] = useState(null); // Set after selecting the flight
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Added this state
  const [enteredPromocode, setEnteredPromocode] = useState('');
  const [enteredPromocodeCredit, setEnteredPromocodeCredit] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () =>
    setTimeout(() => setIsHistoryOptionsVisible(false), 900);
  const handleClosePromoModal = () => setShowPromoModal(false);

   // Handle search submission
   const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:4000/flights/flight-search', {
        params: {
          originCode: origin,
          destinationCode: destination,
          dateOfDeparture: date,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      setSearchId(response.data.searchId);
      const flightData = response.data.flights?.map((flight) => ({
        id: flight.id,
        origin: flight.origin,
        destination: flight.destination,
        lastTicketingDate: flight.lastTicketingDate,
        duration: flight.itineraries[0]?.duration,
        price: flight.price?.total,
      }));

      setSearchResults(flightData || []);
    } catch (error) {
      setSearchResults([]);
    }
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setFlightId(flight.id);
    console.log(flight.id);
    setIsPaymentModalOpen(true); // Open the payment modal
  };
   // Cancel booking
   const handleCancelBooking = (flightId) => {
    const updatedBookings = bookedFlights.filter(flight => flight.id !== flightId);
    setBookedFlights(updatedBookings);
  };

  // Close the payment modal
  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedFlight(null);
  };


  const handleWalletPayment = async () => {
    const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
    if (!touristId) {
      setErrorMessage('User not logged in. Please log in first.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/flights/bookWallet', {
        touristId,
        searchId,
        flightId,
        promoCode: enteredPromocode,  // Send the entered promo code

      });
      setSuccessMessage(response.data.message); // Show success message
      setErrorMessage(''); // Clear any previous errors
      setBookedFlights([...bookedFlights, selectedFlight]); // Add the booked flight to the list
      setIsPaymentModalOpen(false); // Close the payment modal
      setSelectedFlight(null); // Clear the selected flight
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error booking flight'); // Show error message
      setSuccessMessage(''); // Clear any previous success messages
    }
  };


  // Handle credit card payment
  const handleCreditCardPayment = async () => {
    try {
      const frontendUrl = window.location.origin;
      console.log("Frontend URL:", frontendUrl); // Log it for debugging
      // Send request to the backend to create a Stripe Checkout session
      const response = await axios.post("http://localhost:4000/flights/bookStripe", {
        touristId,
        searchId,
        flightId,
        frontendUrl // Pass the URL to the backend
      });
  
      const sessionUrl = response.data.url; // URL to redirect to Stripe Checkout
      window.location.href = sessionUrl; // Redirect the user to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to redirect to Stripe. Please try again.");
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
      <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
        <svg
          onClick={toggleDropdown}
          xmlns="http://www.w3.org/2000/svg"
          width="54"
          height="54"
          viewBox="0 0 24 24"
          style={{ cursor: 'pointer', color: 'white' }}
        >
          <path
            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"
            fill="white"
          />
        </svg>
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
            <button onClick={() => navigate('/cart')} style={buttonStyle}>
              Cart
            </button>
            <button onClick={() => navigate('/')} style={buttonStyle}>
              Log Out
            </button>
            <button onClick={() => navigate('/file-complaint')} style={buttonStyle}>
              File Complaint
            </button>
            <button onClick={() => navigate('/change-password')} style={buttonStyle}>
              Change Password
            </button>
            <button onClick={() => navigate('/Bookmarks')} style={buttonStyle}>
              Bookmarks
            </button>
            <button onClick={() => navigate('/my-promo-codes')} style={buttonStyle}>
              My Promo Codes
            </button>
            <button onClick={() => navigate('/my-promo-codes')} style={buttonStyle}>
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
                <button onClick={() => navigate('/past-orders')} style={buttonStyle}>
                  Past Orders
                </button>
                <button
                  onClick={() => navigate('/view-booked-transportations')}
                  style={buttonStyle}
                >
                  Booked Transportations
                </button>
                <button onClick={() => navigate('/PastBookedEvents')} style={buttonStyle}>
                  Booked Events
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
    <div style={{ padding: '20px', marginTop: '100px' }}> {/* Added marginTop */}
      <h3>Flight Booking</h3>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <label>
          Origin:
          <input
            type="text"
            placeholder="Enter city code (e.g., CAI)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            placeholder="Enter city code (e.g., RUH)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>Search</button>
      </form>

       {/* Display Error or Success Message */}
       {errorMessage && (
       <div style={errorMessageStyle}>{errorMessage}</div>
       )}
       {successMessage && (
       <div style={successMessageStyle}>{successMessage}</div>
       )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div style={{ marginTop: '30px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <h4>Available Flights</h4>
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            {searchResults.map((flight) => (
              <li key={flight.id} style={listItemStyle}>
                <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
                <p>Duration: {flight.duration}</p>
                <p>Price: {flight.price} USD</p>
                <button onClick={() => handleFlightSelect(flight)} style={buttonStyle}>
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedFlight && (
        <div style={modal}>
           <h4>Selected Flight:</h4>
          <p>Last Ticketing Date: {selectedFlight.lastTicketingDate}</p>
          <p>Duration: {selectedFlight.duration}</p>
          <p>Price: {selectedFlight.price} USD</p>

          <h4>Choose Payment Method:</h4>
    <div style={modalButtonContainer}>
    <div style={styles.paymentOption}>
        <button onClick={handleCreditCardPayment} style={creditCardButton}>
          Pay with Credit Card
        </button>
        <input
          type="text"
          placeholder="Enter Promocode"
          value={enteredPromocodeCredit}
          onChange={(e) => setEnteredPromocodeCredit(e.target.value)}
          style={promocodeInput}
        />
     
      </div>
      <div style={styles.paymentOption}>
        <button onClick={handleWalletPayment} style={bookButton}>
          Pay with Wallet
        </button>
        <input
          type="text"
          placeholder="Enter Promocode"
          value={enteredPromocode}
          onChange={(e) => setEnteredPromocode(e.target.value)}
          style={promocodeInput}
        />
      </div>
      <button
        onClick={() => setIsPaymentModalOpen(false)}
        style={cancelButton}
      >
        Cancel
      </button>
    </div>
  </div>
)}

      {/* Booked Flights List */}
      {bookedFlights.map((flight) => (
        <li key={flight.id} style={listItemStyle}>
          <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
          <p>Duration: {flight.duration}</p>
          <p>Price: {flight.price} USD - Booked</p>
          <button onClick={() => handleCancelBooking(flight.id)} style={buttonStyle}>
            Cancel Booking
          </button>
        </li>
      ))}
    </div>
    </div>
  );
};

// Styles
const styles = {

};
const modalButtonContainer= {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  marginTop: '100px',
};
const promocodeInput= {
  marginTop: '10px',
  width: '90%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '14px',
  textAlign: 'center',
};
const cancelButton= {
  padding: '10px 15px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px',
};
const creditCardButton= {
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px',
};
const modal= {
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
};
const bookButton= {
  padding: '10px 15px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px',
};
const buttonStyle = {
  padding: '12px 20px',
  fontSize: '16px',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#008080',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  width: '100%',
};


const closeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#f44336', // Red for close button
};

const inputStyle = {
  display: 'block',
  marginBottom: '10px',
  padding: '5px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
};

const listItemStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const modalStyle = {
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
};

const errorMessageStyle = {
  color: 'white',
  backgroundColor: '#f44336', // Red background for error
  padding: '15px',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
  borderRadius: '5px',
};

const successMessageStyle = {
  color: 'white',
  backgroundColor: '#4CAF50', // Green background for success
  padding: '15px',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
  borderRadius: '5px',
};

export default FlightBooking;
