import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function HotelReservations() {
  const [hotelReservations, setHotelReservations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');  // Added error message state
  const touristId = localStorage.getItem('userId') || ''; // Dynamically set from localStorage
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Fetch data for hotel reservations when the component mounts
    const fetchHotelReservations = async () => {
      if (!touristId) {
        setErrorMessage('User not logged in. Please log in first.');
        return;
      }
      try {
        const response = await fetch(`http://localhost:4000/hotels/reservations/${touristId}`); // Use template literals to correctly insert touristId
        const data = await response.json();

        console.log('Hotel Reservations:', data); // Log the response to check its structure

        if (data && data.reservations && Array.isArray(data.reservations)) {
          setHotelReservations(data.reservations);  // Update state with reservations data
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching hotel reservations:', error);
        setErrorMessage('Error fetching hotel reservations.');
      }
    };

    fetchHotelReservations();
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

      <h1>My Hotel Reservations</h1>
      
      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 

      {hotelReservations.length > 0 ? (
        <ul>
          {hotelReservations.map((reservation) => {
            const { cityCode, checkInDate, checkOutDate, hotelName, reservationNumber, price } = reservation;

            // Format the check-in and check-out dates
            const formattedCheckInDate = checkInDate ? new Date(checkInDate).toLocaleDateString() : 'Check-in date not available';
            const formattedCheckOutDate = checkOutDate ? new Date(checkOutDate).toLocaleDateString() : 'Check-out date not available';

            return (
              <li key={reservation._id}>
                <h2>{hotelName}</h2>
                <p>Location: {cityCode}</p>  {/* City code displayed as location */}
                <p>Check-in Date: {formattedCheckInDate}</p>
                <p>Check-out Date: {formattedCheckOutDate}</p>
                <p>Reservation Number: {reservationNumber}</p>
                <p>Price: ${price}</p> {/* Assuming price is in dollars, adjust if needed */}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No hotel reservations found.</p>
      )}
    </div>
  );
}
