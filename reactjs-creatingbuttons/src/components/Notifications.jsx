import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [touristId] = useState("674b64cbd03522fb24ac9d06"); // Replace with dynamic ID as needed
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/tour_guide_itinerary/notification/${touristId}`
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [touristId]);

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the backend API
      await axios.delete(`http://localhost:4000/api/tour_guide_itinerary/notification/${id}`);
  
      // If successful, filter the notification out of the state
      setNotifications(notifications.filter((notification) => notification._id !== id));
      
      alert("Notification deleted successfully.");
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("Failed to delete notification.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h1>Notifications</h1>
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
        {notifications.map((notification) => (
          <div
            key={notification._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
              position: "relative",
            }}
          >
            <h3>{notification.event}</h3>
            <p>{notification.message}</p>
            <p>
              <small>
                Created At: {new Date(notification.createdAt).toLocaleString()}
              </small>
            </p>
            <button
              style={deleteButtonStyle}
              onClick={() => handleDelete(notification._id)}
            >
              X
            </button>
          </div>
        ))}
        {notifications.length === 0 && <p>No notifications available.</p>}
      </div>
    </div>
  );
};

const deleteButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "5px 10px",
  fontSize: "12px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#f44336",
  color: "#fff",
};

export default Notifications;
