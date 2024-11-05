import React, { useState } from 'react';

const UpcomingBookings = () => {
  // State to store upcoming bookings and itineraries
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  
  // State to control modal visibility
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // State to store booking form data
  const [newBooking, setNewBooking] = useState({
    type: '',
    details: '',
    origin: '',
    destination: '',
    city: '',
    date: '',
    status: 'Confirmed',
  });

  // Handle booking form changes
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  // Handle booking form submission
  const handleBookingSubmit = () => {
    const bookingDate = new Date(newBooking.date);
    const currentDate = new Date();

    // Check if the selected date is in the future
    if (bookingDate <= currentDate) {
      alert("Please select a future date for your booking.");
      return;
    }

    // Add booking if the date is valid
    setUpcomingBookings([...upcomingBookings, { ...newBooking, id: Date.now() }]);
    setIsFlightModalOpen(false);
    setIsHotelModalOpen(false);
    setIsTicketModalOpen(false);
    setNewBooking({ type: '', details: '', origin: '', destination: '', city: '', date: '', status: 'Confirmed' });
    console.log('Booking confirmed:', newBooking);
  };

  // Handle cancel booking with a 48-hour check for tickets
  const handleCancelBooking = (booking) => {
    const bookingDate = new Date(booking.date);
    const currentDate = new Date();

    // Calculate the difference in hours between the current date and booking date
    const hoursDifference = (bookingDate - currentDate) / (1000 * 60 * 60);

    if (booking.type === 'Ticket' && hoursDifference <= 48) {
      alert("Tickets cannot be canceled within 48 hours of the event.");
      return;
    }

    // If the condition is met or it's not a Ticket, proceed to cancel the booking
    const updatedBookings = upcomingBookings.map(b =>
      b.id === booking.id ? { ...b, status: 'Cancelled' } : b
    );
    setUpcomingBookings(updatedBookings);
    console.log(`Booking with ID ${booking.id} has been cancelled.`);
  };

  return (
    <div>
      <h2>Upcoming Bookings Page</h2>

      {/* List of upcoming bookings */}
      <div>
        <h3>Your Bookings</h3>
        {upcomingBookings.length > 0 ? (
          <ul>
            {upcomingBookings.map((booking) => (
              <li key={booking.id} style={{ marginBottom: '10px' }}>
                <strong>{booking.type}</strong>: {booking.details} on {booking.date} - Status: {booking.status}
                {booking.status !== 'Cancelled' && (
                  <button onClick={() => handleCancelBooking(booking)} style={buttonStyle}>
                    Cancel Booking
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming bookings</p>
        )}
      </div>

      {/* Buttons to open simulated booking modals */}
      <div>
        <h3>What do you want to book?</h3>
        <button onClick={() => setIsFlightModalOpen(true)} style={buttonStyle}>
          Book a Flight
        </button>
        <button onClick={() => setIsHotelModalOpen(true)} style={buttonStyle}>
          Book a Hotel
        </button>
        <button onClick={() => setIsTicketModalOpen(true)} style={buttonStyle}>
          Book a Ticket
        </button>
      </div>

      {/* Flight Booking Modal */}
      {isFlightModalOpen && (
        <div style={modalStyle}>
          <h3>Flight Booking</h3>
          <label>
            Origin:
            <input
              type="text"
              name="origin"
              value={newBooking.origin}
              onChange={handleBookingChange}
              placeholder="Enter origin city"
              style={inputStyle}
            />
          </label>
          <label>
            Destination:
            <input
              type="text"
              name="destination"
              value={newBooking.destination}
              onChange={handleBookingChange}
              placeholder="Enter destination city"
              style={inputStyle}
            />
          </label>
          <label>
            Flight:
            <input
              type="text"
              name="details"
              value={newBooking.details}
              onChange={handleBookingChange}
              placeholder="Search for flight details"
              style={inputStyle}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newBooking.date}
              onChange={handleBookingChange}
              style={inputStyle}
            />
          </label>
          <button onClick={handleBookingSubmit} style={buttonStyle}>
            Confirm Booking
          </button>
          <button onClick={() => setIsFlightModalOpen(false)} style={buttonStyle}>
            Close
          </button>
        </div>
      )}

      {/* Hotel Booking Modal */}
      {isHotelModalOpen && (
        <div style={modalStyle}>
          <h3>Hotel Booking</h3>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={newBooking.city}
              onChange={handleBookingChange}
              placeholder="Enter city name"
              style={inputStyle}
            />
          </label>
          <label>
            Hotel:
            <input
              type="text"
              name="details"
              value={newBooking.details}
              onChange={handleBookingChange}
              placeholder="Search for hotel name"
              style={inputStyle}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newBooking.date}
              onChange={handleBookingChange}
              style={inputStyle}
            />
          </label>
          <button onClick={handleBookingSubmit} style={buttonStyle}>
            Confirm Booking
          </button>
          <button onClick={() => setIsHotelModalOpen(false)} style={buttonStyle}>
            Close
          </button>
        </div>
      )}

      {/* Ticket Booking Modal */}
      {isTicketModalOpen && (
        <div style={modalStyle}>
          <h3>Ticket Booking</h3>
          <label>
            Event/Activity/Itinerary:
            <input
              type="text"
              name="details"
              value={newBooking.details}
              onChange={handleBookingChange}
              placeholder="Search for event or activity details"
              style={inputStyle}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newBooking.date}
              onChange={handleBookingChange}
              style={inputStyle}
            />
          </label>
          <button onClick={handleBookingSubmit} style={buttonStyle}>
            Confirm Booking
          </button>
          <button onClick={() => setIsTicketModalOpen(false)} style={buttonStyle}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

// Styles for buttons, inputs, and modal
const buttonStyle = {
  margin: '10px',
  padding: '5px 10px',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
};

const inputStyle = {
  display: 'block',
  margin: '10px 0',
  padding: '5px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  border: '2px solid #ccc',
  borderRadius: '10px',
  zIndex: 1000,
};

export default UpcomingBookings;
