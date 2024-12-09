import React, { useState, useEffect } from 'react'; // Add useState and useEffect imports
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; // Importing the bell icon
import axios from 'axios';

export default function Sellerhome() {
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(0); // State for unread notifications
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    // If userId or token is missing, don't make the API request
    if (!userId || !token) {
      console.error('User ID or token is missing.');
      return;
    }

    // Fetch notifications or any data that will update the unread count
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/anotifications2/anotifications2?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        // Filter unread notifications and set the unread count
        const unreadCount = data.filter(
          (notification) => !notification.read
        ).length;
        setUnreadNotifications(unreadCount);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId, token]); // Dependencies to re-fetch if either userId or token changes

  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      {/* Notification Bell Icon with Call to Action */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          cursor: 'pointer',
          fontSize: '24px',
          color: unreadNotifications > 0 ? 'red' : 'black', // Turn bell red if there are unread notifications
          transition: 'color 0.3s',
          padding: '5px',
          borderRadius: '50%',
        }}
        title="Click to view notifications" // Tooltip as a call to action
        onClick={() => navigate('/sellnot')} // Navigate to notifications page
      >
        <FaBell />
        {unreadNotifications > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 8px',
              fontSize: '12px',
            }}
          >
            {unreadNotifications}
          </span>
        )}
      </div>

      {/* Navigation buttons */}
      <button onClick={() => navigate('/create-seller')}>Create Profile</button>
      <button onClick={() => navigate('/view-profiles')}>View Profiles</button> {/* Added navigation here */}
      <button onClick={() => navigate('/update-seller')}>Update my profile</button>
      <button onClick={() => navigate('/product-list-seller')}>View Products</button>
      <button onClick={() => navigate('/request-account-deletion')}>Request Account Deletion</button>
      <button onClick={() => navigate('/change-password')}>Change My Password</button>
      <button onClick={() => navigate('/upload-image')}>Upload Logo</button>
      <button onClick={() => navigate('/sellersales')}>View sales</button>
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}
      >
        Go Back
      </button>
    </header>
  );
}
