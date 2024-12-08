import React, { useState, useEffect } from "react";

const UpcomingBookedEvents = () => {
  const [upcomingActivities, setUpcomingActivities] = useState([]); // Upcoming activities
  const [upcomingItineraries, setUpcomingItineraries] = useState([]); // Upcoming itineraries
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Simulated data fetch for upcoming activities and itineraries
    const fetchUpcomingEvents = () => {
      setTimeout(() => {
        // Simulated API response for activities
        const activitiesData = [
          {
            id: "activity1",
            name: "City Walking Tour",
            date: "2024-12-15",
            location: "Downtown",
            price: "$30",
            rating: 8.5,
          },
          {
            id: "activity2",
            name: "Yoga Retreat",
            date: "2025-01-10",
            location: "Mountain Resort",
            price: "$150",
            rating: 9,
          },
        ];

        // Simulated API response for itineraries
        const itinerariesData = [
          {
            id: "itinerary1",
            name: "Scandinavian Tour",
            date: "2025-02-05",
            destinations: "Stockholm, Oslo, Copenhagen",
            price: "$1800",
            rating: 8.7,
          },
          {
            id: "itinerary2",
            name: "African Safari",
            date: "2025-03-12",
            destinations: "Kenya, Tanzania, South Africa",
            price: "$2500",
            rating: 9.5,
          },
        ];

        setUpcomingActivities(activitiesData);
        setUpcomingItineraries(itinerariesData);
        setLoading(false);
      }, 1500); // Simulate 1.5s fetch delay
    };

    fetchUpcomingEvents();
  }, []);

  const handleReturnEvent = (evenType, eventId) =>{
    //add return event logic here
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
          {upcomingActivities.map((activity) => (
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
              <button
              onClick={() => handleReturnEvent("Activity", activity.id)}
              style={styles.returnButton}
              >
                Return Event
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: Itineraries */}
        <div style={styles.column}>
          <h2 style={styles.columnTitle}>Upcoming Paid Itineraries</h2>
          {upcomingItineraries.map((itinerary) => (
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
              <button
              onClick={() => handleReturnEvent("Itinerary", itinerary.id)}
              style={styles.returnButton}
              >
                Return Event
              </button>
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
  returnButton: {
    marginTop:"10px",
    padding:"8px 15px",
    backgroundColor:"#dc3545",
    color:"fff",
    border:"none",
    borderRadius:"5px",
    cursor:"pointer",
  }
};

export default UpcomingBookedEvents;
