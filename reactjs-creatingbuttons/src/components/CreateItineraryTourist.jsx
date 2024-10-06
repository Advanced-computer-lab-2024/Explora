import { useState } from 'react';

export default function CreateItineraryTourist() {
  const [numActivities, setNumActivities] = useState(0);
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState('');
  const [timeline, setTimeline] = useState('');
  const [language, setLanguage] = useState('');
  const [price, setPrice] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [tags, setTags] = useState(''); // New state for tags

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
      <h1>Create a New Itinerary</h1>
      
      <label htmlFor="numActivities" style={{ fontSize: '18px', marginBottom: '10px' }}>
        Choose the number of activities:
      </label>
      <input
        type="number"
        id="numActivities"
        placeholder="Enter number of activities"
        value={numActivities}
        onChange={handleNumActivitiesChange}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}
      />

      {activities.map((activity, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h3>Activity {index + 1}</h3>
          <input
            type="text"
            placeholder="Enter duration"
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
      
      <textarea
        placeholder="Enter locations to be visited"
        value={locations}
        onChange={(e) => setLocations(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', height: '40px', width: '100%', boxSizing: 'border-box', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Enter timeline"
        value={timeline}
        onChange={(e) => setTimeline(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      
      {/* New Tags Input Field */}
      <textarea
        placeholder="Enter tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ 
          padding: '10px', 
          fontSize: '16px', 
          height: '40px', 
          width: '100%', 
          boxSizing: 'border-box', 
          marginBottom: '10px' 
        }}
      />

      <input
        type="text"
        placeholder="Enter language of tour"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <input
        type="number"
        placeholder="Enter price of tour"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <input
        type="text"
        placeholder="Enter pickup location"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <input
        type="text"
        placeholder="Enter dropoff location"
        value={dropoffLocation}
        onChange={(e) => setDropoffLocation(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <textarea
        placeholder="Enter accessibility options (e.g., wheelchair accessible, hearing assistance)"
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
      <button type="submit" onClick={handleSubmit} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
        Submit
      </button>
    </div>
  );
}
