import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ItinerarySearchPage = () => {
  // State to manage the search input, category, and additional filters
  const [searchTerm, setSearchTerm] = useState('');
  const [budgetSearchTerm, setBudgetSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('all languages');
  const [sortOrder, setSortOrder] = useState('none');

  // Dummy data with ratings, price, date, and preferences
  const places = [
    { name: 'Egyptian Museum', Language: 'Arabic Tour', category: 'museum tour', rating: 9, price: 20, date: '2024-10-10', preferences: ['educational', 'museum tour'] },
    { name: 'Egyptian Museum', Language: 'Spanish Tour', category: 'museum tour', rating: 9, price: 28, date: '2024-10-10', preferences: ['educational', 'museum tour'] },
    { name: 'Egyptian Museum', Language: 'English Tour', category: 'museum tour', rating: 9, price: 22, date: '2024-10-10', preferences: ['educational', 'museum tour'] },
    { name: 'Pyramids of Giza', Language: 'Arabic Tour', category: 'historical place tour', rating: 9.7, price: 50, date: '2024-11-01', preferences: ['adventurous', 'outdoors', 'landmark'] },
    { name: 'Pyramids of Giza', Language: 'English Tour', category: 'historical place tour', rating: 9.7, price: 53, date: '2024-11-01', preferences: ['adventurous', 'outdoors', 'landmark'] },
    { name: 'Pyramids of Giza', Language: 'Italian Tour', category: 'historical place tour', rating: 9.6, price: 55, date: '2024-11-01', preferences: ['adventurous', 'outdoors', 'landmark'] },
    { name: 'Art Museum', Language: 'Arabic Tour', category: 'museum tour', rating: 8, price: 15, date: '2024-09-20', preferences: ['cultural', 'budget-friendly', 'educational', 'museum tour'] },
    { name: 'Cairo Tower', Language: 'Arabic Tour', category: 'landmark tour', rating: 7.2, price: 10, date: '2024-12-05', preferences: ['scenic', 'budget-friendly', 'landmark'] },
    { name: 'Luxor Temple', Language: 'Arabic Tour', category: 'historical place tour', rating: 9.2, price: 30, date: '2024-10-25', preferences: ['educational', 'adventurous', 'outdoors', 'landmark'] },
    { name: 'Luxor Temple', Language: 'German Tour', category: 'historical place tour', rating: 9.2, price: 40, date: '2024-10-25', preferences: ['educational', 'adventurous', 'outdoors', 'landmark'] }
  ];

  // Filtering logic
  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBudget = place.price <= selectedPrice; // Changed from === to <=
    const matchesLanguage = selectedLanguage === 'all languages' || place.Language === selectedLanguage;
    const matchesRating = selectedRating === 'all' || place.rating >= Number(selectedRating);
    const matchesDate = !selectedDate || place.date === selectedDate;
    const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref => place.preferences.includes(pref));
    
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
        <select value={selectedLanguage} onChange={handleLanguageChange} style={{ padding: '10px' }}>
          <option value="all languages">All Languages</option>
          <option value="Arabic Tour">Arabic Tour</option>
          <option value="English Tour">English Tour</option>
          <option value="Spanish Tour">Spanish Tour</option>
          <option value="German Tour">German Tour</option>
          <option value="Italian Tour">Italian Tour</option>
        </select>

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
                <strong>{place.name}</strong> - {place.category} - ({place.Language}) - ${place.price} - rated: {place.rating}/10
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
