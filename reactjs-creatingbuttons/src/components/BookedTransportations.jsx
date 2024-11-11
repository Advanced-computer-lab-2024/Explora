import React, { useEffect, useState } from 'react';

export default function BookedTransportations() {
  const [bookedTransportations, setBookedTransportations] = useState([]);

  useEffect(() => {
    // Fetch data for booked transportations when the component mounts
    const fetchBookedTransportations = async () => {
      try {
        const response = await fetch(`http://localhost:4000/transportationBook/67322cdfa472e2e7d22de84a`); // Use your specific user ID here
        const data = await response.json();
        
        console.log('Booked Transportations:', data); // Log the response to check its structure

        if (Array.isArray(data)) {
          setBookedTransportations(data);  // Update state if the data is an array
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching booked transportations:', error);
      }
    };

    fetchBookedTransportations();
  }, []);

  return (
    <div>
      <h1>My Booked Transportations</h1>
      {bookedTransportations.length > 0 ? (
        <ul>
          {bookedTransportations.map((transportation) => {
            // Destructure the transportation object
            const { transportation: details } = transportation;
            const formattedDate = details.date ? new Date(details.date).toLocaleDateString() : 'Date not available';
            
            return (
              <li key={transportation._id}>
                <h2>{details.method}</h2>
                <p>From: {details.origin} To: {details.destination}</p>
                <p>Date: {formattedDate}</p>
                <p>Price: {details.currency} {details.price}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No booked transportations found.</p>
      )}
    </div>
  );
}
