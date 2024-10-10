// src/components/ItineraryList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/tour_guide_itinerary', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokesn')}`, // Use the saved token
          },
        });
        setItineraries(response.data);
      } catch (err) {
        setError('Failed to fetch itineraries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="itinerary-list">
      <h1>Your Itineraries</h1>
      <ul>
        {itineraries.map(itinerary => (
          <li key={itinerary._id} className="itinerary-item">
            <h2>{itinerary.title}</h2>
            <p>{itinerary.description}</p>
            <p><strong>Locations:</strong> {itinerary.locations}</p>
            <p><strong>Duration:</strong> {itinerary.duration} days</p>
            <p><strong>Language:</strong> {itinerary.language}</p>
            <p><strong>Price:</strong> ${itinerary.price}</p>
            <p><strong>Available Dates:</strong> {itinerary.availableDates.join(', ')}</p>
            <p><strong>Pickup Location:</strong> {itinerary.pickupLocation}</p>
            <p><strong>Dropoff Location:</strong> {itinerary.dropoffLocation}</p>
            {/* Include any other itinerary details you want to show */}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .itinerary-list {
          max-width: 800px; /* Maximum width of the container */
          margin: 0 auto; /* Center the container */
          padding: 20px; /* Add padding around the container */
          background-color: #fff; /* Background color for the container */
          border-radius: 8px; /* Rounded corners */
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
        }

        h1 {
          text-align: center; /* Center the heading */
          color: #333; /* Heading color */
        }

        ul {
          list-style-type: none; /* Remove bullet points */
          padding: 0; /* Remove default padding */
        }

        .itinerary-item {
          background: #f9f9f9; /* Light background for each item */
          margin: 15px 0; /* Margin between items */
          padding: 15px; /* Padding inside each item */
          border-radius: 5px; /* Rounded corners for items */
          border-left: 5px solid #007bff; /* Blue left border */
          transition: transform 0.2s; /* Smooth transition for hover effect */
        }

        .itinerary-item:hover {
          transform: scale(1.02); /* Slightly enlarge on hover */
        }

        strong {
          color: #555; /* Darker color for labels */
        }
      `}</style>
    </div>
  );
};

export default ItineraryList;
