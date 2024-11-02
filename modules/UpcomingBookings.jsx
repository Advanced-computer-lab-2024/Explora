import React, { useState } from 'react';

const UpcomingBookings = () => {
  // Sample data for upcoming bookings
  const [bookings, setBookings] = useState([
    { id: 1, name: 'Trip to Cairo', date: '2024-12-01', destination: 'Cairo, Egypt', cancellable: true },
    { id: 2, name: 'Beach Vacation in Sharm El Sheikh', date: '2024-12-15', destination: 'Sharm El Sheikh, Egypt', cancellable: true },
    // Add more bookings as needed
  ]);

  // Function to handle cancellation
  const handleCancelBooking = (id) => {
    // Filter out the booking that was canceled
    const updatedBookings = bookings.filter(booking => booking.id !== id);
    setBookings(updatedBookings);
    console.log(`Booking with ID ${id} has been canceled.`);
  };

  // Check if the booking is cancellable based on the date (48-hour window)
  const isCancellable = (date) => {
    const bookingDate = new Date(date);
    const currentDate = new Date();
    const hoursDifference = (bookingDate - currentDate) / (1000 * 60 * 60);
    return hoursDifference > 48;
  };

  return (
    <div>
      <h2>Upcoming Bookings</h2>
      {bookings.map(booking => (
        <div key={booking.id} style={bookingStyle}>
          <h3>{booking.name}</h3>
          <p>Date: {booking.date}</p>
          <p>Destination: {booking.destination}</p>

          {/* Book Flight Button */}
          <a
            href="https://www.expedia.com/" // Replace with actual flight booking URL if needed
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={buttonStyle}>Book a Flight</button>
          </a>

          {/* Book Hotel Button */}
          <a
            href="https://www.booking.com/" // Replace with actual hotel booking URL if needed
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={buttonStyle}>Book a Hotel</button>
          </a>

          {/* Cancel Booking Button */}
          {isCancellable(booking.date) && (
            <button
              onClick={() => handleCancelBooking(booking.id)}
              style={cancelButtonStyle}
            >
              Cancel Booking
            </button>
          )}
          {!isCancellable(booking.date) && (
            <p style={{ color: 'red' }}>Cancellation not allowed within 48 hours of the event.</p>
          )}
        </div>
      ))}
    </div>
  );
};

// Styling for the booking containers
const bookingStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px'
};

// Styling for the buttons
const buttonStyle = {
  padding: '5px 10px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  margin: '5px'
};

// Styling for the cancel button
const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#f8d7da',
  color: '#721c24',
  border: '1px solid #f5c6cb'
};

export default UpcomingBookings;
