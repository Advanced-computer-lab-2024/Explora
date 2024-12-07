import React, { useState, useEffect } from "react";

const PastBookedEvents = () => {
  const [pastActivities, setPastActivities] = useState([]); // Activities data
  const [pastItineraries, setPastItineraries] = useState([]); // Itineraries data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Simulated data fetch for past activities
    const fetchPastEvents = () => {
      setTimeout(() => {
        // Simulated API response for activities
        const activitiesData = [
          {
            id: "activity1",
            name: "Mountain Hike Adventure",
            date: "2024-11-12",
            location: "Mountain View",
            price: "$100",
            rating: 8,
          },
          {
            id: "activity2",
            name: "Beach Volleyball",
            date: "2024-11-20",
            location: "Sunny Beach",
            price: "$50",
            rating: 9,
          },
        ];

        // Simulated API response for itineraries
        const itinerariesData = [
          {
            id: "itinerary1",
            name: "European Tour",
            date: "2024-10-01",
            destinations: "Paris, Rome, Berlin",
            price: "$1200",
            rating: 7,
          },
          {
            id: "itinerary2",
            name: "Asian Explorer",
            date: "2024-09-15",
            destinations: "Tokyo, Bangkok, Seoul",
            price: "$1500",
            rating: 9,
          },
        ];

        setPastActivities(activitiesData);
        setPastItineraries(itinerariesData);
        setLoading(false);
      }, 1500); // Simulate 1.5s fetch delay
    };

    fetchPastEvents();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error state

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Past Booked Events</h1>

      <div style={styles.splitContainer}>
        {/* Left Column: Activities */}
        <div style={styles.column}>
          <h2 style={styles.columnTitle}>Past Paid Activities</h2>
          {pastActivities.map((activity) => (
            <div key={activity.id} style={styles.card}>
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
            </div>
          ))}
        </div>

        {/* Right Column: Itineraries */}
        <div style={styles.column}>
          <h2 style={styles.columnTitle}>Past Paid Itineraries</h2>
          {pastItineraries.map((itinerary) => (
            <div key={itinerary.id} style={styles.card}>
              <h3>{itinerary.name}</h3>
              <p>
                <strong>Date:</strong> {itinerary.date}
              </p>
              <p>
                <strong>Destinations:</strong> {itinerary.destinations}
              </p>
              <p>
                <strong>Price:</strong> {itinerary.price}
              </p>
              <p>
                <strong>Rating:</strong> {itinerary.rating}/10
              </p>
            </div>
          ))}
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
};

export default PastBookedEvents;
