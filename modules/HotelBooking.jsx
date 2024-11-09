import React, { useState } from 'react';

const HotelBooking = () => {
  const [cityCode, setCityCode] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookedHotels, setBookedHotels] = useState([]);

  // Sample hotel data for demonstration (replace this with API data in the future)
  const hotels = [
    { id: 1, cityCode: 'NYC', name: 'Hotel Empire', checkInDate: '2024-12-10', checkOutDate: '2024-12-15' },
    { id: 2, cityCode: 'LAX', name: 'Sunset Inn', checkInDate: '2024-12-15', checkOutDate: '2024-12-20' },
    { id: 3, cityCode: 'CHI', name: 'Windy City Hotel', checkInDate: '2024-12-20', checkOutDate: '2024-12-25' },
  ];

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Filter hotels based on city code, check-in date, and check-out date
    const results = hotels.filter(
      (hotelData) =>
        hotelData.cityCode.toLowerCase().includes(cityCode.toLowerCase()) &&
        (!checkInDate || hotelData.checkInDate === checkInDate) &&
        (!checkOutDate || hotelData.checkOutDate === checkOutDate) // Check if dates match or are empty
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
      setCityCode(''); // Reset search fields
      setCheckInDate('');
      setCheckOutDate('');
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
          City Code:
          <input
            type="text"
            placeholder="Enter city code"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Check-In Date:
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Check-Out Date:
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
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
                {hotelData.cityCode} - {hotelData.name} from {hotelData.checkInDate} to {hotelData.checkOutDate}
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
            {selectedHotel.cityCode} - {selectedHotel.name} from {selectedHotel.checkInDate} to {selectedHotel.checkOutDate}
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
                {hotelData.cityCode} - {hotelData.name} from {hotelData.checkInDate} to {hotelData.checkOutDate} - Booked
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
