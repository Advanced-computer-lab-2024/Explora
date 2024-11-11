import React, { useState } from 'react';
import axios from 'axios';

const HotelBooking = () => {
  const [cityCode, setCityCode] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookedHotels, setBookedHotels] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [touristId] = useState("672e97f48a225c52217e99ac"); // Hardcoded for now
  const [searchId, setSearchId] = useState(null);
  const [hotelId, setHotelId] = useState(null); // Set after selecting the hotel

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch( ` http://localhost:4000/hotels/hotels?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
  );
    const data = await response.json();

    if (data.hotels) {
      setSearchResults(data.hotels)
      setSearchId(data.searchId);
      setHotelId(data.hotels.hotelId);
    } else {
      console.error('Error fetching hotel data');
    }
  };
  // Select a hotel
  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setHotelId(hotel.hotelId); // Set hotelId after selection
  };

  // Confirm booking for the selected hotel
  const handleConfirmBooking = async () => {
    if (!cardNumber || !cardExpiryDate || !cvv) {
      setErrorMessage('Please fill in all payment details');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/hotels/book', {
        touristId,
        searchId,
        hotelId,
        cardNumber,
        cardExpiryDate,
        cvv,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setBookedHotels([...bookedHotels, response.data.bookingDetails]);
      setSelectedHotel(null); // Clear selected hotel after booking
      setCardNumber('');
      setCardExpiryDate('');
      setCvv('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error booking hotel');
      setSuccessMessage('');
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
              <li key={hotelData.hotelId} style={listItemStyle}>
                {hotelData.name} from {hotelData.checkInDate} to {hotelData.checkOutDate}
                <div><strong>Price:</strong> {hotelData.price}</div>
                <button onClick={() => handleHotelSelect(hotelData)} style={buttonStyle}>
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected Hotel Details with Booking Form */}
      {selectedHotel && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected Hotel:</h4>
          <p>
            {selectedHotel.name} from {selectedHotel.checkInDate} to {selectedHotel.checkOutDate}
            <br />
            <strong>Price:</strong> {selectedHotel.price}
          </p>
          <h4>Payment Details:</h4>
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
            CVV:
            <input
              type="text"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label>
            Expiry Date (MM/YY):
            <input
              type="text"
              placeholder="MM/YY"
              value={cardExpiryDate}
              onChange={(e) => setCardExpiryDate(e.target.value)}
              style={inputStyle}
            />
          </label>
          <button onClick={handleConfirmBooking} style={buttonStyle}>Confirm Booking</button>
        </div>
      )}
     {successMessage && (
  <div style={{ color: 'green', fontWeight: 'bold', marginTop: '20px' }}>
    {successMessage}
  </div>
)}
{errorMessage && (
  <div style={{ color: 'red', fontWeight: 'bold', marginTop: '20px' }}>
    {errorMessage}
  </div>
)}

      {/* Booked Hotels List */}
      {bookedHotels.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Booked Hotels:</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {bookedHotels.map((hotelData) => (
              <li key={hotelData.id} style={listItemStyle}>
                {hotelData.hotelName} from {hotelData.checkInDate} to {hotelData.checkOutDate} - Booked
             
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