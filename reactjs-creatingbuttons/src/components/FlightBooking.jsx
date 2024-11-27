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
  const [touristId] = useState("67322cdfa472e2e7d22de84a"); // Hardcoded for now
  const [searchId, setSearchId] = useState(null); // Assume this gets set after the search
  const [flightId, setFlightId] = useState(null); // Set after selecting the flight
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Added this state
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
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      // Log the response to verify the structure
      console.log(response.data);
      setSearchId(response.data.searchId);
      // Map over the results if response.data.flights is an array
      const flightData = response.data.flights?.map((flight) => ({
        id: flight.id, // Add the flight id to make the key unique
        origin: flight.origin,
        destination: flight.destination,
        lastTicketingDate: flight.lastTicketingDate,
        duration: flight.itineraries[0]?.duration,
        price: flight.price?.total,
      }));

      setSearchResults(flightData || []); // Use an empty array if flightData is undefined
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setSearchResults([]); // Clear results on error
    }
  };

  // Select a flight
  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setFlightId(flight.id);
    setIsPaymentModalOpen(true); // Open the payment modal
  };

  // Confirm booking for the selected flight
  const handleConfirmBooking = async () => {
    if (!cardNumber || !cardExpiryDate || !cvv) {
      setErrorMessage('Please fill in all payment details');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/flights/book', {
        touristId,
        searchId,
        flightId,
        cardNumber,
        cardExpiryDate,
        cvv
      });

      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error booking flight');
      setSuccessMessage('');
    }
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

  // Handle Wallet Payment
  const handleWalletPayment = () => {
    alert(`Payment via Wallet for ${selectedItem.name} successful!`);
    setIsPaymentModalOpen(false);
    setSelectedItem(null);
  };

  // Handle credit card payment
  const handleCreditCardPayment = async () => {
    try {
      // Create a Stripe Checkout session
      const response = await axios.post("http://localhost:4000/stripe/create-checkout-session", {
        itemName: selectedItem.name,
        itemPrice: selectedItem.price,
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
        <div>
          <h4>Search Results:</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {searchResults.map((flight) => (
              <li key={flight.id} style={listItemStyle}>
                <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
                <p>Duration: {flight.duration}</p>
                <p>Price: {flight.price} EUR</p>
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
        <div style={modalStyle}>
           <h4>Selected Flight:</h4>
          <p>Last Ticketing Date: {selectedFlight.lastTicketingDate}</p>
          <p>Duration: {selectedFlight.duration}</p>
          <p>Price: {selectedFlight.price} EUR</p>

          <h4>Payment Options</h4>
          <p>Amount to pay: {selectedFlight.price} EUR</p>
          <button onClick={handleWalletPayment} style={buttonStyle}>
            Pay with Wallet
          </button>
          <button onClick={handleCreditCardPayment} style={buttonStyle}>
            Pay with Credit Card
          </button>
          <button onClick={handleCloseModal} style={closeButtonStyle}>
            Close
          </button>
        </div>
      )}

      {/* Booked Flights List */}
      {bookedFlights.map((flight) => (
        <li key={flight.id} style={listItemStyle}>
          <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
          <p>Duration: {flight.duration}</p>
          <p>Price: {flight.price} EUR - Booked</p>
          <button onClick={() => handleCancelBooking(flight.id)} style={buttonStyle}>
            Cancel Booking
          </button>
        </li>
      ))}
    </div>
  );
};

// Styles
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
