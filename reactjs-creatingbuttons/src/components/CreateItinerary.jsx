import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateItinerary() {
  const navigate = useNavigate();
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
  const [message, setMessage] = useState("");

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
  );
}

const inputStyle = {
  padding: "10px",
  marginBottom: "10px",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "5px 10px",
  cursor: "pointer",
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
