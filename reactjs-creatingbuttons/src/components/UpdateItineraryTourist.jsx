import { useState } from 'react';

export default function UpdateItineraryTourist() {
  const [numActivities, setNumActivities] = useState(0);
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState('');
  const [timeline, setTimeline] = useState('');
  const [language, setLanguage] = useState('');
  const [price, setPrice] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [tags, setTags] = useState(''); // State for tags

  const handleNumActivitiesChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumActivities(value);
    const newActivities = Array.from({ length: value }, () => ({
      duration: '',
      date: '',
      time: ''
    }));
    setActivities(newActivities);
  };

  const handleActivityChange = (index, field, value) => {
    const updatedActivities = activities.map((activity, i) => 
      i === index ? { ...activity, [field]: value } : activity
    );
    setActivities(updatedActivities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itineraryData = { 
      activities, 
      locations, 
      timeline, 
      language, 
      price, 
      pickupLocation, 
      dropoffLocation,
      accessibility, 
      tags // Include tags in the data
    };
    console.log("Itinerary Data:", itineraryData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1>Update Itinerary</h1>
      
      <label htmlFor="numActivities" style={{ fontSize: '18px', marginBottom: '10px' }}>
        Update the number of activities:
      </label>
      <input
        type="number"
        id="numActivities"
        placeholder="Update number of activities"
        value={numActivities}
        onChange={handleNumActivitiesChange}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}
      />

      {activities.map((activity, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h3>Activity {index + 1}</h3>
          <input
            type="text"
            placeholder="Update duration"
            value={activity.duration}
            onChange={(e) => handleActivityChange(index, 'duration', e.target.value)}
            style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            type="date"
            value={activity.date}
            onChange={(e) => handleActivityChange(index, 'date', e.target.value)}
            style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            type="time"
            value={activity.time}
            onChange={(e) => handleActivityChange(index, 'time', e.target.value)}
            style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
      ))}
      
      {/* Update Locations Input - Height Adjusted to Match Tags Box */}
      <textarea
        placeholder="Update locations to be visited"
        value={locations}
        onChange={(e) => setLocations(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', height: '60px', width: '100%', boxSizing: 'border-box', marginBottom: '10px' }} // Height set to match tags box
      />
      
      <input
        type="text"
        placeholder="Update timeline"
        value={timeline}
        onChange={(e) => setTimeline(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <input
        type="text"
        placeholder="Update language of tour"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <input
        type="number"
        placeholder="Update price of tour"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <input
        type="text"
        placeholder="Update pickup location"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <input
        type="text"
        placeholder="Update dropoff location"
        value={dropoffLocation}
        onChange={(e) => setDropoffLocation(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <textarea
        placeholder="Update accessibility options (e.g., wheelchair accessible, hearing assistance)"
        value={accessibility}
        onChange={(e) => setAccessibility(e.target.value)}
        style={{ 
          padding: '10px', 
          fontSize: '16px', 
          height: '80px', 
          width: '100%', 
          boxSizing: 'border-box', 
          marginBottom: '10px' 
        }}
      />

      {/* Update Tags Input */}
      <textarea
        placeholder="Update tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ 
          padding: '10px', 
          fontSize: '16px', 
          height: '60px', // Same height as locations input
          width: '100%', 
          boxSizing: 'border-box', 
          marginBottom: '10px' 
        }}
      />

      <button type="submit" onClick={handleSubmit} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
        Submit
      </button>
    </div>
  );
}
