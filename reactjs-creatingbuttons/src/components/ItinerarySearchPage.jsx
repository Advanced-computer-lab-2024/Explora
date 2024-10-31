import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItinerarySearchPage = () => {
  // State to manage the search input, category, and additional filters
  const [searchTerm, setSearchTerm] = useState('');
  const [budgetSearchTerm, setBudgetSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState(299999000); // Default max price
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

useEffect(() => {
  fetch('http://localhost:4000/api/tour_guide_itinerary/').
  then(response => response.json()).
  then(data => {  
      data=data.map((place)=>{return {...place,date:place.date.split('T')[0]}})
      setPlaces(data);
  })},[])

  // Dummy data with ratings, price, date, and preferences
  const places =[
    {
        "_id": "670437882d97c4fb1fad8d83",
        "activities": [
            "Kayaking",
            "Bird Watching"
        ],
        "locations": "River, Forest",
        "timeline": "2023-12-05T08:00:00Z",
        "duration": 6,
        "language": "French",
        "price": 120,
        "availableDates": [
            "2023-12-05T00:00:00.000Z",
            "2023-12-06T00:00:00.000Z"
        ],
        "availableTimes": [
            "8:00 AM",
            "12:00 PM"
        ],
        "accessibility": true,
        "pickupLocation": "River Dock",
        "name": "Nature Exploration",
        "dropoffLocation": "Forest Entrance",
        "hasBookings": true,
        "tags": [
            "Nature",
            "Adventure"
        ],
        "__v": 0
    },
    {
        "_id": "670437a62d97c4fb1fad8d85",
        "activities": [
            "Snorkeling",
            "Beach Volleyball"
        ],
        "locations": "Beach, Resort",
        "timeline": "2023-11-20T09:00:00Z",
        "duration": 4,
        "language": "English",
        "price": 80,
        "availableDates": [
            "2023-11-20T00:00:00.000Z",
            "2023-11-21T00:00:00.000Z"
        ],
        "availableTimes": [
            "9:00 AM",
            "1:00 PM"
        ],
        "accessibility": true,
        "pickupLocation": "Resort Lobby",
        "name": "Beach Fun Day",
        "dropoffLocation": "Beach Entrance",
        "hasBookings": false,
        "tags": [
            "Beach",
            "Sports"
        ],
        "__v": 0
    },
    {
        "_id": "670437b42d97c4fb1fad8d87",
        "activities": [
            "Wine Tasting",
            "Vineyard Tour"
        ],
        "locations": "Vineyard, Winery",
        "timeline": "2023-10-15T10:00:00Z",
        "duration": 3,
        "language": "Italian",
        "price": 150,
        "availableDates": [
            "2023-10-15T00:00:00.000Z",
            "2023-10-16T00:00:00.000Z"
        ],
        "availableTimes": [
            "10:00 AM",
            "2:00 PM"
        ],
        "accessibility": false,
        "pickupLocation": "Hotel Lobby",
        "name": "Wine Experience",
        "dropoffLocation": "Winery Entrance",
        "hasBookings": true,
        "tags": [
            "Wine",
            "Tour"
        ],
        "__v": 0
    }
];

  // Filtering logic
  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBudget = place.price <= selectedPrice; // Changed from === to <=
    const matchesLanguage = place.language.toLowerCase().includes(selectedLanguage.toLowerCase()); 
    const matchesRating = selectedRating === 'all' || place.rating >= Number(selectedRating);
    const matchesDate = !selectedDate || place.date === selectedDate;
    const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref => place.tags.map((tag)=>tag.toLowerCase()).includes(pref.toLowerCase()));
    
    return matchesSearch && matchesRating && matchesDate && matchesPreferences && matchesLanguage && matchesBudget;
  });

  console.log("Filtered Places:", filteredPlaces); // Debugging line

  // Event handlers
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleBudgetChange = (e) => setBudgetSearchTerm(e.target.value);
  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);
  const handlePriceChange = (e) => setSelectedPrice(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handlePreferencesChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedPreferences(value);
  };

  let sortedPlaces = [...filteredPlaces];

  if (sortOrder === 'low-to-high') {
    sortedPlaces = sortedPlaces.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    sortedPlaces = sortedPlaces.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'lowest-to-highest') {
    sortedPlaces = sortedPlaces.sort((a, b) => a.rating - b.rating);
  } else if (sortOrder === 'highest-to-lowest') {
    sortedPlaces = sortedPlaces.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div>
      <h2>Itinerary Search Page</h2>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '20px', 
        border: '2px solid #ccc', // Adds a border
        borderRadius: '8px', // Rounds the corners
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Optional shadow for better visual effect
        backgroundColor: '#f9f9f9' }}>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '10px', width: '300px', marginRight: '15px' }}
        />

        {/* Tags Filter */}
        <label style={{ marginLeft: '15px' }}>Tags:</label>
        <input
          type="text"
          placeholder="Search tags..."
          value={selectedPreferences.join(', ')} // Display selected preferences as a string
          onChange={(e) => setSelectedPreferences(e.target.value.split(',').map(tag => tag.trim()))} // Update selected preferences based on input
          style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '20px', 
        border: '2px solid #ccc', // Adds a border
        borderRadius: '8px', // Rounds the corners
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Optional shadow for better visual effect
        backgroundColor: '#f9f9f9' }}>
        
        {/* Budget Filter */}
        <label style={{ marginLeft: '15px' }}>Budget:</label>
        <input 
          type="number" 
          placeholder="Max Price" 
          value={selectedPrice} 
          onChange={handlePriceChange} 
          style={{ padding: '10px', marginLeft: '10px', width: '80px' }} 
        />

        {/* Language Dropdown */}
        <label style={{ marginLeft: '15px' }}>Language: </label>
        <input
          type="text"
          placeholder="Search by language..."
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{ padding: '10px', width: '300px', marginRight: '15px' }}
        />

        {/* Date Picker */}
        <label style={{ marginLeft: '15px' }}>Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} style={{ padding: '10px', marginLeft: '10px' }} />

        <label style={{ marginLeft: '15px' }}>Tags:</label>
        <input
          type="text"
          placeholder="Search tags..."
          value={selectedPreferences.join(', ')} // Display selected preferences as a string
          onChange={(e) => setSelectedPreferences(e.target.value.split(',').map(tag => tag.trim()))} // Update selected preferences based on input
          style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
        />
      </div>

      {/* Sort by Rating */}
      <label style={{ marginLeft: '15px' }}>Sort by Rating:</label>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '10px', marginLeft: '10px' }}>
        <option value="none">None</option>
        <option value="lowest-to-highest">Low to High</option>
        <option value="highest-to-lowest">High to Low</option>
      </select>

      <label style={{ marginLeft: '15px' }}>Sort by Price:</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '10px', marginLeft: '10px' }}>
                <option value="none">None</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
            </select>

      {/* Displaying the filtered results */}
      <div style={{ marginTop: '20px' }}>
        <h3>Results:</h3>
        {sortedPlaces.length > 0 ? (
          <ul>
            {sortedPlaces.map((place, index) => (
              <li key={index}>
                <strong>{place.name}</strong>  - ({place.language}) - ${place.price} - rated: {place.rating}/10
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>

      {/* Add the "View Upcoming Itineraries" button */}
      <Link to="/UpcomingItineraries">
        <button style={{ padding: '10px', margin: '10px', fontSize: '16px' }}>
          View All Upcoming Itineraries
        </button>
      </Link>
    </div>
  );
};

export default ItinerarySearchPage;
