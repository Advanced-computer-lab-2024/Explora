import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPlane } from '@fortawesome/free-solid-svg-icons'; // Import the plane icon

const FlightBooking = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
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
        cvv
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
    if (selectedFlight){
      navigate('/FlightWalletPayment',{state:{selectedFlight}});
    }
    setIsPaymentModalOpen(false);
  };

  const handleCreditCardPayment = () => {
    if (selectedFlight){
      navigate('/FlightCreditCardPayment',{state:{flight:selectedFlight}});
    }
    setIsPaymentModalOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
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
        {/* Plane Icon Above the Title */}
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
              Date:
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
        
        {searchResults.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#008080' }}>Search Results:</h4>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {searchResults.map((flight) => (
                <li key={flight.id} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                  <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
                  <p>Duration: {flight.duration}</p>
                  <p>Price: {flight.price} EUR</p>
                  <button onClick={() => handleFlightSelect(flight)} style={{ backgroundColor: '#008080', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
                    Select
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isPaymentModalOpen && selectedFlight && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            textAlign: 'center',
            width: '300px',
          }}>
            <h4>Selected Flight:</h4>
            <p>Last Ticketing Date: {selectedFlight.lastTicketingDate}</p>
            <p>Duration: {selectedFlight.duration}</p>
            <p>Price: {selectedFlight.price} EUR</p>

            <h4>Payment Options</h4>
            <button onClick={handleWalletPayment} style={{
              backgroundColor: '#008080', 
              color: '#fff', 
              padding: '10px', 
              width: '100%',
              borderRadius: '5px',
              marginBottom: '10px',
              cursor: 'pointer',
            }}>
              Pay with Wallet
            </button>
            <button onClick={handleCreditCardPayment} style={{
              backgroundColor: '#008080', 
              color: '#fff', 
              padding: '10px', 
              width: '100%',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              Pay with Credit Card
            </button>
            <button onClick={handleCloseModal} style={{
              backgroundColor: '#f44336',
              color: '#fff',
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              marginTop: '10px',
              cursor: 'pointer',
            }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightBooking;
