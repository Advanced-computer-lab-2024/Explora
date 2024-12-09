import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Anotification() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/anotification/anotifications?userId=${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data); // Assuming response.data is the array of notifications
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (userId && token) {
      fetchNotifications();
    }
  }, [userId, token]);

  const markAsRead = async (notificationId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/anotifications/${notificationId}/aread`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the state to reflect the change to 'read'
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, read: true }
              : notification
          )
        );
      } else {
        console.error('Failed to mark notification as read:', response);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f7f7f7' }}>
      <button
        style={backButtonStyle}
        onClick={() => navigate('/company')} // Navigate back to To-Do page
      >
        Back
      </button>

      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Notifications</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification._id} // Use _id for uniqueness
              style={{
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: notification.read ? '#e0e0e0' : '#fff',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p>{notification.message}</p>
              <span
                style={{
                  fontSize: '12px',
                  color: notification.read ? '#4caf50' : '#f44336',
                }}
              >
                {notification.read ? 'Read' : 'Unread'}
              </span>
              <button
                style={{ marginLeft: '10px' }}
                onClick={() => markAsRead(notification._id)} // Use _id here
              >
                Mark as Read
              </button>
            </li>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </ul>
    </div>
  );
}

const backButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#6200ea',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  marginBottom: '20px',
};

export default Anotification;
