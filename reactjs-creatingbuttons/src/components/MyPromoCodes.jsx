import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests

const MyPromocodes = () => {
  const [promocodes, setPromocodes] = useState([]); // State to store promocodes
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPromocodes = async () => {
      const touristId = localStorage.getItem("userId");
      if (!touristId) {
        setError("User not logged in. Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/promoCode/${touristId}`);
        setPromocodes(response.data.touristPromoCodes);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchPromocodes();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error state

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>My Promocodes</h1>

      {promocodes.length > 0 ? (
        <div style={styles.promocodeList}>
          {promocodes.map((promo) => (
            <div key={promo._id} style={styles.promocodeCard}>
              <h3 style={styles.promocodeCode}>{promo.code}</h3>
              <p>
                <strong>Discount:</strong> {promo.discount * 100}%
              </p>
              <p>
                <strong>Expiry Date:</strong> {new Date(promo.expiryDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noPromocodesMessage}>No Available Promocodes</p>
      )}
    </div>
  );
};

// Styling
const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
  },
  promocodeList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  promocodeCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  promocodeCode: {
    fontSize: "20px",
    color: "#007bff",
    marginBottom: "10px",
  },
  noPromocodesMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "#888",
  },
};

export default MyPromocodes;