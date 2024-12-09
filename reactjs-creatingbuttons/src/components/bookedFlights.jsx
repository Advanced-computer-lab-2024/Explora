import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function BookedFlights() {
  const [bookedFlights, setBookedFlights] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');  // Added error message state
  const touristId = localStorage.getItem('userId') || ''; // Dynamically set from localStorage
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Fetch data for booked flights when the component mounts
    const fetchBookedFlights = async () => {
      if (!touristId) {
        setErrorMessage('User not logged in. Please log in first.');
        return;
      }
      try {
        const response = await fetch(`http://localhost:4000/flights/user-flights/${touristId}`); // Use your specific user ID here
        const data = await response.json();

        console.log('Booked Flights:', data); // Log the response to check its structure

        if (Array.isArray(data.flights)) {
          setBookedFlights(data.flights);  // Update state if the data contains flights array
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching booked flights:', error);
        setErrorMessage('Error fetching booked flights.');
      }
    };

    fetchBookedFlights();
  }, [touristId]);  // Add touristId to dependency array

  return (
    <div>
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)} // Use navigate to go back
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Back
      </button>

      <h1>My Booked Flights</h1>
      
      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 

      {bookedFlights.length > 0 ? (
        <ul>
          {bookedFlights.map((flight) => {
            const {
              origin,
              destination,
              date,
              flightNumber,
              time,
              duration,
              arrivalTime,
              price
            } = flight;

            // Format the date and times
            const formattedDate = date ? new Date(date).toLocaleDateString() : 'Date not available';
            const formattedTime = time ? new Date(time).toLocaleTimeString() : 'Time not available';
            const formattedArrivalTime = arrivalTime ? new Date(arrivalTime).toLocaleTimeString() : 'Arrival time not available';

            return (
              <li key={flight._id}>
                <h2>{flightNumber}</h2>
                <p>From: {origin} To: {destination}</p>
                <p>Date: {formattedDate}</p>
                <p>Flight Time: {formattedTime}</p>
                <p>Duration: {duration}</p>
                <p>Arrival Time: {formattedArrivalTime}</p>
                <p>Price: ${price}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No booked flights found.</p>
      )}
    </div>
  );
}
