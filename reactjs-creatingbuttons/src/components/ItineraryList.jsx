import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdToggleOn, MdToggleOff } from 'react-icons/md'; // Import toggle icons
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
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState('');
  const [tourGuideId, setTourGuideId] = useState(localStorage.getItem('userId')); // Assuming you have the tour guide's ID stored in localStorage
  const navigate = useNavigate(); // Declare navigate hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [previousWork, setPreviousWork] = useState('');
  const [image, setImage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);


  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState({});
  const [users, setUsers] = useState([]); // State for users
  const [totalUsers, setTotalUsers] = useState(0); // State for total users
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0); // State for new users this month
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
   <a href="/to-do" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
   <a href="/itinerariesList" style={{ color: 'white', textDecoration: 'none' }}>View Itineraries</a>
   <a href="/flag-notification" style={{ color: 'white', textDecoration: 'none' }}>Notifications</a>

   


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
         onClick={() => navigate('/create-profile')}
         style={buttonStyle}
       >
         Create Profile
       </button>
      

       <button
         onClick={() => navigate('/create-itinerary')}
         style={buttonStyle}
       >
         Create Itinerary
       </button>
       <button
         onClick={() => navigate('/')}
         style={buttonStyle}
       >
         Log Out
       </button>
      
       <button
         onClick={() => navigate('/change-password')}
         style={buttonStyle}
       >
         Change Password
       </button>
       <button
         onClick={() => navigate('/request-account-deletion')}
         style={buttonStyle}
       >
         Request Account Deletion
       </button>
       <button
         onClick={() => navigate('/view-number-of-tourists')}
         style={buttonStyle}
       >
Tourist Report              </button>
<button
         onClick={() => navigate('/sales')}
         style={buttonStyle}
       >
Sales Report              </button>
       
     

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
       

           
         </div>
       )}
     </div>
   )}
 </div>
</nav>
<div style={{ marginTop: '80px' }}>
</div>
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
    </div>
  );
};

export default ItineraryList;
