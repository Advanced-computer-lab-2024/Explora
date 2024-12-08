import React from 'react';

const OrderDetails = ({ order, onClose }) => {
  if (!order || !order.products) {
    return <p>No order details available.</p>;
  }

  return (
    <div style={modalStyle}>
      <h2>Order Details</h2>
      <h3>Products:</h3>
      <ul>
        {/* Loop through the products array */}
        {order.products.map((product, index) => (
          <li key={index}>
            {/* Render product name and price */}
            <strong>{product.productId.name}</strong> - ${product.productId.price} x {product.quantity}
          </li>
        ))}
      </ul>
      <h3>Total Price: ${order.totalPrice}</h3>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
  zIndex: 1000,
};

export default OrderDetails;
