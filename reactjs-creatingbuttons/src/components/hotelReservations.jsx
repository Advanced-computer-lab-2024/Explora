import React, { useEffect, useState } from 'react';

export default function hotelReservations() {
  const [hotelReservations, setHotelReservations] = useState([]);
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage

  useEffect(() => {
    // Fetch data for hotel reservations when the component mounts
    const fetchHotelReservations = async () => {
      const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
      if (!touristId) {
        setErrorMessage('User not logged in. Please log in first.');
        return;
      }
      try {
        const response = await fetch('http://localhost:4000/hotels/reservations/${touristId}'); // Use your specific user ID here
        const data = await response.json();

        console.log('Hotel Reservations:', data); // Log the response to check its structure

        if (data && data.reservations && Array.isArray(data.reservations)) {
          setHotelReservations(data.reservations);  // Update state with reservations data
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching hotel reservations:', error);
      }
    };

    fetchHotelReservations();
  }, []);

  return (
    <div>
      <h1>My Hotel Reservations</h1>
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