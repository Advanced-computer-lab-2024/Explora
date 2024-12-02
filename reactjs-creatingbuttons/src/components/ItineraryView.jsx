import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ItineraryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [tourGuideName, setTourGuideName] = useState('');
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState('');
  const [timeline, setTimeline] = useState('');
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [accessibility, setAccessibility] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [tags, setTags] = useState([]);

  // Format date function
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options); // Format as "day month year"
  };

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/tour_guide_itinerary/${id}`);
        setItinerary(response.data);
        setTourGuideName(response.data.tourGuideName);
        setActivities(response.data.activities);
        setLocations(response.data.locations);
        setTimeline(response.data.timeline);
        setDuration(response.data.duration);
        setLanguage(response.data.language);
        setAvailableDates(response.data.availableDates);
        setAvailableTimes(response.data.availableTimes);
        setAccessibility(response.data.accessibility);
        setPickupLocation(response.data.pickupLocation);
        setDropoffLocation(response.data.dropoffLocation);
        setTags(response.data.tags);
      } catch (err) {
        console.error("Error fetching itinerary:", err);
        setError('No itinerary data available. Something went wrong.');
      }
    };

    fetchItinerary();
  }, [id]);

  const handleUpdate = async () => {
    const updatedItinerary = {
      tourGuideName,
      activities,
      locations,
      timeline,
      duration,
      language,
      availableDates,
      availableTimes,
      accessibility,
      pickupLocation,
      dropoffLocation,
      tags,
    };

    try {
      await axios.put(`http://localhost:4000/api/tour_guide_itinerary/${id}`, updatedItinerary);
      alert('Itinerary updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating itinerary:', err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this itinerary?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/tour_guide_itinerary/${id}`);
      alert('Itinerary deleted successfully!');
      navigate('/itineraries');
    } catch (err) {
      console.error('Error deleting itinerary:', err);
      alert('Failed to delete the itinerary.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!itinerary) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1>{isEditing ? 'Edit Itinerary' : 'View Itinerary'}</h1>
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
      <label>Tour Guide Name:</label>
      <input
        type="text"
        value={tourGuideName}
        onChange={(e) => setTourGuideName(e.target.value)}
        disabled={!isEditing}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <label>Locations:</label>
      <input
        type="text"
        value={locations}
        onChange={(e) => setLocations(e.target.value)}
        disabled={!isEditing}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Timeline:</label>
      <input
        type="text"
        value={timeline}
        onChange={(e) => setTimeline(e.target.value)}
        disabled={!isEditing}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Duration (days):</label>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        disabled={!isEditing}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Language:</label>
      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        disabled={!isEditing}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Available Dates:</label>
      {availableDates.map((date, index) => (
        <input
          key={index}
          type="text"
          value={formatDate(date)} // Format the date here
          disabled={true} // Disable editing since this is just a display
          style={{ width: '100%', marginBottom: '10px' }}
        />
      ))}

      <label>Available Times:</label>
      {availableTimes.map((time, index) => (
        <input
          key={index}
          type="time"
          value={time}
          onChange={(e) => {
            const updatedTimes = [...availableTimes];
            updatedTimes[index] = e.target.value;
            setAvailableTimes(updatedTimes);
          }}
          disabled={!isEditing}
          style={{ width: '100%', marginBottom: '10px' }}
        />
      ))}

      <label>
        <input
          type="checkbox"
          checked={accessibility}
          onChange={(e) => setAccessibility(e.target.checked)}
          disabled={!isEditing}
        />
        Accessibility
      </label><br></br>

      <label>Pickup Location:</label>
      <input
        type="text"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
        disabled={!isEditing}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Dropoff Location:</label>
      <input
        type="text"
        value={dropoffLocation}
        onChange={(e) => setDropoffLocation(e.target.value)}
        disabled={!isEditing}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Tags (comma separated):</label>
      <input
        type="text"
        value={tags.join(', ')}
        onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        disabled={!isEditing}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      {isEditing ? (
        <button onClick={handleUpdate} style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}>
          Save Updates
        </button>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)} style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}>
            Edit Itinerary
          </button>
          <button onClick={handleDelete} style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px', marginLeft: '270px', backgroundColor: 'red', color: 'white' }}>
            Delete Itinerary
          </button>
        </>
      )}
    </div>
  );
}
