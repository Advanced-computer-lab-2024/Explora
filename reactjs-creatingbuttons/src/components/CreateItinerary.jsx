import { useState } from "react";
import axios from "axios";
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

export default function CreateItinerary() {
  const [numActivities, setNumActivities] = useState(0);
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState("");
  const [timeline, setTimeline] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState("");
  const [availableDates, setAvailableDates] = useState([""]);
  const [availableTimes, setAvailableTimes] = useState([""]);
  const [accessibility, setAccessibility] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [tourGuideName, setTourGuideName] = useState("");

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

  const navigate = useNavigate();

  const handleNumActivitiesChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setNumActivities(value);
    const newActivities = Array.from({ length: value }, () => ({
      duration: "",
      date: "",
      time: "",
    }));
    setActivities(newActivities);
  };

  const handleActivityChange = (index, field, value) => {
    const updatedActivities = activities.map((activity, i) =>
      i === index ? { ...activity, [field]: value } : activity
    );
    setActivities(updatedActivities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve the user ID from local storage
    const tourGuideId = localStorage.getItem('userId');  // Ensure 'UserId' matches what's in local storage
    console.log('tourGuideId retrieved from localStorage:', tourGuideId);  // Debug log
  
    if (!tourGuideId) {
      console.error('Tour guide ID not found in local storage');
      return;
    }
  
    const itineraryData = {
      tourGuideId,  // Use the correct field name expected by the backend
      tourGuideName, // Use dynamic name if available
      activities,
      locations,
      timeline,
      duration,
      language,
      price,  // Ensure price is also defined
      availableDates,
      availableTimes,
      accessibility,
      pickupLocation,
      dropoffLocation,
      hasBookings: false, // Default value
    };
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/tour_guide_itinerary",
        itineraryData
      );
      console.log("Itinerary created successfully:", response.data);
      // Navigate to the itinerary view page
      navigate(`/itinerary-view/${response.data._id}`);
    } catch (error) {
      console.error("Error creating itinerary:", error);
    }
  };
  
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
   
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
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

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a New Itinerary
      </h1>
      <form onSubmit={handleSubmit}>
        {/* General Information */}
        <section style={{ marginBottom: "20px" }}>
          <h2>General Information</h2>
          <input
            type="text"
            placeholder="Tour Guide Name"
            value={tourGuideName}
            onChange={(e) => setTourGuideName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Locations"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={inputStyle}
          />
        <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />
        </section>

        {/* Activities */}
        <section style={{ marginBottom: "20px" }}>
          <h2>Activities</h2>
          <label>
            Number of Activities:
            <input
              type="number"
              value={numActivities}
              onChange={handleNumActivitiesChange}
              style={inputStyle}
            />
          </label>
          {activities.map((activity, index) => (
            <div key={index} style={activityStyle}>
              <h3>Activity {index + 1}</h3>
              <input
                type="text"
                placeholder="Duration"
                value={activity.duration}
                onChange={(e) =>
                  handleActivityChange(index, "duration", e.target.value)
                }
                required
                style={inputStyle}
              />
              <input
                type="date"
                value={activity.date}
                onChange={(e) =>
                  handleActivityChange(index, "date", e.target.value)
                }
                required
                style={inputStyle}
              />
              <input
                type="time"
                value={activity.time}
                onChange={(e) =>
                  handleActivityChange(index, "time", e.target.value)
                }
                required
                style={inputStyle}
              />
            </div>
          ))}
        </section>

        {/* Availability */}
        <section style={{ marginBottom: "20px" }}>
          <h2>Availability</h2>
          <div>
            <h4>Available Dates</h4>
            {availableDates.map((date, index) => (
              <div key={index} style={{ display: "flex", gap: "10px" }}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setAvailableDates((prev) =>
                      prev.map((d, i) => (i === index ? e.target.value : d))
                    )
                  }
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() =>
                    setAvailableDates((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  style={buttonStyle}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setAvailableDates([...availableDates, ""])}
              style={buttonStyle}
            >
              Add Date
            </button>
          </div>

          <div>
            <h4>Available Times</h4>
            {availableTimes.map((time, index) => (
              <div key={index} style={{ display: "flex", gap: "10px" }}>
                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    setAvailableTimes((prev) =>
                      prev.map((t, i) => (i === index ? e.target.value : t))
                    )
                  }
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() =>
                    setAvailableTimes((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  style={buttonStyle}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setAvailableTimes([...availableTimes, ""])}
              style={buttonStyle}
            >
              Add Time
            </button>
          </div>
        </section>

        {/* Miscellaneous */}
        <section>
          <label>
            Accessible:
            <input
              type="checkbox"
              checked={accessibility}
              onChange={() => setAccessibility(!accessibility)}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Dropoff Location"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            style={inputStyle}
          />
        </section>

        <button type="submit" style={submitButtonStyle}>
          Create Itinerary
        </button>
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  marginBottom: "10px",
  width: "100%",
  boxSizing: "border-box",
};



const submitButtonStyle = {
  ...buttonStyle,
  width: "100%",
  padding: "10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

const activityStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginBottom: "10px",
};
