import React, { useEffect, useState } from 'react';

export default function BookedTransportations() {
  const [bookedTransportations, setBookedTransportations] = useState([]);
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage

  useEffect(() => {
    // Fetch data for booked transportations when the component mounts
    const fetchBookedTransportations = async () => {
      const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
      if (!touristId) {
        setErrorMessage('User not logged in. Please log in first.');
        return;
      }
      try {
        const response = await fetch(`http://localhost:4000/transportationBook/${touristId}`); // Use your specific user ID here
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
    <div className="UpcomingItineraries">
      <h1 className="header">My Booked Transportations</h1>
      <div className="activities-list">
        {bookedTransportations.length > 0 ? (
          bookedTransportations.map((transportation) => {
            // Destructure the transportation object
            const { transportation: details, totalPrice } = transportation;
            const formattedDate = details.date ? new Date(details.date).toLocaleDateString() : 'Date not available';
            
            return (
              <div key={transportation._id} className="activity-card">
                <h2 className="activity-name">{details.method}</h2>
                <p className="activity-date">From: {details.origin} To: {details.destination}</p>
                <p className="activity-price">Date: {formattedDate}</p>
                <p className="activity-rating">Total Price: {details.currency} {totalPrice}</p>
              </div>
            );
          })
        ) : (
          <p>No booked transportations found.</p>
        )}
      </div>
    </div>
  );
}