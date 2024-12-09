import React from 'react';

const OrderDetails = ({ order, onClose }) => {
  if (!order || !order.products) {
    return <p style={styles.errorMessage}>No order details available.</p>;
  }

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2 style={styles.header}>Order Details</h2>
        <h3 style={styles.subHeader}>Products:</h3>
        <ul style={styles.productList}>
          {order.products.map((product, index) => (
            <li key={index} style={styles.productItem}>
              <strong>{product.productId.name}</strong> - ${product.productId.price} x {product.quantity}
            </li>
          ))}
        </ul>
        <h3 style={styles.totalPrice}>Total Price: ${order.totalPrice}</h3>
        <button style={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '80%',
    maxWidth: '500px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  subHeader: {
    marginBottom: '10px',
    fontSize: '18px',
    color: '#555',
  },
  productList: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  productItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    fontSize: '16px',
  },
  totalPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
};

export default OrderDetails;
