import React, { useState, useEffect } from "react";

const PastBookedEvents = () => {
    const [pastActivities, setPastActivities] = useState([]);
    const [pastItineraries, setPastItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage

    useEffect(() => {
        const fetchPastEvents = async () => {
            const touristId = localStorage.getItem("userId");
            if (!touristId) {
                setError("User not logged in. Please log in first.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // Fetch past activities
                const activitiesResponse = await fetch(
                    `http://localhost:4000/api/activity/pastBookedActivities/${touristId}`
                );
                const activitiesData = await activitiesResponse.json();

                // Fetch past itineraries
                const itinerariesResponse = await fetch(
                    `http://localhost:4000/api/tour_guide_itinerary/pastBookedItineraries/${touristId}`
                );
                const itinerariesData = await itinerariesResponse.json();

                // Debugging response
                console.log("Past Itineraries Data:", itinerariesData);

                // Update state
                setPastActivities(Array.isArray(activitiesData) ? activitiesData : []);
                setPastItineraries(Array.isArray(itinerariesData.pastItineraries) ? itinerariesData.pastItineraries : []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
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
                    <h2 style={styles.columnTitle}>Past Activities</h2>
                    {pastActivities.map((activity, index) => (
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
                        </div>
                    ))}
                </div>

                {/* Right Column: Itineraries */}
                <div style={styles.column}>
                    <h2 style={styles.columnTitle}>Past Itineraries</h2>
                    {pastItineraries.map((itinerary, index) => (
                        <div key={itinerary._id || index} style={styles.card}>
                            <h3>{itinerary.tourGuideName}</h3>
                            <p>
                                <strong>Destinations:</strong> {itinerary.locations}
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