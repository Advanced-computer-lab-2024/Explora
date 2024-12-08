import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetails from './OrderDetails '; // Make sure there's no extra space here

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const touristId = "67322cdfa472e2e7d22de84a";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/orders/${touristId}`);
      console.log(response.data); // Check the structure of response

      if (response.data && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders); // Update state with orders
      } else {
        setError('No orders found for this tourist.');
      }
    } catch (err) {
      setError("Failed to load orders.");
      console.error('Error fetching orders:', err);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:4000/orders/cancel/${orderId}`);
      fetchOrders(); // Re-fetch orders to update the list
    } catch (err) {
      setError("Failed to cancel the order.");
      console.error('Error canceling order:', err);
    }
  };

  const viewOrderDetails = (order) => {
    console.log('Selected Order:', order); // Debugging the selected order
    setSelectedOrder(order);
  };

  return (
    <div>
      <h1>Orders</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {(orders || []).map((order) => (
          <li key={order._id}>
            <p><strong>Status:</strong> {order.orderStatus}</p>
            <button onClick={() => viewOrderDetails(order)}>View Details</button>
            {order.orderStatus !== 'delivered' && (
              <button onClick={() => cancelOrder(order._id)}>Cancel</button>
            )}
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};

export default OrderList;
