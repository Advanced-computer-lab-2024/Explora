import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewCartTourist = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 100, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 150, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Product 3', price: 200, quantity: 1, image: 'https://via.placeholder.com/100' },
  ]);

  const navigate = useNavigate(); // Hook for navigation

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to Checkout page
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div style={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.details}>
                <h3 style={styles.productName}>{item.name}</h3>
                <p style={styles.price}>${item.price}</p>
                <div style={styles.quantityControls}>
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    style={styles.quantityButton}
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={styles.total}>
            <strong>Total:</strong> ${calculateTotal()}
          </div>
        </div>
      ) : (
        <p style={styles.emptyMessage}>Your cart is empty.</p>
      )}
      <button onClick={handleCheckout} style={styles.checkoutButton}>
        Proceed to Checkout
      </button>
    </div>
  );
};

// Updated styles for the design
const styles = {
  container: {
    maxWidth: '700px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    color: '#444',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  details: {
    marginLeft: '20px',
    flex: '1',
  },
  productName: {
    margin: '0',
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
  },
  price: {
    margin: '5px 0',
    fontSize: '18px',
    color: '#777',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  quantityButton: {
    padding: '8px 15px',
    fontSize: '16px',
    backgroundColor: '#eee',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 5px',
  },
  quantity: {
    margin: '0 10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  removeButton: {
    padding: '10px 15px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#f44336',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  total: {
    textAlign: 'right',
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '25px',
    color: '#333',
  },
  checkoutButton: {
    display: 'block',
    margin: '30px auto 0',
    padding: '12px 25px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: '18px',
  },
};

export default ViewCartTourist;
