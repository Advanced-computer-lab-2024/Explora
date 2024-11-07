
import React, { useState } from 'react';

const FlightBooking = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookedFlights, setBookedFlights] = useState([]);

  // Sample flight data for demonstration (replace this with API data in the future)
  const flights = [
    { id: 1, origin: 'New York', destination: 'London', date: '2024-12-10', flightNumber: 'NYL123' },
    { id: 2, origin: 'Los Angeles', destination: 'Tokyo', date: '2024-12-15', flightNumber: 'LAT456' },
    { id: 3, origin: 'Chicago', destination: 'Paris', date: '2024-12-20', flightNumber: 'CP789' },
  ];

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Filter flights based on origin, destination, and date
    const results = flights.filter(
      (flight) =>
        flight.origin.toLowerCase().includes(origin.toLowerCase()) &&
        flight.destination.toLowerCase().includes(destination.toLowerCase()) &&
        (!date || flight.date === date) // Check if date matches or is empty
    );
    setSearchResults(results);
  };

  // Select a flight
  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
  };

  // Confirm booking for the selected flight
  const handleConfirmBooking = () => {
    if (selectedFlight) {
      setBookedFlights([...bookedFlights, selectedFlight]);
      setSelectedFlight(null); // Clear the selection after booking
      setSearchResults([]); // Clear search results
      setOrigin(''); // Reset search fields
      setDestination('');
      setDate('');
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
            placeholder="Enter city name"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            placeholder="Enter city name"
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

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h4>Search Results:</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {searchResults.map((flight) => (
              <li key={flight.id} style={listItemStyle}>
                {flight.origin} to {flight.destination} on {flight.date} (Flight #{flight.flightNumber})
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
          <p>
            {selectedFlight.origin} to {selectedFlight.destination} on {selectedFlight.date} (Flight #{selectedFlight.flightNumber})
          </p>
          <button onClick={handleConfirmBooking} style={buttonStyle}>Confirm Booking</button>
        </div>
      )}

      {/* Booked Flights List */}
      {bookedFlights.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Booked Flights:</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {bookedFlights.map((flight) => (
              <li key={flight.id} style={listItemStyle}>
                {flight.origin} to {flight.destination} on {flight.date} (Flight #{flight.flightNumber}) - Booked
                <button onClick={() => handleCancelBooking(flight.id)} style={buttonStyle}>
                  Cancel Booking
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
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

export default FlightBooking;
