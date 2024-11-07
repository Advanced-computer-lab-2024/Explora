import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateItinerary() {
  const navigate = useNavigate();
  const [numActivities, setNumActivities] = useState(0);
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState('');
  const [timeline, setTimeline] = useState('');
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('');
  const [price, setPrice] = useState('');
  const [availableDates, setAvailableDates] = useState(['']);
  const [availableTimes, setAvailableTimes] = useState(['']);
  const [accessibility, setAccessibility] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [tourGuideName, setTourGuideName] = useState('');

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

  const handleAddDate = () => {
    setAvailableDates([...availableDates, '']);
  };

  const handleRemoveDate = (index) => {
    const newDates = availableDates.filter((_, i) => i !== index);
    setAvailableDates(newDates);
  };

  const handleDateChange = (index, value) => {
    const updatedDates = availableDates.map((date, i) =>
      i === index ? value : date
    );
    setAvailableDates(updatedDates);
  };

  const handleAddTime = () => {
    setAvailableTimes([...availableTimes, '']);
  };

  const handleRemoveTime = (index) => {
    const newTimes = availableTimes.filter((_, i) => i !== index);
    setAvailableTimes(newTimes);
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = availableTimes.map((time, i) =>
      i === index ? value : time
    );
    setAvailableTimes(updatedTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itineraryData = { 
      tourGuideName,
      activities, 
      locations, 
      timeline, 
      duration,
      language, 
      price, 
      availableDates,
      availableTimes,
      accessibility: accessibility ? true : false, 
      pickupLocation, 
      dropoffLocation
    };
    
    try {
      const response = await axios.post('http://localhost:4000/api/tour_guide_itinerary', itineraryData);
      if (response.status === 200) {
      // Redirect to the itinerary view page with the correct state
      navigate(`/itinerary-view/${response.data._id}`);
    }
    } catch (error) {
      console.error("There was an error creating the itinerary!", error);
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1>Create a New Itinerary</h1>

      <input
        type="text"
        placeholder="Enter Tour Guide Name"
        value={tourGuideName}
        onChange={(e) => setTourGuideName(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />

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

      <input
        type="text"
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
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box', height: '40px' }}
      />
      <input
        type="text"
        placeholder="Enter Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box', height: '40px' }}
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

      <h3>Available Dates</h3>
      {availableDates.map((date, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(index, e.target.value)}
            style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
          />
          <button type="button" onClick={() => handleRemoveDate(index)} style={{ padding: '10px', cursor: 'pointer' }}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddDate} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>
        Add Another Date
      </button>

      <h3>Available Times</h3>
      {availableTimes.map((time, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(index, e.target.value)}
            style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
          />
          <button type="button" onClick={() => handleRemoveTime(index)} style={{ padding: '10px', cursor: 'pointer' }}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddTime} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>
        Add Another Time
      </button>

      <label style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '10px' }}>
        <input
          type="checkbox"
          checked={accessibility}
          onChange={() => setAccessibility(!accessibility)}
          style={{ marginRight: '10px' }}
        />
        Is the itinerary accessible?
      </label>

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

      <button type="submit" onClick={handleSubmit} style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', marginTop: '20px' }}>
        Create Itinerary
      </button>
    </div>
  );
}
