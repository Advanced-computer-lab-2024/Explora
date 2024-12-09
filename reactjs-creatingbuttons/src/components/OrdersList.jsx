import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetails from './OrderDetails '; // Make sure there's no extra space here
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate
  const touristId = localStorage.getItem('userId') || '';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!touristId) {
      setError('User not logged in. Please log in first.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:4000/orders/${touristId}`);
      console.log(response.data);

      if (response.data && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        setError('No orders found for this tourist.');
      }
    } catch (err) {
      setError('Failed to load orders.');
      console.error('Error fetching orders:', err);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!touristId) {
      setError('User not logged in. Please log in first.');
      return;
    }
    try {
      await axios.put(`http://localhost:4000/orders/cancel/${orderId}`);
      fetchOrders();
    } catch (err) {
      setError('Failed to cancel the order.');
      console.error('Error canceling order:', err);
    }
  };

  const viewOrderDetails = (order) => {
    console.log('Selected Order:', order);
    setSelectedOrder(order);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Orders</h1>
      {error && <p style={styles.error}>{error}</p>}
      
      {/* Back Button */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>

      <ul style={styles.orderList}>
        {(orders || []).map((order) => (
          <li key={order._id} style={styles.orderItem}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>
            <div style={styles.buttonGroup}>
              <button style={styles.button} onClick={() => viewOrderDetails(order)}>View Details</button>
              {order.orderStatus !== 'delivered' && (
                <button style={{ ...styles.button, ...styles.cancelButton }} onClick={() => cancelOrder(order._id)}>Cancel</button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
  orderList: {
    listStyleType: 'none',
    padding: 0,
  },
  orderItem: {
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  buttonGroup: {
    marginTop: '10px',
  },
  button: {
    padding: '10px 15px',
    margin: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
};

export default OrderList;
