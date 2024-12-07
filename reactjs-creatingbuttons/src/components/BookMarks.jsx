import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bookmarks = () => {
  // const [touristId] = useState("674b64cbd03522fb24ac9d06"); // Hardcoded tourist ID

  const [bookmarks, setBookmarks] = useState({ activities: [], itineraries: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/tour_guide_itinerary/bookmark/${touristId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        setBookmarks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [touristId]);

  const handleDelete = async (id, type) => {
    try {
        // Send DELETE request to the backend
        const response = await axios.delete(
            `http://localhost:4000/api/tour_guide_itinerary/bookmark/${touristId}/${id}`
        );

        // Check if deletion was successful
        if (response.status === 200) {
            // Update local state if the backend deletion succeeds
            setBookmarks((prevBookmarks) => ({
                ...prevBookmarks,
                [type]: prevBookmarks[type].filter((item) => item._id !== id),
            }));
        }
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        alert("Failed to delete the bookmark. Please try again.");
    }
};

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h1>Bookmarks</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        {/* Activities */}
        <h2>Activities</h2>
        {bookmarks.activities.length > 0 ? (
          bookmarks.activities.map((activity) => (
            <div
              key={activity._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{activity.name}</h3>
              <p>{activity.location}</p>
              <p>
                {new Date(activity.date).toLocaleDateString()} at {activity.time}
              </p>
              <p>Price: ${activity.price}</p>
              <p>Rating: {activity.rating}/5</p>
              <button
                style={buttonStyle}
                onClick={() => handleDelete(activity._id, 'activities')}
              >
                Delete Bookmark
              </button>
            </div>
          ))
        ) : (
          <p>No bookmarked activities available.</p>
        )}

        {/* Itineraries */}
        <h2>Itineraries</h2>
        {bookmarks.itineraries.length > 0 ? (
          bookmarks.itineraries.map((itinerary) => (
            <div
              key={itinerary._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{itinerary.tourGuideName}'s Itinerary</h3>
              <p>Locations: {itinerary.locations}</p>
              <p>Duration: {itinerary.duration} hours</p>
              <p>Price: ${itinerary.price}</p>
              <button
                style={buttonStyle}
                onClick={() => handleDelete(itinerary._id, 'itineraries')}
              >
                Delete Bookmark
              </button>
            </div>
          ))
        ) : (
          <p>No bookmarked itineraries available.</p>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: '10px 0',
  padding: '8px 16px',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f44336',
  color: '#fff',
};

export default Bookmarks;
