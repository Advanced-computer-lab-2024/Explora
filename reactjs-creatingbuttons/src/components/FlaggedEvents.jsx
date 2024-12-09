import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdFlag, MdOutlineFlag } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/cropped_image.png';
import { useNavigate } from 'react-router-dom';
const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};

const ItineraryList = () => {
  const navigate = useNavigate();

  const [itineraries, setItineraries] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [guideRatings, setGuideRatings] = useState({});
  const [guideComments, setGuideComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itineraryResponse = await axios.get('http://localhost:4000/api/tour_guide_itinerary/all', {
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

      toast.success(`Itinerary ${newStatus ? 'flagged' : 'unflagged'} successfully!`);
    } catch (err) {
      console.error('Error toggling flag status:', err);
      toast.error('Failed to update itinerary flag status.');
    }
  };

  const handleFlagActivity = async (activityId, isFlagged) => {
    try {
      const newStatus = !isFlagged;

      await axios.patch(
        `http://localhost:4000/Activity/${activityId}/flag2`,
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

      toast.success(`Activity ${newStatus ? 'flagged' : 'unflagged'} successfully!`);
    } catch (err) {
      console.error('Error toggling flag status:', err);
      toast.error('Failed to update activity flag status.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
           <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1px 5px',
          backgroundColor: '#008080',
          color: 'white',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          justifyContent: 'space-between',
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/acc-settings" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/flagged-events" style={{ color: 'white', textDecoration: 'none' }}>Flag Event</a>
          

          <a href="/product-list" style={{ color: 'white', textDecoration: 'none' }}>Products</a>


        </div>

        {/* SVG Icon */}
        <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <svg
            onClick={toggleDropdown}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" fill="white" />
          </svg>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '80px',
                right: '0',
                backgroundColor: '#008080',
                color: 'white',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                width: '200px',
                padding: '10px 0',
                zIndex: 1000,
              }}
              onMouseEnter={handleMouseEnterHistory}
              onMouseLeave={handleMouseLeaveHistory}
            >
              <button
                onClick={() => navigate('/category-manager')}
                style={buttonStyle}
              >
                Manage Activities
              </button>
              <button
                onClick={() => navigate('/tag-manager')}
                style={buttonStyle}
              >
                Manage Prefrences
              </button>
              <a
                href="/history"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                Manage Accounts
              </a>

              <button
                onClick={() => navigate('/admin-documents')}
                style={buttonStyle}
              >
                View Uploaded Documents
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/admin-complaints')}
                style={buttonStyle}
              >
                View Complaints
              </button>
              <button
                onClick={() => navigate('/viewDeleteRequests')}
                style={buttonStyle}
              >
                View Delete Requests
              </button>
              <button
                onClick={() => navigate('/promo-code')}
                style={buttonStyle}
              >
                Create Promo Code
              </button>
            

              {isHistoryOptionsVisible && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '220px',
                    backgroundColor: '#008080',
                    color: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '200px',
                    padding: '10px 0',
                    zIndex: 1000,
                  }}
                >
                  <button
                    onClick={() => navigate('/admin-view-users')}
                    style={buttonStyle}
                  >
Delete Accounts                  </button>
                  <button
                    onClick={() => navigate('/login-tourism')}
                    style={buttonStyle}
                  >
Add Tourism Governor                  </button>
                  <button
                    onClick={() => navigate('/login-admin')}
                    style={buttonStyle}
                  >
Add Admin                  </button>
                  

                  
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <div style={{ marginTop: '80px' }}></div>
    <div className="container">
      <div className="section">
        <h2>Itineraries</h2>
        <ul>
          {itineraries.map(itinerary => (
            <li key={itinerary._id} className="item">
              <h3>{itinerary.title}</h3>
              <p>{itinerary.description}</p>
              <p><strong>Name:</strong> {itinerary.locations}</p>
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
              <h3>{activity.name}</h3>
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
    </div>
  );
};

export default ItineraryList;
