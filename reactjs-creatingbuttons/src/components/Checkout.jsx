import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Stripe public key
const stripePromise = loadStripe('pk_test_51QQzkUA2DxXJxW3GaGZ8OzgKlS9uq196afY2ijPqO82eSVjCRawgBt41XUhZDQafyANl6CZIdI0c7DZoxalrMywa00trn2dsJM');

// Hardcoded Payment Intent client secret for testing (Replace with your Stripe client secret)
const CLIENT_SECRET = "sk_test_51QQzkUA2DxXJxW3GJAEWfePqTbzAteEXHCPFtFE8o2gQe00ChPMeqpNlgnyzSBbfzZ79a6zDpmiUyefEnQNiAjCm00qB9lX6RBt_abcdef"; // Use a real client secret for test mode

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [error, setError] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showStripeForm, setShowStripeForm] = useState(false);

  const handleAddAddress = () => {
    if (!newAddress.trim()) {
      setError('Please enter a valid address.');
      return;
    }
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    setNewAddress('');
    setError('');
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    if (selectedAddress === index) {
      setSelectedAddress(null);
    }
  };

  const handleAddressSelect = (index) => {
    setSelectedAddress(index);
  };

  const handleProceedToPayment = () => {
    if (selectedAddress !== null) {
      setShowPaymentOptions(true);
    }
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    if (selectedPaymentMethod === 'Credit Card (Stripe)') {
      setShowStripeForm(true);
    } else {
      alert(`Payment method selected: ${selectedPaymentMethod}`);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Checkout</h1>
        <section style={styles.section}>
          <h2 style={styles.subheading}>Add a New Delivery Address</h2>
          <div style={styles.formGroup}>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter delivery address"
              style={styles.input}
            />
            <button onClick={handleAddAddress} style={styles.primaryButton}>
              Add Address
            </button>
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
        </section>

        <section style={styles.section}>
          <h2 style={styles.subheading}>Your Delivery Addresses</h2>
          {addresses.length > 0 ? (
            <ul style={styles.addressList}>
              {addresses.map((address, index) => (
                <li key={index} style={styles.addressItem}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      checked={selectedAddress === index}
                      onChange={() => handleAddressSelect(index)}
                      style={styles.radioInput}
                    />
                    {address}
                  </label>
                  <button
                    onClick={() => handleRemoveAddress(index)}
                    style={styles.dangerButton}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.noAddressText}>No addresses added yet.</p>
          )}
        </section>

        <div style={styles.centered}>
          <button
            style={{
              ...styles.primaryButton,
              ...(selectedAddress === null ? styles.disabledButton : {}),
            }}
            disabled={selectedAddress === null}
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>

        {showPaymentOptions && (
          <section style={styles.paymentSection}>
            <h2 style={styles.subheading}>Select Payment Method</h2>
            <div style={styles.paymentMethods}>
              {['Wallet', 'Credit Card (Stripe)', 'Cash on Delivery'].map(
                (method) => (
                  <label key={method} style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      style={styles.radioInput}
                    />
                    {method}
                  </label>
                )
              )}
            </div>
            <div style={styles.centered}>
              <button
                style={styles.primaryButton}
                onClick={handlePayment}
              >
                Confirm Payment
              </button>
            </div>
          </section>
        )}

        {/* Render Stripe Form only if Credit Card method is selected */}
        {selectedPaymentMethod === 'Credit Card (Stripe)' && showStripeForm && <StripePaymentForm />}
      </div>
    </Elements>
  );
};

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      alert('Stripe is not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Confirm card payment using the hardcoded client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(CLIENT_SECRET, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } else if (paymentIntent) {
      alert(`Payment method selected: ${selectedPaymentMethod}`);
      alert('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.paymentSection}>
      <CardElement style={styles.cardElement} />
      <button type="submit" style={styles.primaryButton} disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '30px',
  },
  subheading: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#444',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  primaryButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  errorText: {
    color: 'red',
    fontSize: '0.9rem',
  },
  addressList: {
    listStyleType: 'none',
    padding: '0',
  },
  addressItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  radioLabel: {
    fontSize: '1rem',
    marginRight: '10px',
  },
  radioInput: {
    marginRight: '10px',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '5px 10px',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  noAddressText: {
    color: '#777',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
  paymentSection: {
    padding: '20px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  paymentMethods: {
    marginBottom: '20px',
  },
  cardElement: {
    marginBottom: '10px',
  },
};

export default Checkout;