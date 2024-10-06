import React, { useState } from 'react';

const SiteSearchPage = () => {
    // State to manage the search input, category, and additional filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState('all');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
    const [sortOrder, setSortOrder] = useState('none');

    // Dummy data with ratings, price, date, and preferences
    const places = [
        { name: 'Egyptian Museum', rating: 9, price: 20, preferences: [ 'educational', 'museum tour'] },
        { name: 'Pyramids of Giza', rating: 8.8, price: 50, preferences: ['adventurous', 'outdoors','landmark']},
        { name: 'Art Museum', rating: 8, price: 15, preferences: ['cultural', 'budget-friendly','educational','museum tour'] },
        { name: 'Cairo Tower', rating: 7, price: 10, preferences: ['scenic','budget-friendly','landmark']  },
        { name: 'Luxor Temple', rating: 9.4, price: 30, preferences: ['educational', 'adventurous','outdoors','landmark'] },
    ];

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = selectedRating === 'all' || place.rating >= Number(selectedRating);
        const matchesPrice = place.price <= selectedPrice;
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref => place.preferences.includes(pref));
        return matchesSearch && matchesRating && matchesPrice && matchesPreferences;
    });

    // Event handlers
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handlePriceChange = (e) => setSelectedPrice(e.target.value);
    const handlePreferencesChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedPreferences(value);
    }

    let sortedPlaces = [...filteredPlaces];

    if (sortOrder === 'low-to-high') {
        sortedPlaces = sortedPlaces.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
        sortedPlaces = sortedPlaces.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'lowest-to-highest'){
        sortedPlaces = sortedPlaces.sort((a,b) => a.rating - b.rating);
    } else if (sortOrder === 'highest-to-lowest'){
        sortedPlaces = sortedPlaces.sort((a,b) => b.rating - a.rating);
    }

    return (
        <div>
            <h2>Site Search Page</h2>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '20px', 
                border: '2px solid #ccc', // Adds a border
                borderRadius: '8px', // Rounds the corners
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Optional shadow for better visual effect
                backgroundColor: '#f9f9f9' }}>
                
                {/* Search Bar for places */}
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

            {/* Displaying the filtered results */}
            <div style={{ marginTop: '20px' }}>
                <h3>Results:</h3>
                {sortedPlaces.length > 0 ? (
                    <ul>
                        {sortedPlaces.map((place, index) => (
                            <li key={index}>
                                <strong>{place.name}</strong> - ${place.price} - rated: {place.rating}/10
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

export default SiteSearchPage;
