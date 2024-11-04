import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const ActivitySearchPage = () => {
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('');
const [selectedRating, setSelectedRating] = useState(''); // Change to '' for empty input
const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
const [selectedDate, setSelectedDate] = useState('');
const [selectedPreferences, setSelectedPreferences] = useState([]);
const [sortOrder, setSortOrder] = useState('none');
const [places, setPlaces] = useState([]);

useEffect(() => {
    axios.get(`http://localhost:4000/api/activity`)
    .then(response => {
        const data = response.data.map(place => ({
            ...place,
            date: place.date.split('T')[0]
        }));
        setPlaces(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}, []);

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || place.category.activityType === selectedCategory;
        const matchesRating = selectedRating === '' || place.rating.toString() === selectedRating;
        const matchesPrice = place.price <= selectedPrice;
        const matchesDate = !selectedDate || place.date === selectedDate;
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref =>
            place.tags.map(tag => tag.tag).includes(pref)
        );

        return matchesSearch && matchesCategory && matchesRating && matchesPrice && matchesDate && matchesPreferences;
    });

// Event handlers
const handleSearchChange = (e) => setSearchTerm(e.target.value);
const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
const handleRatingChange = (e) => setSelectedRating(e.target.value);
const handlePriceChange = (e) => setSelectedPrice(Number(e.target.value)); // Convert to number
const handleDateChange = (e) => setSelectedDate(e.target.value);
const handlePreferencesChange = (e) => {
    const value = e.target.value.split(',').map(tag => tag.trim());
    setSelectedPreferences(value);
};

 let sortedPlaces = [...filteredPlaces];
    if (sortOrder === 'low-to-high') {
        sortedPlaces.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
        sortedPlaces.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'lowest-to-highest') {
        sortedPlaces.sort((a, b) => a.rating - b.rating);
    } else if (sortOrder === 'highest-to-lowest') {
        sortedPlaces.sort((a, b) => b.rating - a.rating);
    }
    return (
        <div>
            <h1>Activity Search Page</h1>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '20px', 
                border: '2px solid #ccc', 
                borderRadius: '8px', 
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', 
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
                    value={selectedPreferences.join(', ')}
                    onChange={handlePreferencesChange}
                    style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
                />
                <label style={{ marginLeft: '15px' }}>Category: </label>
                <input
                    type="text"
                    placeholder="Search by category..."
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    style={{ padding: '10px', width: '300px', marginRight: '15px' }}
                />
            </div>

            {/* Combined Div Container for Category, Date, Rating, and Budget */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '20px', 
                border: '2px solid #ccc', 
                borderRadius: '8px', 
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', 
                backgroundColor: '#f9f9f9' }}>
            
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
                <div>
                    {sortedPlaces.map(item => ( // Map through sortedPlaces
                        <div key={item.id}>
                            {item.activityType} {/* Safely access activityType */}
                        </div>
                    ))}
                </div>
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
