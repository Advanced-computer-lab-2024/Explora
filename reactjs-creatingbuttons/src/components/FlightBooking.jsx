import React, { useState } from 'react';
import axios from 'axios';

const FlightBooking = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookedFlights, setBookedFlights] = useState([]);
  const [touristId] = useState("672e97f48a225c52217e99ac"); // Hardcoded for now
  const [searchId, setSearchId] = useState(null); // Assume this gets set after the search
  const [flightId, setFlightId] = useState(null); // Set after selecting the flight
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

      {/* Selected Flight Details */}
      {selectedFlight && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected Flight:</h4>
          <p>Last Ticketing Date: {selectedFlight.lastTicketingDate}</p>
          <p>Duration: {selectedFlight.duration}</p>
          <p>Price: {selectedFlight.price} EUR</p>

          {/* Payment Details Form */}
          <div style={{ marginTop: '20px' }}>
            <label>
              Card Number:
              <input
                type="text"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={inputStyle}
              />
            </label>
            <label>
              Expiry Date:
              <input
                type="text"
                placeholder="MM/YY"
                value={cardExpiryDate}
                onChange={(e) => setCardExpiryDate(e.target.value)}
                style={inputStyle}
              />
            </label>
            <label>
              CVV:
              <input
                type="text"
                placeholder="Enter CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                style={inputStyle}
              />
            </label>
            <button onClick={handleConfirmBooking} style={buttonStyle}>
              Confirm Booking
            </button>
          </div>
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

// Styles for buttons, inputs, and list items
const buttonStyle = {
  margin: '10px',
  padding: '5px 10px',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
};

const inputStyle = {
  display: 'block',
  marginBottom: '10px',
  padding: '5px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const listItemStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
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