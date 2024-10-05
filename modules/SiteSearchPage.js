import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SiteSearchPage = () => {
    // State to manage the search input, category, and additional filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState('all');
    const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
    const [sortOrder, setSortOrder] = useState('none');

    // Dummy data with ratings, price, date, and preferences
    const places = [
        { name: 'Egyptian Museum', rating: 4.5, price: 20 },
        { name: 'Pyramids of Giza', rating: 5, price: 50 },
        { name: 'Art Museum', rating: 4.0, price: 15 },
        { name: 'Cairo Tower', rating: 3.5, price: 10 },
        { name: 'Luxor Temple', rating: 4.7, price: 30 },
    ];

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = selectedRating === 'all' || place.rating >= Number(selectedRating);
        const matchesPrice = place.price <= selectedPrice;

        return matchesSearch && matchesRating && matchesPrice;
    });

    // Event handlers
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleRatingChange = (e) => setSelectedRating(e.target.value);
    const handlePriceChange = (e) => setSelectedPrice(e.target.value);

    let sortedPlaces = [...filteredPlaces];

    if (sortOrder === 'low-to-high') {
        sortedPlaces = sortedPlaces.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
        sortedPlaces = sortedPlaces.sort((a, b) => b.price - a.price);
    }

    return (
        <div>
            <h2>Site Search Page</h2>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ padding: '10px', width: '300px', marginRight: '15px' }}
            />

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
                                <strong>{place.name}</strong> - ${place.price} - {place.rating} stars
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
