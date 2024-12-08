import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Stripe public key
const stripePromise = loadStripe('pk_test_51QQzkUA2DxXJxW3GaGZ8OzgKlS9uq196afY2ijPqO82eSVjCRawgBt41XUhZDQafyANl6CZIdI0c7DZoxalrMywa00trn2dsJM');

// Hardcoded Payment Intent client secret for testing (Replace with your Stripe client secret)
const CLIENT_SECRET = "sk_test_51QQzkUA2DxXJxW3GJAEWfePqTbzAteEXHCPFtFE8o2gQe00ChPMeqpNlgnyzSBbfzZ79a6zDpmiUyefEnQNiAjCm00qB9lX6RBt_abcdef"; // Use a real client secret for test mode
const frontendUrl = 'http://localhost:5173/';

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    neighborhood: '',
    apartment: '',
    building: '',
    floor: '',
  });
  const [error, setError] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  //const touristId = '67322cdfa472e2e7d22de84a'; // Replace with actual touristId
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the request
  const [promoCode, setPromoCode] = useState(""); //
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage




  // Fetch addresses when the component mounts
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
            if (!touristId) {
              setError('User not logged in. Please log in first.');
                return;
            }
      const response = await fetch(`http://localhost:4000/addresses/user/${touristId}`);
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddAddress = async () => {
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      setError('Please fill in all the required fields.');
      return;
    }

    try {
      const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
            if (!touristId) {
              setError('User not logged in. Please log in first.');
                return;
            }
      const response = await fetch(`http://localhost:4000/addresses/${touristId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });

      const data = await response.json();

      if (data._id) {
        setAddresses(prevAddresses => [...prevAddresses, data]);
        setNewAddress({
          street: '',
          city: '',
          state: '',
          zipCode: '',
          neighborhood: '',
          apartment: '',
          building: '',
          floor: '',
        });
        setError('');
      } else {
        setError(data.message || 'Error adding address.');
      }
    } catch (error) {
      setError('Error adding address.');
    }
  };

  const handleRemoveAddress = async (id) => {
    try {
      const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
            if (!touristId) {
              setError('User not logged in. Please log in first.');
                return;
            }
      const response = await fetch(`http://localhost:4000/addresses/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.message === 'Address deleted successfully') {
        setAddresses(prevAddresses => prevAddresses.filter(address => address._id !== id));
        if (selectedAddress === id) {
          setSelectedAddress(null);
        }
      } else {
        setError(data.message || 'Error removing address.');
      }
    } catch (error) {
      setError('Error removing address.');
    }
  };

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleProceedToPayment = () => {
    if (selectedAddress !== null) {
      setShowPaymentOptions(true);
    }
  };

  const handlePayment = async () => {
    if (selectedAddress !== null && selectedPaymentMethod) {
      setLoading(true);
      try {
        const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
            if (!touristId) {
              setError('User not logged in. Please log in first.');
                return;
            }
        const response = await fetch('http://localhost:4000/orders/checkoutAndPay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: touristId,
            addressId: selectedAddress,
            frontendUrl: frontendUrl,
            paymentMethod: selectedPaymentMethod,
            promocode: promoCode, // Include promo code in the request
          }),
        });

        const data = await response.json();

        if (response.ok) {
          if (selectedPaymentMethod === 'credit_card') {
            // Redirect to Stripe checkout
            window.location.href = data.url;
          } else {
            // Handle other payment methods like wallet or COD
            alert(data.message);
          }
        } else {
          setError(data.message || 'Something went wrong with the payment process. ');
        }
      } catch (error) {
        console.error('Error during checkout request:', error);
        setError('Error during checkout, please try again.' + error.message);
      }
      setLoading(false);
    } else {
      setError('Please select an address and payment method.');
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
            name="street"
            value={newAddress.street}
            onChange={handleInputChange}
            placeholder="Street"
            style={styles.input}
          />
          <input
            type="text"
            name="city"
            value={newAddress.city}
            onChange={handleInputChange}
            placeholder="City"
            style={styles.input}
          />
          <input
            type="text"
            name="state"
            value={newAddress.state}
            onChange={handleInputChange}
            placeholder="State"
            style={styles.input}
          />
          <input
            type="text"
            name="zipCode"
            value={newAddress.zipCode}
            onChange={handleInputChange}
            placeholder="Zip Code"
            style={styles.input}
          />
          <input
            type="text"
            name="neighborhood"
            value={newAddress.neighborhood}
            onChange={handleInputChange}
            placeholder="Neighborhood"
            style={styles.input}
          />
          <input
            type="text"
            name="apartment"
            value={newAddress.apartment}
            onChange={handleInputChange}
            placeholder="Apartment"
            style={styles.input}
          />
          <input
            type="text"
            name="building"
            value={newAddress.building}
            onChange={handleInputChange}
            placeholder="Building"
            style={styles.input}
          />
          <input
            type="text"
            name="floor"
            value={newAddress.floor}
            onChange={handleInputChange}
            placeholder="Floor"
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
            {addresses.map((address) => (
              <li key={address._id} style={styles.addressItem}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    checked={selectedAddress === address._id}
                    onChange={() => handleAddressSelect(address._id)}
                    style={styles.radioInput}
                  />
                  {`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`}
                </label>
                <button
                  onClick={() => handleRemoveAddress(address._id)}
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
              {['wallet', 'credit_card', 'cash'].map(
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
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              style={styles.input}
            />
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
