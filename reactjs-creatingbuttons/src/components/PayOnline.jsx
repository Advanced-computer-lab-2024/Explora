import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PayOnline = () => {
  const [selection, setSelection] = useState(""); // User selection: activity, itinerary, or event
  const [items, setItems] = useState([]); // List of items to display
  const [selectedItem, setSelectedItem] = useState(null); // Currently selected item for payment
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle category selection (Activity, Itinerary, or Event)
  const handleSelectionChange = (e) => {
    const category = e.target.value;
    setSelection(category);

    // Simulate API call with mock data
    const mockData = {
      activities: [
        { id: 1, name: "Snorkeling Adventure", price: 50 },
        { id: 2, name: "City Walking Tour", price: 30 },
      ],
      itineraries: [
        { id: 3, name: "3-Day Island Tour", price: 200 },
        { id: 4, name: "Historical Sites Itinerary", price: 150 },
      ],
      events: [
        { id: 5, name: "Music Festival", price: 100 },
        { id: 6, name: "Art Exhibition", price: 75 },
      ],
    };

    setItems(mockData[category] || []); // Populate items based on selected category
  };

  // Handle item selection and open payment modal
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsPaymentModalOpen(true);
  };

  // Handle Wallet Payment
  const handleWalletPayment = () => {
    alert(`Payment via Wallet for ${selectedItem.name} successful!`);
    setIsPaymentModalOpen(false);
    setSelectedItem(null);
  };

  // Handle Credit Card Payment (Redirect to payment page)
  const handleCreditCardPayment = () => {
    navigate("/credit-card-payment", { state: { selectedItem } });
    setIsPaymentModalOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Pay Online</h3>

      {/* Dropdown to select category */}
      <label>
        Choose a category:
        <select
          value={selection}
          onChange={handleSelectionChange}
          style={inputStyle}
        >
          <option value="">Select</option>
          <option value="activities">Activities</option>
          <option value="itineraries">Itineraries</option>
          <option value="events">Events</option>
        </select>
      </label>

      {/* Display List of Items */}
      {items.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>
            Available {selection.charAt(0).toUpperCase() + selection.slice(1)}
          </h4>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={listItemStyle}>
                <p>{item.name}</p>
                <p>Price: {item.price} EUR</p>
                <button
                  onClick={() => handleItemSelect(item)}
                  style={buttonStyle}
                >
                  Pay
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedItem && (
        <div style={modalStyle}>
          <h4>Payment Options</h4>
          <p>
            You selected: <strong>{selectedItem.name}</strong>
          </p>
          <p>Amount to pay: {selectedItem.price} EUR</p>
          <button onClick={handleWalletPayment} style={buttonStyle}>
            Pay with Wallet
          </button>
          <button onClick={handleCreditCardPayment} style={buttonStyle}>
            Pay with Credit Card
          </button>
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            style={closeButtonStyle}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

// Styles
const buttonStyle = {
  margin: "10px",
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const closeButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#f44336",
};

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "8px",
  width: "100%",
};

const listItemStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  zIndex: 1000,
  textAlign: "center",
};

export default PayOnline;
