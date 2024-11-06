import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

const preferencesOptions = [
    { value: 'historic', label: 'Historic Areas' },
    { value: 'beach', label: 'Beaches' },
    { value: 'family', label: 'Family-Friendly' },
    { value: 'shopping', label: 'Shopping' },
];

const ActivitySearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [sortOrder, setSortOrder] = useState('none');
    const [places, setPlaces] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD'); // State for selected currency
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/activity");
                const data = response.data.map(place => ({
                    ...place,
                    date: place.date.split('T')[0] // Assuming date is in ISO format
                }));
                setPlaces(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching activities. Please try again later."); // Set error message
            }
        };
        fetchData();
    }, []);

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || place.category?.activityType === selectedCategory; // Optional chaining
        const matchesRating = selectedRating === '' || place.rating?.toString() === selectedRating; // Optional chaining
        const matchesPrice = place.price <= selectedPrice;
        const matchesDate = !selectedDate || place.date === selectedDate;
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.some(pref =>
            place.tags?.map(tag => tag.tag).includes(pref.value) // Optional chaining
        );

        return matchesSearch && matchesCategory && matchesRating && matchesPrice && matchesDate && matchesPreferences;
    });

    // Log filtered places for debugging
    console.log("Filtered Places:", filteredPlaces);

    // Event handlers
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleRatingChange = (e) => setSelectedRating(e.target.value);
    const handlePriceChange = (e) => setSelectedPrice(Number(e.target.value)); // Convert to number
    const handleDateChange = (e) => setSelectedDate(e.target.value);
    const handleCurrencyChange = (e) => setSelectedCurrency(e.target.value); // Handle currency change
    const handlePreferencesChange = (selectedOptions) => {
        setSelectedPreferences(selectedOptions || []);
        console.log("Selected Preferences:", selectedOptions);
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

            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>} {/* Display error message */}

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

                {/* Category Input */}
                <label style={{ marginLeft: '15px' }}>Category: </label>
                <input
                    type="text"
                    placeholder="Search by category..."
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    style={{ padding: '10px', width: '300px', marginRight: '15px' }}
                />
            </div>

            {/* Preferences Section - Multi-Select Dropdown */}
            <div style={{ marginBottom: '15px' }}>
                <h4>Select Your Preferences:</h4>
                <Select
                    isMulti
                    options={preferencesOptions}
                    onChange={handlePreferencesChange}
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            width: '300px',
                            marginTop: '10px',
                        }),
                    }}
                />
            </div>

            {/* Combined Div Container for Date, Rating, Budget, and Currency */}
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
                
                {/* Currency Selector */}
                <label style={{ marginLeft: '15px' }}>Currency:</label>
                <select value={selectedCurrency} onChange={handleCurrencyChange} style={{ padding: '10px', marginLeft: '10px' }}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="EGP">EGP</option>
                </select>
            </div>

            {/* Sort by Options */}
            <label style={{ marginLeft: '15px' }}>Sort by:</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '10px', marginLeft: '10px' }}>
                <option value="none">None</option>
                <option value="lowest-to-highest">Rating: Low to High</option>
                <option value="highest-to-lowest">Rating: High to Low</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
            </select>

            {/* Displaying the filtered results */}
            <div style={{ marginTop: '20px' }}>
                <h3>Results:</h3>
                <div>
                    {sortedPlaces.length > 0 ? (
                        sortedPlaces.map((item) => (
                            <div key={item.id}>
                                {item.activityType} {/* Safely access activityType */}
                            </div>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            </div>

            {/* Add the "View Upcoming Activities" button */}
            <div style={{ marginTop: '20px' }}>
                <Link to="/UpcomingActivities">
                    <button style={{ padding: '10px 15px' }}>View Upcoming Activities</button>
                </Link>
            </div>
        </div>
    );
};

export default ActivitySearchPage;
