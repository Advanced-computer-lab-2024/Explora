import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import "./PromoCodeComponent.css";

const PromoCodeComponent = () => {
  const [promotionName, setPromotionName] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [promoCodes, setPromoCodes] = useState([]); // State to store promo codes

  // Fetch all promo codes
  const fetchPromoCodes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/promoCode/");
      setPromoCodes(response.data.adminPromoCodes); // Access the array of promo codes
    } catch (error) {
      console.error("Error fetching promo codes:", error);
      alert("Failed to load promo codes. Please try again.");
    }
  };

  // Fetch promo codes on component mount
  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const handleSave = async () => {
    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:4000/promoCode/admin/create", {
        code: promotionName,
        discount: parseFloat(discountValue), // Ensure discount is a number
      });

      // Handle success response
      alert("Promotion saved successfully!");
      console.log("Saved Promotion:", response.data);
      setPromotionName("");
      setDiscountValue("");

      // Refresh promo codes after saving
      fetchPromoCodes();
    } catch (error) {
      // Handle error response
      console.error("Error saving promotion:", error);
      alert(error.response?.data?.message || "Failed to save promotion. Please try again.");
    }
  };

  return (
    <div className="promo-code-component">
      <div className="promo-code-card">
        <form>
          <div className="form-group">
            <label>Promotion Name</label>
            <input
              type="text"
              value={promotionName}
              onChange={(e) => setPromotionName(e.target.value)}
              placeholder="Enter promotion name"
            />
          </div>
          <div className="form-group">
            <label>Promotion Value</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="Enter promotion value (0 to 1)"
            />
          </div>
          <div className="action-buttons">
            <button
              type="button"
              className="save-btn"
              onClick={handleSave}
            >
              Save Promotion
            </button>
          </div>
        </form>
      </div>

      {/* Display promo codes */}
      <div className="promo-code-list">
        <h3>Existing Promo Codes</h3>
        <div className="promo-cards-container">
          {promoCodes.length > 0 ? (
            promoCodes.map((promo) => (
              <div className="promo-card" key={promo._id}>
                <p>{promo.code}</p>
              </div>
            ))
          ) : (
            <p>No promo codes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoCodeComponent;
