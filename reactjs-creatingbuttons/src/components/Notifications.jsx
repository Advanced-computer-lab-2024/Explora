import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications'); // Update the endpoint if necessary
        setNotifications(response.data);
      } catch (err) {
        setError('Failed to load notifications.');
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notifications</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} style={{ marginBottom: '10px' }}>
            {notification.message} {notification.read ? '(Read)' : '(Unread)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
