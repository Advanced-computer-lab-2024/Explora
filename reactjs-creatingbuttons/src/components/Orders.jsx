import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all orders and wallet balance
    const fetchOrdersAndWallet = async () => {
      try {
        const [ordersResponse, walletResponse] = await Promise.all([
          axios.get("/api/orders"), // Replace with your API endpoint
          axios.get("/api/wallet"), // Replace with your wallet API endpoint
        ]);
        setOrders(ordersResponse.data);
        setWalletBalance(walletResponse.data.walletBalance);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders or wallet balance:", error);
        setError("Unable to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchOrdersAndWallet();
  }, []);

  const fetchOrderDetails = async (orderId) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/orders/${orderId}`); // Replace with your API endpoint
      setSelectedOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Unable to fetch order details. Please try again.");
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      const response = await axios.delete(`/api/orders/${orderId}`); // Replace with your API endpoint
      alert("Order canceled successfully!");
      setSelectedOrder(null);

      // Update wallet balance with refunded amount
      setWalletBalance((prevBalance) => prevBalance + response.data.refundedAmount);

      // Update the orders list after cancellation
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };

  const payWithWallet = async (orderId) => {
    try {
      const response = await axios.post(`/api/orders/${orderId}/pay-with-wallet`); // Replace with your API endpoint
      alert("Payment successful!");
      setWalletBalance((prevBalance) => prevBalance - response.data.amountPaid);

      // Update order status in the list
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h3>Wallet Balance: ${walletBalance.toFixed(2)}</h3>
      </div>
      {selectedOrder ? (
        <div>
          <h2>Order Details</h2>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Event Name:</strong> {selectedOrder.eventName}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(selectedOrder.orderDate).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Total Price:</strong> ${selectedOrder.totalPrice}
            </p>
            <p>
              <strong>Additional Info:</strong> {selectedOrder.additionalInfo}
            </p>
          </div>
          <button
            onClick={() => cancelOrder(selectedOrder.id)}
            style={{
              padding: "10px 20px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Cancel Order
          </button>
          <button
            onClick={() => setSelectedOrder(null)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back to Orders
          </button>
        </div>
      ) : (
        <div>
          <h2>Your Orders</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Event Name:</strong> {order.eventName}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <button
                  onClick={() => fetchOrderDetails(order.id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  View Details
                </button>
                {order.status === "current" && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel Order
                  </button>
                )}
                {order.status === "unpaid" && (
                  <button
                    onClick={() => payWithWallet(order.id)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "green",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Pay with Wallet
                  </button>
                )}
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
