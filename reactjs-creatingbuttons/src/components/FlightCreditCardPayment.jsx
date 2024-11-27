import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FlightCreditCardPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract flight details from the passed state
  const { flight } = location.state || {};
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');



  // Handle payment submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!cardNumber || !cardExpiryDate || !cvv) {
      setErrorMessage('Please fill in all payment details.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/payments/credit-card', {
        touristId,
        searchId,
        flightId: flight.id,
        amount: flight.price,
        cardNumber,
        cardExpiryDate,
        cvv,
      });

      setSuccessMessage(response.data.message || 'Payment successful!');
      setErrorMessage('');

      // Optionally, navigate to another page after success
      setTimeout(() => {
        navigate('/PaymentConfirmation'); // Redirect to confirmation page
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Payment failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Credit Card Payment</h3>
      {flight ? (
        <div>
           <p>
            ---------------------------------------------------
           </p>
          <h4>Amount:</h4>
          <p>{flight.price} EUR</p>
        </div>
      ) : (
        <p>No flight details available. Please go back and select a flight.</p>
      )}

      {/* Error and Success Messages */}
      {errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
      {successMessage && <div style={successMessageStyle}>{successMessage}</div>}

      {/* Payment Form */}
      <form onSubmit={handlePaymentSubmit} style={{ marginTop: '20px' }}>
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
        <button type="submit" style={buttonStyle}>
          Confirm Payment
        </button>
      </form>
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

const inputStyle = {
  display: 'block',
  marginBottom: '10px',
  padding: '5px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
};

const errorMessageStyle = {
  color: 'white',
  backgroundColor: '#f44336', // Red background
  padding: '10px',
  fontSize: '16px',
  marginBottom: '10px',
  borderRadius: '5px',
};

const successMessageStyle = {
  color: 'white',
  backgroundColor: '#4CAF50', // Green background
  padding: '10px',
  fontSize: '16px',
  marginBottom: '10px',
  borderRadius: '5px',
};

export default FlightCreditCardPayment;
