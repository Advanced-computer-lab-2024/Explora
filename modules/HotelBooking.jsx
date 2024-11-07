import React, { useState } from 'react';

const HotelBooking = () => {
  const [city, setCity] = useState('');
  const [hotel, setHotel] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookedHotels, setBookedHotels] = useState([]);

  // Sample hotel data for demonstration (replace this with API data in the future)
  const hotels = [
    { id: 1, city: 'New York', name: 'Hotel Empire', date: '2024-12-10' },
    { id: 2, city: 'Los Angeles', name: 'Sunset Inn', date: '2024-12-15' },
    { id: 3, city: 'Chicago', name: 'Windy City Hotel', date: '2024-12-20' },
  ];

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Filter hotels based on city, hotel name, and date
    const results = hotels.filter(
      (hotelData) =>
        hotelData.city.toLowerCase().includes(city.toLowerCase()) &&
        hotelData.name.toLowerCase().includes(hotel.toLowerCase()) &&
        (!date || hotelData.date === date) // Check if date matches or is empty
    );
    setSearchResults(results);
  };

  // Select a hotel
  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  // Confirm booking for the selected hotel
  const handleConfirmBooking = () => {
    if (selectedHotel) {
      setBookedHotels([...bookedHotels, selectedHotel]);
      setSelectedHotel(null); // Clear the selection after booking
      setSearchResults([]); // Clear search results
      setCity(''); // Reset search fields
      setHotel('');
      setDate('');
    }
  };

  // Cancel booking
  const handleCancelBooking = (hotelId) => {
    const updatedBookings = bookedHotels.filter(hotel => hotel.id !== hotelId);
    setBookedHotels(updatedBookings);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Hotel Booking</h3>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <label>
          City:
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Hotel:
          <input
            type="text"
            placeholder="Enter hotel name"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
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
            {searchResults.map((hotelData) => (
              <li key={hotelData.id} style={listItemStyle}>
                {hotelData.city} - {hotelData.name} on {hotelData.date}
                <button onClick={() => handleHotelSelect(hotelData)} style={buttonStyle}>
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected Hotel Details */}
      {selectedHotel && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected Hotel:</h4>
          <p>
            {selectedHotel.city} - {selectedHotel.name} on {selectedHotel.date}
          </p>
          <button onClick={handleConfirmBooking} style={buttonStyle}>Confirm Booking</button>
        </div>
      )}

      {/* Booked Hotels List */}
      {bookedHotels.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Booked Hotels:</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {bookedHotels.map((hotelData) => (
              <li key={hotelData.id} style={listItemStyle}>
                {hotelData.city} - {hotelData.name} on {hotelData.date} - Booked
                <button onClick={() => handleCancelBooking(hotelData.id)} style={buttonStyle}>
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

export default HotelBooking;
