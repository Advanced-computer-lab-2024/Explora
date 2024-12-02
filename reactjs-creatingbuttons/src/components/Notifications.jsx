import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Event',
      name: 'Music Festival',
      description: 'Bookings are now open for the upcoming Music Festival!',
    },
    {
      id: 2,
      type: 'Itinerary',
      name: 'Weekend Getaway',
      description: 'The Weekend Getaway itinerary is now accepting reservations.',
    },
    {
      id: 3,
      type: 'Activity',
      name: 'Cooking Class',
      description: 'Sign up for the Italian Cooking Class. Limited spots available!',
    },
    {
      id: 4,
      type: 'Event',
      name: 'Art Exhibition',
      description: 'Art Exhibition tickets are now available for purchase.',
    },
  ]);

 
  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h1>Notifications</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9',
              position: 'relative',
            }}
          >
            <h3>{notification.type}: {notification.name}</h3>
            <p>{notification.description}</p>
            <button
              style={deleteButtonStyle}
              onClick={() => handleDelete(notification.id)}
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
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '5px 10px',
  fontSize: '12px',
  cursor: 'pointer',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#f44336',
  color: '#fff',
};

export default Notifications;
