import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SearchPage = () => {
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
    { name: 'Egyptian Museum', category: 'museum', tag: 'ancient', rating: 4.5, price: 20, date: '2024-10-10', preferences: ['family-friendly', 'educational'] },
    { name: 'Pyramids of Giza', category: 'historical place', tag: 'ancient', rating: 5, price: 50, date: '2024-11-01', preferences: ['adventurous', 'outdoors'] },
    { name: 'Art Museum', category: 'museum', tag: 'modern', rating: 4.0, price: 15, date: '2024-09-20', preferences: ['cultural', 'budget-friendly','educational'] },
    { name: 'Cairo Tower', category: 'activity', tag: 'view', rating: 3.5, price: 10, date: '2024-12-05', preferences: ['scenic', 'family-friendly','budget-friendly'] },
    { name: 'Luxor Temple', category: 'historical place', tag: 'ancient', rating: 4.7, price: 30, date: '2024-10-25', preferences: ['educational', 'adventurous','outdoors'] }
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
    <div style={{ padding: '20px' }}>
      <h1>Search for Museums, Historical Places, or Activities</h1>

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
        <option value="all">All</option>
        <option value="museum">Museum</option>
        <option value="historical place">Historical Place</option>
        <option value="activity">Activity</option>
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
      <label style={{ marginLeft: '15px' }}>Preferences:</label>
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
                <strong>{place.name}</strong> - {place.category} ({place.tag}) - ${place.price} - {place.rating} stars
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;