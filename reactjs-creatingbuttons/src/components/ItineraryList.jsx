import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdToggleOn, MdToggleOff } from 'react-icons/md'; // Import toggle icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tourGuideId, setTourGuideId] = useState(localStorage.getItem('userId')); // Assuming you have the tour guide's ID stored in localStorage
  const navigate = useNavigate(); // Declare navigate hook

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/tour_guide_itinerary?tourGuideId=${tourGuideId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use the saved token
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

    if (tourGuideId) {
      fetchItineraries();
    } else {
      setError('Tour guide ID is missing.');
      setLoading(false);
    }
  }, [tourGuideId]);

  const handleToggleActivation = async (itineraryId, isActive, hasBookings) => {
    console.log(`Toggling itinerary with ID: ${itineraryId} and current status: ${isActive}`);

    if (!hasBookings && isActive) {
      alert('Itinerary has no bookings, cannot deactivate.');
      return;
    }

    try {
      const newStatus = !isActive; // Toggle the status

      await axios.put(
        `http://localhost:4000/api/tour_guide_itinerary/${itineraryId}/deactivate`,
        {}, // Empty body
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Update the state to reflect the new status
      setItineraries(prevItineraries =>
        prevItineraries.map(itinerary =>
          itinerary._id === itineraryId ? { ...itinerary, isActive: newStatus } : itinerary
        )
      );

      alert(`Itinerary ${newStatus ? 'activated' : 'deactivated'} successfully!`);
    } catch (err) {
      console.error('Error toggling itinerary activation:', err);
      alert('Failed to update itinerary status.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="itinerary-list">
      <h1>Your Itineraries</h1>
      {/* Add "Return to previous page" button */}
      <button
  onClick={() => navigate(-1)}
  style={{
    position: 'absolute',
    top: '20px',        // Adjust as needed for spacing
    left: '20px',       // Adjust as needed for spacing
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

            {/* Add "Status:" next to the toggle button */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Status:</span>
              <span>{itinerary.isActive ? 'Active' : 'Inactive'}</span>
              <button
                onClick={() => handleToggleActivation(itinerary._id, itinerary.isActive, itinerary.hasBookings || false)}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '10px 20px',
                  marginLeft: '10px',
                }}
              >
                {itinerary.isActive ? (
                  <MdToggleOn color="green" size={30} />
                ) : (
                  <MdToggleOff color="gray" size={30} />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .itinerary-list {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          color: #333;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        .itinerary-item {
          background: #f9f9f9;
          margin: 15px 0;
          padding: 15px;
          border-radius: 5px;
          border-left: 5px solid #007bff;
          transition: transform 0.2s;
        }

        .itinerary-item:hover {
          transform: scale(1.02);
        }

        strong {
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default ItineraryList;
