import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/cropped_image.png';

const FlightBooking = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [touristId] = useState('67322cdfa472e2e7d22de84a');
  const [searchId, setSearchId] = useState(null);
  const [flightId, setFlightId] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false); // State to manage History options visibility
  const [hideTimeout, setHideTimeout] = useState(null); // Timeout for delay to hide dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle the dropdown visibility
  };

  const handleMouseEnterHistory = () => {
    // Cancel any existing timeout to hide the dropdown
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setIsHistoryOptionsVisible(true); // Show options immediately when hovering over the link
  };

  const handleMouseLeaveHistory = () => {
    // Set a timeout to hide the options after a small delay
    const timeout = setTimeout(() => {
      setIsHistoryOptionsVisible(false); // Hide options after the delay
    }, 300); // 300 ms delay before hiding the options
    setHideTimeout(timeout);
  };

  const navigate = useNavigate();

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
    setIsPaymentModalOpen(true);
  };

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
        cvv,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error booking flight');
      setSuccessMessage('');
    }
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedFlight(null);
  };

  const handleWalletPayment = () => {
    if (selectedFlight) {
      navigate('/FlightWalletPayment', { state: { selectedFlight } });
    }
    setIsPaymentModalOpen(false);
  };

  const handleCreditCardPayment = () => {
    if (selectedFlight) {
      navigate('/FlightCreditCardPayment', { state: { flight: selectedFlight } });
    }
    setIsPaymentModalOpen(false);
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    background: '#008080',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1px 5px', // Reduced padding to decrease navbar height
          backgroundColor: '#008080',
          color: 'white',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          justifyContent: 'space-between', // Ensure space between items
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
          <a href="/product-list-tourist" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
        </div>

        {/* SVG Icon */}
        <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <svg
            onClick={toggleDropdown}  // Toggle dropdown visibility
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
              onMouseEnter={handleMouseEnterHistory} // Keep dropdown visible when hovering over History section
              onMouseLeave={handleMouseLeaveHistory} // Hide dropdown after a delay when mouse leaves the section
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
    textAlign: 'center',  // Added this line to center the text
    display: 'block',     // Ensures the link takes up full width of the dropdown item
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
                onClick={() => navigate('/logout')}
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
              {/* History Options */}
              {isHistoryOptionsVisible && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px', // Adjust this as needed to place the options directly next to the dropdown
                    right: '220px', // Adjust this for the correct spacing on the left side of the dropdown
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
                </div>
              )}

            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: '90px', // Adjust for the logo height and nav bar
          backgroundColor: '#ffff',
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
          <FontAwesomeIcon icon={faPlane} style={{ fontSize: '40px', color: '#008080', marginBottom: '10px' }} />
          <h2 style={{ marginBottom: '20px', color: '#008080' }}>Flight Booking</h2>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          <form onSubmit={handleSearchSubmit}>
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label>
                Origin:
                <input
                  type="text"
                  placeholder="Enter city code (e.g., CAI)"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                />
              </label>
            </div>

            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label>
                Destination:
                <input
                  type="text"
                  placeholder="Enter city code (e.g., RUH)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                />
              </label>
            </div>

            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label>
                Date of Departure:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                />
              </label>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                background: '#008080',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Search Flights
            </button>
          </form>
        </div>
      </div>

      {/* Flight Results */}
      {searchResults.length > 0 && (
        <div style={{ marginTop: '30px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <h4>Available Flights</h4>
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            {searchResults.map((flight) => (
              <li
                key={flight.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  padding: '10px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => handleFlightSelect(flight)}
              >
                <p><strong>Flight:</strong> {flight.origin} to {flight.destination}</p>
                <p><strong>Duration:</strong> {flight.duration}</p>
                <p><strong>Price:</strong> ${flight.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1001,
            width: '400px',
          }}
        >
          <h3>Confirm Payment</h3>
          <button
            onClick={handleCloseModal}
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Close
          </button>
          <div>
            <h4>Payment Method</h4>
            <button
              onClick={handleWalletPayment}
              style={{
                background: '#008080',
                color: 'white',
                border: 'none',
                padding: '10px 0',
                width: '100%',
                marginBottom: '10px',
                cursor: 'pointer',
              }}
            >
              Wallet
            </button>
            <button
              onClick={handleCreditCardPayment}
              style={{
                background: '#008080',
                color: 'white',
                border: 'none',
                padding: '10px 0',
                width: '100%',
                marginBottom: '10px',
                cursor: 'pointer',
              }}
            >
              Credit Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
