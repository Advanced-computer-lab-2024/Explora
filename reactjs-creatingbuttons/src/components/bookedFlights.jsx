import React, { useEffect, useState } from 'react';

export default function bookedFlights() {
  const [bookedFlights, setBookedFlights] = useState([]);
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage

  useEffect(() => {
    // Fetch data for booked flights when the component mounts
    const fetchBookedFlights = async () => {
      const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
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
      }
    };

    fetchBookedFlights();
  }, []);

  return (
    <div>
      <h1>My Booked Flights</h1>
      {bookedFlights.length > 0 ? (
        <ul>
          {bookedFlights.map((flight) => {
            // Destructure the flight object
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