import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons'; // Import the faHotel icon

const HotelBooking = () => {
  const [cityCode, setCityCode] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookedHotels, setBookedHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [touristId] = useState("6744bead2b0cf27c284554ad"); // Hardcoded for now
  const [searchId, setSearchId] = useState(null);
  const [hotelId, setHotelId] = useState(null); // Set after selecting the hotel
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Payment modal state
  const navigate = useNavigate();

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:4000/hotels/hotels?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
    const data = await response.json();

    if (data.hotels) {
      setSearchResults(data.hotels);
      setSearchId(data.searchId);
      setHotelId(data.hotels.hotelId);
    } else {
      console.error('Error fetching hotel data');
    }
  };

  // Select a hotel
  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setHotelId(hotel.hotelId);
    setIsPaymentModalOpen(true); // Open payment modal
  };

  // Confirm booking for the selected hotel
  const handleWalletPayment = async () => {
    try {
      const response = await axios.post('http://localhost:4000/hotels/bookWallet', {
        touristId,
        searchId,
        hotelId,
      });
  
      setSuccessMessage(`Successfully booked ${selectedHotel.name} via Wallet!`);
      setErrorMessage('');
      setBookedHotels([...bookedHotels, response.data.bookingDetails]);
      setSelectedHotel(null); // Clear selected hotel after booking
      setIsPaymentModalOpen(false);
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          background: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        {/* FontAwesome Icon added at the top */}
        <FontAwesomeIcon icon={faHotel} style={{ fontSize: '50px', color: '#008080', marginBottom: '15px' }} />
        <h2 style={{ marginBottom: '20px', color: '#008080' }}>Hotel Booking</h2>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit}>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>
              City Code:
              <input
                type="text"
                placeholder="Enter city code"
                value={cityCode}
                onChange={(e) => setCityCode(e.target.value)}
                style={inputStyle}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>
              Check-In Date:
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                style={inputStyle}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>
              Check-Out Date:
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                style={inputStyle}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px 0',
              background: '#008080',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Search
          </button>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#008080' }}>Search Results:</h4>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {searchResults.map((hotelData) => (
                <li
                  key={hotelData.hotelId}
                  style={{
                    padding: '15px',
                    marginBottom: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {hotelData.name} from {hotelData.checkInDate} to {hotelData.checkOutDate}
                  <div><strong>Price:</strong> {hotelData.price}</div>
                  <button
                    onClick={() => handleHotelSelect(hotelData)}
                    style={{
                      backgroundColor: '#008080',
                      color: '#fff',
                      padding: '10px',
                      width: '100%',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginTop: '10px',
                    }}
                  >
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
            <div style={{ marginBottom: '15px' }}>
              <label>
                Card Number:
                <input
                  type="text"
                  placeholder="Enter card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  style={inputStyle}
                  required
                />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                CVV:
                <input
                  type="text"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  style={inputStyle}
                  required
                />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                Expiry Date (MM/YY):
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardExpiryDate}
                  onChange={(e) => setCardExpiryDate(e.target.value)}
                  style={inputStyle}
                  required
                />
              </label>
            </div>
            <button
              onClick={handleConfirmBooking}
              style={{
                width: '100%',
                padding: '10px 0',
                background: '#008080',
                color: '#ffffff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              Confirm Booking
            </button>
          </div>
        )}

        {/* Booked Hotels List */}
        {bookedHotels.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>Booked Hotels:</h4>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {bookedHotels.map((hotelData) => (
                <li
                  key={hotelData.id}
                  style={{
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    marginBottom: '10px',
                  }}
                >
                  {hotelData.hotelName} from {hotelData.checkInDate} to {hotelData.checkOutDate} - Booked
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
};

const successMessageStyle = {
  backgroundColor: "#d4edda",
  color: "#155724",
  padding: "15px",
  border: "1px solid #c3e6cb",
  borderRadius: "5px",
  marginBottom: "20px",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center",
};

const errorMessageStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "15px",
  border: "1px solid #f5c6cb",
  borderRadius: "5px",
  marginBottom: "20px",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center",
};

const buttonStyle = {
  margin: "10px",
  padding: "5px 10px",
  fontSize: "14px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "1px solid #ccc",
  backgroundColor: "#f0f0f0",
};

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "5px",
  fontSize: "14px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const listItemStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "20px",
  border: "2px solid #ccc",
  borderRadius: "10px",
  zIndex: 1000,
};


export default HotelBooking;
