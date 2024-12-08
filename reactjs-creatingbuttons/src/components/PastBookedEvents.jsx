import React, { useState, useEffect } from "react";
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

const PastBookedEvents = () => {
    const [pastActivities, setPastActivities] = useState([]);
    const [pastItineraries, setPastItineraries] = useState([]);
    const [error, setError] = useState(null);
    const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage
    const [message, setMessage] = useState('');
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [badgeLevel, setBadgeLevel] = useState('');
    const [guideRatings, setGuideRatings] = useState({});
    const [guideComments, setGuideComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);
    const [showPromoModal, setShowPromoModal] = useState(false);
  
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
    const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);
    const handleClosePromoModal = () => setShowPromoModal(false);
  
    useEffect(() => {
        setShowPromoModal(true);
      }, []);

    useEffect(() => {
        const fetchPastEvents = async () => {
            const touristId = localStorage.getItem("userId");
            if (!touristId) {
                setError("User not logged in. Please log in first.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // Fetch past activities
                const activitiesResponse = await fetch(
                    `http://localhost:4000/api/activity/pastBookedActivities/${touristId}`
                );
                const activitiesData = await activitiesResponse.json();

                // Fetch past itineraries
                const itinerariesResponse = await fetch(
                    `http://localhost:4000/api/tour_guide_itinerary/pastBookedItineraries/${touristId}`
                );
                const itinerariesData = await itinerariesResponse.json();

                // Debugging response
                console.log("Past Itineraries Data:", itinerariesData);

                // Update state
                setPastActivities(Array.isArray(activitiesData) ? activitiesData : []);
                setPastItineraries(Array.isArray(itinerariesData.pastItineraries) ? itinerariesData.pastItineraries : []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPastEvents();
    }, []);

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error}</div>; // Show error state

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
          <a href="/tourist-home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/UpcomingActivities" style={{ color: 'white', textDecoration: 'none' }}>Activities</a>
          <a href="/book-flight" style={{ color: 'white', textDecoration: 'none' }}>Flights</a>
          <a href="/book-hotel" style={{ color: 'white', textDecoration: 'none' }}>Hotels</a>
          <a href="/UpcomingItineraries" style={{ color: 'white', textDecoration: 'none' }}>Itineraries</a>
          <a href="/UpcomingBookedEvents" style={{ color: 'white', textDecoration: 'none' }}>Upcoming Events</a>

          <a href="/product-list-tourist" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
          <a href="/Notifications" style={{ color: 'white', textDecoration: 'none' }}>Notifications</a>


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
                onClick={() => navigate('/ProfileDetailsPage')}
                style={buttonStyle}
              >
                Profile
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
                History
              </a>

              <button
                onClick={() => navigate('/cart')}
                style={buttonStyle}
              >
                Cart
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/file-complaint')}
                style={buttonStyle}
              >
                File Complaint
              </button>
              <button
                onClick={() => navigate('/change-password')}
                style={buttonStyle}
              >
                Change Password
              </button>
              <button
                onClick={() => navigate('/Bookmarks')}
                style={buttonStyle}
              >
                Bookmarks
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
                My Promo Codes
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
                Current Orders
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
                    onClick={() => navigate('/tourist-previous-activities')}
                    style={buttonStyle}
                  >
                    Past Activities
                  </button>
                  <button
                    onClick={() => navigate('/tourist-past-itineraries')}
                    style={buttonStyle}
                  >
                    Past Itineraries
                  </button>
                  <button
                    onClick={() => navigate('/past-orders')}
                    style={buttonStyle}
                  >
                    Past Orders
                  </button>
                  <button
                    onClick={() => navigate('/view-booked-transportations')}
                    style={buttonStyle}
                  >
                    Booked Transportations
                  </button>
                  <button
                    onClick={() => navigate('/PastBookedEvents')}
                    style={buttonStyle}
                  >
                    Booked Events
                  </button>

                  
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
        <div style={styles.pageContainer}>
        <div style={{ marginTop: '80px' }}>
  <h1 className="header">Past Booked Events</h1> 

            <div style={styles.splitContainer}>
                {/* Left Column: Activities */}
                <div style={styles.column}>
                    <h2 style={styles.columnTitle}>Past Activities</h2>
                    {pastActivities.map((activity, index) => (
                        <div key={activity.id || index} style={styles.card}>
                            <h3>{activity.name}</h3>
                            <p>
                                <strong>Date:</strong> {activity.date}
                            </p>
                            <p>
                                <strong>Location:</strong> {activity.location}
                            </p>
                            <p>
                                <strong>Price:</strong> {activity.price}
                            </p>
                            <p>
                                <strong>Rating:</strong> {activity.rating}/10
                            </p>
                        </div>
                    ))}
                </div>

                {/* Right Column: Itineraries */}
                <div style={styles.column}>
                    <h2 style={styles.columnTitle}>Past Itineraries</h2>
                    {pastItineraries.map((itinerary, index) => (
                        <div key={itinerary._id || index} style={styles.card}>
                            <h3>{itinerary.tourGuideName}</h3>
                            <p>
                                <strong>Destinations:</strong> {itinerary.locations}
                            </p>
                            <p>
                                <strong>Price:</strong> {itinerary.price}
                            </p>
                            <p>
                                <strong>Rating:</strong> {itinerary.rating}/10
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
        </div>
    );
};

// Styling
const styles = {
    pageContainer: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
    },
    title: {
        textAlign: "center",
        fontSize: "28px",
        marginBottom: "20px",
        color: "#333",
    },
    splitContainer: {
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
    },
    column: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "15px",
    },
    columnTitle: {
        fontSize: "22px",
        marginBottom: "15px",
        color: "#007bff",
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
};

export default PastBookedEvents;