import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function BookedTransportations() {
  const [bookedTransportations, setBookedTransportations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');  // Added error message state
  const touristId = localStorage.getItem('userId') || ''; // Dynamically set from localStorage
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Fetch data for booked transportations when the component mounts
    const fetchBookedTransportations = async () => {
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
        setErrorMessage('Error fetching booked transportations.');
      }
    };

    fetchBookedTransportations();
  }, [touristId]);  // Add touristId to dependency array

  return (
    <div className="UpcomingItineraries">
      <button
        onClick={() => navigate(-1)} // Use navigate to go back
        style={{
          position: 'absolute',
          top: '10px',
          left: '20px',
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

      <h1 className="header">My Booked Transportations</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if any */}

      <div className="activities-list">
        {bookedTransportations.length > 0 ? (
          bookedTransportations.map((transportation) => {
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
