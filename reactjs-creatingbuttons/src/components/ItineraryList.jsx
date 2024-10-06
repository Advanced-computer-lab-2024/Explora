// src/components/ItineraryList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/tour_guide_itinerary', {
          headers: {
            'Authorization': `Bearer YOUR_TOKEN_HERE`, // Include your actual token
          },
        });
        setItineraries(response.data);
      } catch (err) {
        console.error("Error fetching itineraries:", err);
        setError('Failed to fetch itineraries.');
      }
    };

    fetchItineraries();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!itineraries.length) {
    return <div>No itineraries found.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Itineraries</h1>
      <ul style={styles.list}>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id} style={styles.listItem}>
            <h3 style={styles.location}>{itinerary.locations}</h3>
            <p style={styles.timeline}>{itinerary.timeline}</p>
            <p>Duration: {itinerary.duration} days</p>
            <p>Language: {itinerary.language}</p>
            {/* Add other itinerary details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  location: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  timeline: {
    fontStyle: 'italic',
    color: '#555',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: '20px 0',
  },
  noItineraries: {
    textAlign: 'center',
    fontSize: '1.2rem',
    margin: '20px 0',
  },
};

export default ItineraryList;
