import React, { useEffect, useState } from 'react';

export default function hotelReservations() {
  const [hotelReservations, setHotelReservations] = useState([]);

  useEffect(() => {
    // Fetch data for hotel reservations when the component mounts
    const fetchHotelReservations = async () => {
      try {
        const response = await fetch('http://localhost:4000/hotels/reservations/672e97f48a225c52217e99ac'); // Use your specific user ID here
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