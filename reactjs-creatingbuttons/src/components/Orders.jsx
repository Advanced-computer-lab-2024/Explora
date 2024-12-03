import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = ({ touristId }) => { // Assume touristId is passed as a prop
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrdersAndWallet = async () => {
      try {
        const [ordersResponse, walletResponse] = await Promise.all([
          axios.get(`/api/${touristId}/orders`),
          axios.get(`/api/${touristId}/wallet`),
        ]);
        setOrders(ordersResponse.data.currentOrders || []);
        setWalletBalance(walletResponse.data.walletBalance || 0);
      } catch (error) {
        console.error("Error fetching orders or wallet balance:", error);
        setError("Unable to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndWallet();
  }, [touristId]);

  const fetchOrderDetails = async (orderId) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/${touristId}/orders/${orderId}`);
      setSelectedOrder(response.data.orderDetails);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Unable to fetch order details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const response = await axios.patch(`/api/${touristId}/orders/${orderId}/cancel`);
      alert("Order canceled successfully!");
      setWalletBalance(response.data.walletBalance);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };

  const payWithWallet = async (orderId) => {
    try {
      const response = await axios.post(`/api/${touristId}/orders/${orderId}/pay-with-wallet`);
      alert("Payment successful!");
      setWalletBalance((prevBalance) => prevBalance - response.data.amountPaid);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "paid" } : order
        )
      );
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to process payment. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h3>Wallet Balance: ${walletBalance.toFixed(2)}</h3>
      {selectedOrder ? (
        <div>
          <h2>Order Details</h2>
          <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", marginBottom: "20px" }}>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Event Name:</strong> {selectedOrder.products.map(p => p.productId.name).join(", ")}</p>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
            <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
          </div>
          <button onClick={() => cancelOrder(selectedOrder._id)} style={{ backgroundColor: "red", color: "#fff" }}>Cancel Order</button>
          <button onClick={() => setSelectedOrder(null)} style={{ marginLeft: "10px" }}>Back to Orders</button>
        </div>
      ) : (
        <div>
          <h2>Your Orders</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <button onClick={() => fetchOrderDetails(order._id)} style={{ marginRight: "10px" }}>View Details</button>
                {order.orderStatus === "pending" && <button onClick={() => cancelOrder(order._id)} style={{ backgroundColor: "red", color: "#fff" }}>Cancel Order</button>}
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
