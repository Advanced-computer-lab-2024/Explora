import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/notifications/notifications?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
        `http://localhost:4000/api/notifications/${notificationId}/read`,
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
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => navigate('/to-do')}>
        Back
      </button>

      <h1 style={titleStyle}>Notifications</h1>
      <ul style={listStyle}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification._id}
              style={{
                ...notificationItemStyle,
                backgroundColor: notification.read ? '#f5f5f5' : '#ffffff',
              }}
            >
              <p style={messageStyle}>{notification.message}</p>
              <span
                style={{
                  ...statusStyle,
                  color: notification.read ? '#008080' : '#f44336',
                }}
              >
                {notification.read ? 'Read' : 'Unread'}
              </span>
              {!notification.read && (
                <button
                  style={markAsReadButtonStyle}
                  onClick={() => markAsRead(notification._id)}
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))
        ) : (
          <p style={noNotificationsStyle}>No notifications available.</p>
        )}
      </ul>
    </div>
  );
}

// Styles
const pageStyle = {
  padding: '20px',
  backgroundColor: '#f0f0f0',
  fontFamily: 'Arial, sans-serif',
};

const backButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#008080',
  color: '#ffffff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  marginBottom: '20px',
  transition: 'background-color 0.3s',
};

const titleStyle = {
  textAlign: 'center',
  margin: '20px 0',
  color: '#333333',
};

const listStyle = {
  listStyleType: 'none',
  padding: '0',
};

const notificationItemStyle = {
  padding: '15px',
  marginBottom: '10px',
  border: '1px solid #dcdcdc',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const messageStyle = {
  margin: '0 0 10px',
  fontSize: '16px',
  color: '#333333',
};

const statusStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
};

const markAsReadButtonStyle = {
  marginLeft: '10px',
  padding: '6px 12px',
  backgroundColor: '#008080',
  color: '#ffffff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '14px',
  cursor: 'pointer',
};

const noNotificationsStyle = {
  textAlign: 'center',
  fontSize: '16px',
  color: '#666666',
};

export default NotificationsPage;
