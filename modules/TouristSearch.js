import React, { useState } from 'react';

const SearchPage = () => {
  // State to manage search input, selected category, and search results
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Dummy data for museums, historical places, and activities
  const places = [
    { name: 'Egyptian Museum', category: 'museum', tag: 'ancient' },
    { name: 'Pyramids of Giza', category: 'historical place', tag: 'ancient' },
    { name: 'Art Museum', category: 'museum', tag: 'modern' },
    { name: 'Cairo Tower', category: 'activity', tag: 'view' },
    { name: 'Luxor Temple', category: 'historical place', tag: 'ancient' },
  ];

  // Filter the places based on search term and selected category
  const filteredPlaces = places.filter((place) => {
    return (
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || place.category === selectedCategory)
    );
  });

  // Handle the input change for search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle the category filter
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

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

      {/* Displaying the filtered results */}
      <div style={{ marginTop: '20px' }}>
        <h3>Results:</h3>
        {filteredPlaces.length > 0 ? (
          <ul>
            {filteredPlaces.map((place, index) => (
              <li key={index}>
                <strong>{place.name}</strong> - {place.category} ({place.tag})
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