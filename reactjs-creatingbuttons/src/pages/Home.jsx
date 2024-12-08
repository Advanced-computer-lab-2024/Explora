import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(false); // Track the loading state
  const id = '67322cdfa472e2e7d22de84a';

  const handleClick = async () => {
    try {
      setLoading(true); // Start loading
      const frontendUrl = window.location.origin; // Dynamically get the frontend URL
      console.log("Frontend URL:", frontendUrl); // Log for debugging

      // Send request to backend to create Stripe session
      const response = await axios.post("http://localhost:4000/orders/payment/", {
        userId: id, // Replace with dynamic touristId as needed
        frontendUrl,
      });

      const sessionUrl = response.data.url; // Extract the Stripe session URL
      window.location.href = sessionUrl; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to redirect to Stripe. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Redirecting..." : "Pay with Stripe"}
      </button>
    </div>
  );
};

export default Home;
