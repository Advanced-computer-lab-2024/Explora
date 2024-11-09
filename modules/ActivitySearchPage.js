import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ActivitySearchPage = () => {
    // State to manage the search input, category, and additional filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRating, setSelectedRating] = useState(''); // Change to '' for empty input
    const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [sortOrder, setSortOrder] = useState('none');

    // Dummy data with ratings, price, date, and preferences
    const [places,setPlaces]=useState([])

useEffect(() => {
fetch('http://localhost:4000/api/activity/').then(response => response.json()).then(data => {  
    data=data.map((place)=>{return {...place,date:place.date.split('T')[0]}})
    setPlaces(data);
})

},[])

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = place.category.activityType.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesRating = selectedRating === '' || place.rating.toString() === selectedRating; // Exact match for rating
        const matchesPrice = place.price <= selectedPrice;
        const matchesDate = !selectedDate || place.date === selectedDate;
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref => place.tags.map((tag)=>tag.tag).includes(pref));

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
    if (sortOrder === 'lowest-to-highest') {
        sortedPlaces = sortedPlaces.sort((a, b) => a.rating - b.rating);
    } else if (sortOrder === 'highest-to-lowest') {
        sortedPlaces = sortedPlaces.sort((a, b) => b.rating - a.rating);
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
                border: '2px solid #ccc', // Adds a border
                borderRadius: '8px', // Rounds the corners
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Optional shadow for better visual effect
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
                {sortedPlaces.length > 0 ? (
                    <ul>
                        {sortedPlaces.map((place, index) => (
                            <li key={index}>
                                <strong>{place.name}</strong> - {place.category.activityType} - ${place.price} - rated: {place.rating}/10 - date: {place.date}
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
            <Link to="/EventActivityItineraryBooking">
               <button style={{ padding: '10px', margin: '10px', fontSize: '16px' }}>Book a ticket to an activity</button>
           </Link>
        </div>
    );
};

export default ActivitySearchPage;

