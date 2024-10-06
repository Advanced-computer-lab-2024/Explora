import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ActivitySearchPage = () => {
    // State to manage the search input, category, and additional filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedRating, setSelectedRating] = useState(''); // Change to '' for empty input
    const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [sortOrder, setSortOrder] = useState('none');

    // Dummy data with ratings, price, date, and preferences
    const places = [
        { name: 'Visit to Egyptian Museum', category: 'museum visit', rating: 9, price: 20, date: '2024-10-10', preferences: ['family-friendly', 'educational'] },
        { name: 'Visit to Pyramids of Giza', category: 'historical place visit', rating: 9.3, price: 55, date: '2024-11-01', preferences: ['adventurous', 'outdoors'] },
        { name: 'Visit to Art Museum', category: 'museum visit', rating: 8, price: 15, date: '2024-09-20', preferences: ['cultural', 'budget-friendly', 'educational'] },
        { name: 'Visit to Cairo Tower', category: 'landmark visit', rating: 7, price: 10, date: '2024-12-05', preferences: ['scenic', 'family-friendly', 'budget-friendly'] },
        { name: 'Visit to Luxor Temple', category: 'historical place visit', rating: 9.4, price: 30, date: '2024-10-25', preferences: ['educational', 'adventurous', 'outdoors'] },
        { name: 'Ski Egypt', category: 'entertainment', rating: 9.9, price: 20, date: '2024-10-26', preferences: ['adventurous', 'family-friendly'] },
        { name: 'Go Kart at Autovrooom Cairo', category: 'entertainment', rating: 9.8, price: 40, date: '2024-10-24', preferences: ['family-friendly', 'adventurous', 'outdoors'] },
        { name: 'Gravity Code', category: 'entertainment', rating: 8.5, price: 44, date: '2024-10-17', preferences: ['family-friendly', 'adventurous'] },
        { name: 'Air Zone Egypt', category: 'entertainment', rating: 9.1, price: 38, date: '2024-10-28', preferences: ['family-friendly', 'adventurous', 'outdoors'] }
    ];

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
        const matchesRating = selectedRating === '' || place.rating.toString() === selectedRating; // Exact match for rating
        const matchesPrice = place.price <= selectedPrice;
        const matchesDate = !selectedDate || place.date === selectedDate;
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref => place.preferences.includes(pref));

        return matchesSearch && matchesCategory && matchesRating && matchesPrice && matchesDate && matchesPreferences;
    });

    // Event handlers
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleRatingChange = (e) => setSelectedRating(e.target.value); // Keep this as a string for exact match
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
    }

    return (
        <div>
            <h1>Activity Search Page</h1>

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

                {/* Tags Search Bar */}
                <label style={{ marginLeft: '15px' }}>Tags:</label>
                <input
                    type="text"
                    placeholder="Search tags..."
                    value={selectedPreferences.join(', ')} // Display selected preferences as a string
                    onChange={(e) => setSelectedPreferences(e.target.value.split(',').map(tag => tag.trim()))} // Update selected preferences based on input
                    style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
                />
                <label style={{ marginLeft: '15px' }}>Category: </label>
                <select value={selectedCategory} onChange={handleCategoryChange} style={{ padding: '10px', marginLeft: '10px' }}>
                    <option value="all">All Categories</option>
                    <option value="museum visit">Museum Visit</option>
                    <option value="historical place visit">Historical Place Visit</option>
                    <option value="landmark visit">Landmark Visit</option>
                    <option value="entertainment">Entertainment</option>
                </select>
            </div>

            {/* Combined Div Container for Category, Date, Rating, and Budget */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '20px', 
                border: '2px solid #ccc', // Adds a border
                borderRadius: '8px', // Rounds the corners
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Optional shadow for better visual effect
                backgroundColor: '#f9f9f9' }}>
                
                {/* Category Dropdown */}
                <label style={{ marginLeft: '15px' }}>Category: </label>
                <select value={selectedCategory} onChange={handleCategoryChange} style={{ padding: '10px', marginLeft: '10px' }}>
                    <option value="all">All Categories</option>
                    <option value="museum visit">Museum Visit</option>
                    <option value="historical place visit">Historical Place Visit</option>
                    <option value="landmark visit">Landmark Visit</option>
                    <option value="entertainment">Entertainment</option>
                </select>

                {/* Date Picker */}
                <label style={{ marginLeft: '15px' }}>Date:</label>
                <input type="date" value={selectedDate} onChange={handleDateChange} style={{ padding: '10px', marginLeft: '10px' }} />

                {/* Rating Input */}
                <label style={{ marginLeft: '15px' }}>Rating:</label>
                <input 
                    type="text" 
                    placeholder="Search rating..." 
                    value={selectedRating} 
                    onChange={handleRatingChange} 
                    style={{ padding: '10px', marginLeft: '10px', width: '80px' }} 
                />

                {/* Budget Input */}
                <label style={{ marginLeft: '15px' }}>Budget:</label>
                <input 
                    type="number" 
                    placeholder="Max Price" 
                    value={selectedPrice} 
                    onChange={handlePriceChange} 
                    style={{ padding: '10px', marginLeft: '10px', width: '80px' }} 
                />
            </div>

            {/* Sort by Rating */}
            <label style={{ marginLeft: '15px' }}>Sort by Rating:</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '10px', marginLeft: '10px' }}>
                <option value="none">None</option>
                <option value="lowest-to-highest">Low to High</option>
                <option value="highest-to-lowest">High to Low</option>
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
                                <strong>{place.name}</strong> - {place.category} - ${place.price} - rated: {place.rating}/10
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
                    View All Upcoming Activities
                </button>
            </Link>
        </div>
    );
};

export default ActivitySearchPage;
