import React, { useState } from 'react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = () => {
    if (paymentMethod === '') {
      alert('Please select a payment method');
      return;
    }
    if (paymentMethod === 'credit-card') {
      // Here you would integrate Stripe payment process
      alert('Redirecting to Stripe payment gateway');
    } else {
      alert(`You have chosen ${paymentMethod} as your payment method.`);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Please choose a payment method:</h2>
     
      
      <div>
        <input
          type="radio"
          id="wallet"
          name="payment-method"
          value="wallet"
          checked={paymentMethod === 'wallet'}
          onChange={handlePaymentMethodChange}
        />
        <label htmlFor="wallet">Pay with Wallet</label>
      </div>

      <div>
        <input
          type="radio"
          id="credit-card"
          name="payment-method"
          value="credit-card"
          checked={paymentMethod === 'credit-card'}
          onChange={handlePaymentMethodChange}
        />
        <label htmlFor="credit-card">Pay with Credit Card </label>
      </div>

      <div>
        <input
          type="radio"
          id="cash"
          name="payment-method"
          value="cash"
          checked={paymentMethod === 'cash'}
          onChange={handlePaymentMethodChange}
        />
        <label htmlFor="cash">Cash on Delivery</label>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmit} style={styles.submitButton}>
          Submit Payment
        </button>
      </div>

      {paymentMethod === 'credit-card' && (
        <div style={{ marginTop: '20px' }}>
          <h3>Stripe Credit Card Integration (to be added)</h3>
          
        </div>
      )}
    </div>
  );
};

// Styles for the PaymentPage component
const styles = {
  submitButton: {
    padding: '12px 25px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PaymentPage;
