import React, {useState} from 'react';
import { Link } from 'react-router-dom';



const ActivitySearchPage = () => {
    // State to manage the search input, category, and additional filters
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [selectedRating, setSelectedRating] = useState('all');
const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
const [selectedDate, setSelectedDate] = useState('');
const [selectedPreferences, setSelectedPreferences] = useState([]);
const [sortOrder, setSortOrder] = useState('none');
// Dummy data with ratings, price, date, and preferences
const places = [
  { name: 'Visit to Egyptian Museum', category: 'museum visit', rating: 4.5, price: 20, date: '2024-10-10', preferences: ['family-friendly', 'educational'] },
  { name: 'Visit to Pyramids of Giza', category: 'historical place visit', rating: 4.8, price: 55, date: '2024-11-01', preferences: ['adventurous', 'outdoors'] },
  { name: 'Visit to Art Museum', category: 'museum visit', rating: 4.0, price: 15, date: '2024-09-20', preferences: ['cultural', 'budget-friendly','educational'] },
  { name: 'Visit to Cairo Tower', category: 'landmark visit', rating: 3.5, price: 10, date: '2024-12-05', preferences: ['scenic', 'family-friendly','budget-friendly'] },
  { name: 'Visit to Luxor Temple', category: 'historical place visit', rating: 4.7, price: 30, date: '2024-10-25', preferences: ['educational', 'adventurous','outdoors'] },
  { name: 'Ski Egypt', category: 'entertainment', rating: 4.9, price: 20, date: '2024-10-26', preferences: ['adventurous','family-friendly'] },
  { name: 'Go Kart at Autovrooom Cairo', category: 'entertainment', rating: 4.8, price: 40, date: '2024-10-24', preferences: ['family-friendly', 'adventurous','outdoors'] },
  { name: 'Gravity Code', category: 'entertainment', rating: 4.3, price: 44, date: '2024-10-17', preferences: ['family-friendly', 'adventurous'] },
  { name: 'Air Zone Egypt', category: 'entertainment', rating: 4.5, price: 38, date: '2024-10-28', preferences: ['family-friendly', 'adventurous','outdoors'] }
];
// Filtering logic
const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesRating = selectedRating === 'all' || place.rating >= Number(selectedRating);
    const matchesPrice = place.price <= selectedPrice;
    const matchesDate = !selectedDate || place.date === selectedDate;
    const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref => place.preferences.includes(pref));
    
    return matchesSearch && matchesCategory && matchesRating && matchesPrice && matchesDate && matchesPreferences;
  });

  // Event handlers
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleRatingChange = (e) => setSelectedRating(e.target.value);
  const handlePriceChange = (e) => setSelectedPrice(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handlePreferencesChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedPreferences(value);
  };

  let sortedPlaces = [...filteredPlaces];

  if (sortOrder === 'low-to-high'){
    sortedPlaces = sortedPlaces.sort((a,b)=>a.price -b.price);
  } else if (sortOrder === 'high-to-low'){
    sortedPlaces = sortedPlaces.sort((a,b)=>b.price -a.price);
  }
  return (
    <div>
      <h1>Activity Search Page</h1>

       {/* Search Bar */}
       <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: '10px', width: '300px', marginRight: '15px' }}
      />

      {/* Category Dropdown */}
      <select value={selectedCategory} onChange={handleCategoryChange} style={{ padding: '10px' }}>
        <option value="all">All Categories</option>
        <option value="museum visit">Museum Visit</option>
        <option value="historical place visit">Historical Place Visit</option>
        <option value="landmark visit">Landmark Visit</option>
        <option value="entertainment">Entertainment</option>
      </select>


      {/* Rating Filter */}
      <select value={selectedRating} onChange={handleRatingChange} style={{ padding: '10px', marginLeft: '15px' }}>
        <option value="all">All Ratings</option>
        <option value="5">5 stars</option>
        <option value="4">4 stars and above</option>
        <option value="3">3 stars and above</option>
        <option value="2">2 stars and above</option>
      </select>

      {/* Price Slider */}
      <label style={{ marginLeft: '15px' }}>Max Price: ${selectedPrice}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={selectedPrice}
        onChange={handlePriceChange}
        style={{ marginLeft: '10px' }}
      />

      {/* Date Picker */}
      <label style={{ marginLeft: '15px' }}>Date:</label>
      <input type="date" value={selectedDate} onChange={handleDateChange} style={{ padding: '10px', marginLeft: '10px' }} />

      {/* Preferences Multi-select */}
      <label style={{ marginLeft: '15px' }}>Tags:</label>
      <select multiple={true} value={selectedPreferences} onChange={handlePreferencesChange} style={{ padding: '10px', marginLeft: '10px' }}>
        <option value="family-friendly">Family-friendly</option>
        <option value="educational">Educational</option>
        <option value="adventurous">Adventurous</option>
        <option value="outdoors">Outdoors</option>
        <option value="budget-friendly">Budget-friendly</option>
        <option value="scenic">Scenic</option>
      </select>

      {/* Sort by Price */}
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
                <strong>{place.name}</strong> - {place.category} - ${place.price} - {place.rating} stars
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    

      {/* Add the "View Upcoming Activities" button */}
      <Link to="/UpcomingActivities">
        <button style={{ padding: '10px', margin: '10px', fontSize: '16px' }}>
          View Upcoming Activities
        </button>
      </Link>

      {/* Rest of the activity search page */}
      {/* You can add your existing filters and search functionality here */}

    </div>
  );
};

export default ActivitySearchPage;
