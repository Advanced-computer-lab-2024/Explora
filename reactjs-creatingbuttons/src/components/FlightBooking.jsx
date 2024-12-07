import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    <div style={{ padding: '20px' }}>
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
  );
};

// Styles
const styles = {

};
const modalButtonContainer= {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  marginTop: '20px',
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
  margin: '10px',
  padding: '5px 10px',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#4CAF50',
  color: '#fff',
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
