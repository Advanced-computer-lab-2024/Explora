import React, { useState, useEffect } from "react";
import axios from "axios"; // For API requests

const UpcomingBookedEvents = () => {
  const [upcomingActivities, setUpcomingActivities] = useState([]); // Upcoming activities
  const [upcomingItineraries, setUpcomingItineraries] = useState([]); // Upcoming itineraries
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [touristId, setTouristId] = useState(localStorage.getItem('userId')); // Dynamically set from localStorage

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const touristId = localStorage.getItem("userId");
      if (!touristId) {
        setError("User not logged in. Please log in first.");
        setLoading(false);
        return;
      }
      try {
        // Fetch upcoming activities
        const activitiesResponse = await axios.get(
          `http://localhost:4000/api/activity/upcomingBookedActivities/${touristId}`
        );
        setUpcomingActivities(activitiesResponse.data);

        // Fetch upcoming itineraries
        const itinerariesResponse = await axios.get(
          `http://localhost:4000/api/tour_guide_itinerary/upcomingBookedItineraries/${touristId}`
        );
        setUpcomingItineraries(itinerariesResponse.data.futureItineraries);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const handleReturnActivity = async (eventType, eventId) => {
    try {
      console.log('Sending request to cancel activity:', { activityId: eventId, touristId });
      const response = await axios.delete('http://localhost:4000/api/activity/cancelActivity', {
        data: { activityId: eventId, touristId }
      });
      alert(response.data.message);
      setUpcomingActivities(upcomingActivities.filter(activity => activity._id !== eventId));
    } catch (err) {
      console.error('Error canceling activity:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to return activity');
    }
  };

  const handleReturnItin = async (eventType, eventId) => {
    try {
      const response = await axios.delete('http://localhost:4000/api/tour_guide_itinerary/return', {
        data: { itineraryId: eventId, touristId }
      });
      alert(response.data.message);
      // Optionally, refresh the list of itineraries
      setUpcomingItineraries(upcomingItineraries.filter(itinerary => itinerary._id !== eventId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to return itinerary');
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error state

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Upcoming Booked Events</h1>

      <div style={styles.splitContainer}>
        {/* Left Column: Activities */}
        <div style={styles.column}>
        <h2 style={styles.columnTitle}>Upcoming Paid Activities</h2>
        {upcomingActivities.length > 0 ? (
          upcomingActivities.map((activity, index) => (
            <div key={activity.id || index} style={styles.card}>
              <h3>{activity.name}</h3>
              <p>
                <strong>Date:</strong> {activity.date}
              </p>
              <p>
                <strong>Location:</strong> {activity.location}
              </p>
              <p>
                <strong>Price:</strong> {activity.price}
              </p>
              <p>
                <strong>Rating:</strong> {activity.rating}/10
              </p>
              <button
                onClick={() => handleReturnActivity("Activity", activity._id)}
                style={styles.returnButton}
              >
                Return Activity
              </button>
            </div>
          ))
        ) : (
          <p>No upcoming activities found.</p>
        )}
      </div>

        {/* Right Column: Itineraries */}
        <div style={styles.column}>
          <h2 style={styles.columnTitle}>Upcoming Paid Itineraries</h2>
          {upcomingItineraries.length > 0 ? (
            upcomingItineraries.map((itinerary, index) => (
              <div key={itinerary._id || index} style={styles.card}>
                <h3>{itinerary.tourGuideName}</h3>
                <p>
                  <strong>Date:</strong> {itinerary.availableDates[0]}
                </p>
                <p>
                  <strong>Locations:</strong> {itinerary.locations}
                </p>
                <p>
                  <strong>Price:</strong> {itinerary.price}
                </p>
                <p>
                  <strong>Rating:</strong> {itinerary.rating}/10
                </p>
                <button
                  onClick={() => handleReturnItin("Itinerary", itinerary._id)}
                  style={styles.returnButton}
                >
                  Return Itinerary
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming itineraries found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Styling
const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
  },
  splitContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  column: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "15px",
  },
  columnTitle: {
    fontSize: "22px",
    marginBottom: "15px",
    color: "#007bff",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  returnButton: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UpcomingBookedEvents;