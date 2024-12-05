import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [error, setError] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null); // Track selected address
  const navigate = useNavigate(); // Hook for navigating to another page

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
    // If the removed address was selected, clear the selection
    if (selectedAddress === index) {
      setSelectedAddress(null);
    }
  };

  const handleAddressSelect = (index) => {
    setSelectedAddress(index); // Set the selected address
  };

  const handleProceedToPayment = () => {
    if (selectedAddress !== null) {
      navigate('/payment'); // Redirect to the payment page (make sure the route exists)
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Add a New Delivery Address</h2>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Enter delivery address"
          style={styles.input}
        />
        <div style={styles.buttonContainer}>
          <button onClick={handleAddAddress} style={styles.addButton}>
            Add Address
          </button>
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </div>

      <div>
        <h2>Your Delivery Addresses</h2>
        {addresses.length > 0 ? (
          <ul style={styles.addressList}>
            {addresses.map((address, index) => (
              <li key={index} style={styles.addressItem}>
                <input
                  type="radio"
                  checked={selectedAddress === index}
                  onChange={() => handleAddressSelect(index)}
                  style={{ marginRight: '10px' }}
                />
                <span>{address}</span>
                <button
                  onClick={() => handleRemoveAddress(index)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No addresses added yet.</p>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <div style={styles.buttonContainer}>
          <button
            style={styles.checkoutButton}
            disabled={selectedAddress === null}
            onClick={handleProceedToPayment} // Add click handler for redirection
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles for the Checkout component
const styles = {
  input: {
    padding: '10px',
    width: '80%',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 0',
    fontSize: '14px', // Smaller font size
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80%', // Smaller width
    boxSizing: 'border-box',
  },
  checkoutButton: {
    padding: '10px 0',
    fontSize: '16px', // Slightly smaller font size
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80%', // Smaller width
    boxSizing: 'border-box',
  },
  addressList: {
    listStyle: 'none',
    padding: '0',
  },
  addressItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  removeButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px', // Space between buttons
    marginTop: '20px',
  },
};

export default Checkout;
