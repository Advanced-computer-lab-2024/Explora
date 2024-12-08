import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import "./PromoCodeComponent.css";
import logo from '../assets/cropped_image.png';
import { useNavigate } from 'react-router-dom';
const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};

const PromoCodeComponent = () => {
  const navigate = useNavigate();

  const [promotionName, setPromotionName] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [promoCodes, setPromoCodes] = useState([]); // State to store promo codes
  const [message, setMessage] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [guideRatings, setGuideRatings] = useState({});
  const [guideComments, setGuideComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);
  const handleClosePromoModal = () => setShowPromoModal(false);

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
    <div>
           <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1px 5px',
          backgroundColor: '#008080',
          color: 'white',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          justifyContent: 'space-between',
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/acc-settings" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/flagged-events" style={{ color: 'white', textDecoration: 'none' }}>Flag Event</a>
          

          <a href="/product-list" style={{ color: 'white', textDecoration: 'none' }}>Products</a>


        </div>

        {/* SVG Icon */}
        <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <svg
            onClick={toggleDropdown}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" fill="white" />
          </svg>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '80px',
                right: '0',
                backgroundColor: '#008080',
                color: 'white',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                width: '200px',
                padding: '10px 0',
                zIndex: 1000,
              }}
              onMouseEnter={handleMouseEnterHistory}
              onMouseLeave={handleMouseLeaveHistory}
            >
              <button
                onClick={() => navigate('/category-manager')}
                style={buttonStyle}
              >
                Manage Activities
              </button>
              <button
                onClick={() => navigate('/tag-manager')}
                style={buttonStyle}
              >
                Manage Prefrences
              </button>
              <a
                href="/history"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                Manage Accounts
              </a>

              <button
                onClick={() => navigate('/admin-documents')}
                style={buttonStyle}
              >
                View Uploaded Documents
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/admin-complaints')}
                style={buttonStyle}
              >
                View Complaints
              </button>
              <button
                onClick={() => navigate('/viewDeleteRequests')}
                style={buttonStyle}
              >
                View Delete Requests
              </button>
              <button
                onClick={() => navigate('/promo-code')}
                style={buttonStyle}
              >
                Create Promo Code
              </button>
            

              {isHistoryOptionsVisible && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '220px',
                    backgroundColor: '#008080',
                    color: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '200px',
                    padding: '10px 0',
                    zIndex: 1000,
                  }}
                >
                  <button
                    onClick={() => navigate('/admin-view-users')}
                    style={buttonStyle}
                  >
Delete Accounts                  </button>
                  <button
                    onClick={() => navigate('/login-tourism')}
                    style={buttonStyle}
                  >
Add Tourism Governor                  </button>
                  <button
                    onClick={() => navigate('/login-admin')}
                    style={buttonStyle}
                  >
Add Admin                  </button>
                  

                  
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <div style={{ marginTop: '80px' }}></div>
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
    </div>
  );
};

export default PromoCodeComponent;
