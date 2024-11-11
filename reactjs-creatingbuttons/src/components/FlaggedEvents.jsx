import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdFlag, MdOutlineFlag } from 'react-icons/md';

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itineraryResponse = await axios.get('http://localhost:4000/api/tour_guide_itinerary', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        setItineraries(itineraryResponse.data);

        const activityResponse = await axios.get('http://localhost:4000/api/activity', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        setActivities(activityResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFlagItinerary = async (itineraryId, isFlagged) => {
    try {
      const newStatus = !isFlagged;

      await axios.patch(
        `http://localhost:4000/api/tour_guide_itinerary/${itineraryId}/flag`,
        {},
        {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setItineraries(prevItineraries =>
        prevItineraries.map(itinerary =>
          itinerary._id === itineraryId ? { ...itinerary, flagged: newStatus } : itinerary
        )
      );

      alert(`Itinerary ${newStatus ? 'flagged' : 'unflagged'} successfully!`);
    } catch (err) {
      console.error('Error toggling flag status:', err);
      alert('Failed to update itinerary flag status.');
    }
  };

  const handleFlagActivity = async (activityId, isFlagged) => {
    try {
      const newStatus = !isFlagged;

      await axios.patch(
        `http://localhost:4000/api/activity/${activityId}/flag`,
        {},
        {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setActivities(prevActivities =>
        prevActivities.map(activity =>
          activity._id === activityId ? { ...activity, flagged: newStatus } : activity
        )
      );

      alert(`Activity ${newStatus ? 'flagged' : 'unflagged'} successfully!`);
    } catch (err) {
      console.error('Error toggling flag status:', err);
      alert('Failed to update activity flag status.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="section">
        <h2>Itineraries</h2>
        <ul>
          {itineraries.map(itinerary => (
            <li key={itinerary._id} className="item">
              <h3>{itinerary.title}</h3>
              <p>{itinerary.description}</p>
              <p><strong>Locations:</strong> {itinerary.locations}</p>
              <p><strong>Duration:</strong> {itinerary.duration} days</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Flag Status:</span>
                <span>{itinerary.flagged ? 'Flagged' : 'Not Flagged'}</span>
                <button
                  onClick={() => handleFlagItinerary(itinerary._id, itinerary.flagged)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    padding: '10px',
                    marginLeft: '10px',
                  }}
                >
                  {itinerary.flagged ? (
                    <MdFlag color="red" size={30} />
                  ) : (
                    <MdOutlineFlag color="gray" size={30} />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Activities</h2>
        <ul>
          {activities.map(activity => (
            <li key={activity._id} className="item">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <p><strong>Location:</strong> {activity.location}</p>
              <p><strong>Date:</strong> {activity.date}</p>
              <p><strong>Price:</strong> ${activity.price}</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Flag Status:</span>
                <span>{activity.flagged ? 'Flagged' : 'Not Flagged'}</span>
                <button
                  onClick={() => handleFlagActivity(activity._id, activity.flagged)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    padding: '10px',
                    marginLeft: '10px',
                  }}
                >
                  {activity.flagged ? (
                    <MdFlag color="red" size={30} />
                  ) : (
                    <MdOutlineFlag color="gray" size={30} />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .section {
          flex: 1;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        .item {
          background: #f9f9f9;
          margin: 15px 0;
          padding: 15px;
          border-radius: 5px;
          transition: transform 0.2s;
        }

        .item:hover {
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
