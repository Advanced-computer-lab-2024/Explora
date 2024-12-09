import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
const HotelBooking = () => {
  const [cityCode, setCityCode] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookedHotels, setBookedHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [message, setMessage] = useState('');
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
  // const [touristId] = useState("674b64cbd03522fb24ac9d06"); // Hardcoded for now
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage
  const [searchId, setSearchId] = useState(null);
  const [hotelId, setHotelId] = useState(null); // Set after selecting the hotel
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Payment modal state
  const [enteredPromocode, setEnteredPromocode] = useState('');
  const [enteredPromocodeCredit, setEnteredPromocodeCredit] = useState('');

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
    setHotelId(hotel.hotelId);
    setIsPaymentModalOpen(true); // Open payment modal
  };

  // Confirm booking for the selected hotel
  const handleWalletPayment = async () => {
    const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
    if (!touristId) {
      setErrorMessage('User not logged in. Please log in first.');
      return;
    }
    try {
      console.log('Sending request to book wallet:', {
        touristId,
        searchId,
        hotelId,
        promoCode: enteredPromocode,
      });
  
      const response = await axios.post('http://localhost:4000/hotels/bookWallet', {
        touristId,
        searchId,
        hotelId,
        promoCode: enteredPromocode,
      });
  
      console.log('Response received:', response.data);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setBookedHotels([...bookedHotels, response.data.bookingDetails]);
      setSelectedHotel(null);
      alert('Hotel booked successfully!');
    } catch (error) {
      console.error('Error booking wallet:', error);
      setErrorMessage(error.response?.data?.message || 'Error booking hotel');
      setSuccessMessage('');
    }
  };
  

  // Cancel booking
  const handleCancelBooking = (hotelId) => {
    const updatedBookings = bookedHotels.filter(hotel => hotel.id !== hotelId);
    setBookedHotels(updatedBookings);
  };


  // Handle credit card payment
// Handle credit card payment
const handleCreditCardPayment = async () => {
  try {
    const frontendUrl = window.location.origin;
    console.log("Frontend URL:", frontendUrl); // Log it for debugging
    // Send request to the backend to create a Stripe Checkout session
    const response = await axios.post("http://localhost:4000/hotels/bookStripe", {
      touristId,
      searchId,
      hotelId,
      frontendUrl,
      promoCode: enteredPromocodeCredit, // Pass the URL to the backend
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
      <div style={{ marginTop: '80px' }}>
  <h1 className="header">Hotel Booking </h1>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: "20px" }}>
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
        <button type="submit" style={buttonStyle}>
          Search
        </button>
      </form>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h4>Search Results:</h4>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {searchResults.map((hotelData) => (
              <li key={hotelData.hotelId} style={listItemStyle}>
                {hotelData.name} from {hotelData.checkInDate} to{" "}
                {hotelData.checkOutDate}
                <div>
                  <strong>Price:</strong> {hotelData.price}
                </div>
                <button
                  onClick={() => handleHotelSelect(hotelData)}
                  style={buttonStyle}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedHotel && (
        <div style={modal}>
          <h4>Selected Hotel:</h4>
          <p>
            {selectedHotel.name} from {selectedHotel.checkInDate} to{" "}
            {selectedHotel.checkOutDate}
          </p>
          <p>
            <strong>Amount to Pay:</strong> {selectedHotel.price}
          </p>
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

      {/* Booked Hotels List */}
      {bookedHotels.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Booked Hotels:</h4>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {bookedHotels.map((hotelData) => (
              <li key={hotelData.id} style={listItemStyle}>
                {hotelData.hotelName} from {hotelData.checkInDate} to{" "}
                {hotelData.checkOutDate} - Booked
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

// Styles for buttons, inputs, and list items
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