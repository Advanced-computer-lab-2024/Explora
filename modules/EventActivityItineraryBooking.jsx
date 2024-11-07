import React, { useState } from 'react';

const EventActivityItineraryBooking = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);

  // Sample data for demonstration (replace this with API data in the future)
  const events = [
    { id: 1, name: 'Concert', location: 'New York', date: '2024-11-09' },
    { id: 2, name: 'Art Exhibition', location: 'Los Angeles', date: '2024-12-15' },
    { id: 3, name: 'Historical Tour', location: 'Chicago', date: '2024-12-20' },
  ];

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Filter events based on name, location, and date
    const results = events.filter(
      (eventData) =>
        eventData.name.toLowerCase().includes(name.toLowerCase()) &&
        eventData.location.toLowerCase().includes(location.toLowerCase()) &&
        (!date || eventData.date === date) // Check if date matches or is empty
    );
    setSearchResults(results);
  };

  // Select an event
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  // Confirm booking for the selected event
  const handleConfirmBooking = () => {
    if (selectedEvent) {
      setBookedEvents([...bookedEvents, selectedEvent]);
      setSelectedEvent(null); // Clear selection after booking
      setSearchResults([]); // Clear search results
      setName(''); // Reset search fields
      setLocation('');
      setDate('');
    }
  };

  // Handle cancellation with 48-hour restriction
  const handleCancelBooking = (eventId) => {
    const event = bookedEvents.find(event => event.id === eventId);
    const eventDate = new Date(event.date);
    const currentDate = new Date();

    // Calculate the difference in hours
    const hoursDifference = (eventDate - currentDate) / (1000 * 60 * 60);

    if (hoursDifference <= 48) {
      alert("Tickets cannot be canceled within 48 hours of the event.");
      return;
    }

    // If the condition is met, proceed to cancel the booking
    const updatedBookings = bookedEvents.filter(event => event.id !== eventId);
    setBookedEvents(updatedBookings);
  };

  // Share booked item
  const handleShare = (eventData, method) => {
    const shareText = `Check out this event/activity/itinerary: ${eventData.name} in ${eventData.location} on ${eventData.date}`;

    if (method === 'copy') {
      navigator.clipboard.writeText(shareText);
      alert("Link copied to clipboard!");
    } else if (method === 'email') {
      const emailBody = encodeURIComponent(shareText);
      window.location.href = `mailto:?subject=Check out this event&body=${emailBody}`;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Event/Activity/Itinerary Booking</h3>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <label>
          Name:
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>Search</button>
      </form>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h4>Search Results:</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {searchResults.map((eventData) => (
              <li key={eventData.id} style={listItemStyle}>
                {eventData.name} - {eventData.location} on {eventData.date}
                <button onClick={() => handleEventSelect(eventData)} style={buttonStyle}>
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected Event Details */}
      {selectedEvent && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected Event/Activity/Itinerary:</h4>
          <p>
            {selectedEvent.name} - {selectedEvent.location} on {selectedEvent.date}
          </p>
          <button onClick={handleConfirmBooking} style={buttonStyle}>Confirm Booking</button>
        </div>
      )}

      {/* Booked Events List */}
      {bookedEvents.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Booked Events/Activities/Itineraries:</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {bookedEvents.map((eventData) => (
              <li key={eventData.id} style={listItemStyle}>
                {eventData.name} - {eventData.location} on {eventData.date} - Booked
                <button onClick={() => handleCancelBooking(eventData.id)} style={buttonStyle}>
                  Cancel Booking
                </button>
                <button onClick={() => handleShare(eventData, 'copy')} style={buttonStyle}>
                  Share via Copy Link
                </button>
                <button onClick={() => handleShare(eventData, 'email')} style={buttonStyle}>
                  Share via Email
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Styles for buttons, inputs, and list items
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
  marginBottom: '10px',
  padding: '5px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const listItemStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

export default EventActivityItineraryBooking;
