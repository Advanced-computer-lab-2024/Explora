import React, { useState } from 'react';

const ViewCartTourist = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: '$100' },
    { id: 2, name: 'Product 2', price: '$150' },
    { id: 3, name: 'Product 3', price: '$200' },
  ]);

  const handleCheckout = () => {
    // Implement checkout functionality here
    console.log('Proceeding to checkout...');
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>{item.name}</span> - <span>{item.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button onClick={handleCheckout} style={buttonStyle}>
        Proceed to Checkout
      </button>
    </div>
  );
};

const buttonStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#202124',
  color: 'white',
};

export default ViewCartTourist;

