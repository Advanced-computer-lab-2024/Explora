import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SiteSearchPage = () => {
    // State to manage the search input, category, and additional filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState('all');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
    const [sortOrder, setSortOrder] = useState('none');
    const navigate = useNavigate();


    // Dummy data with ratings, price, date, and preferences
    const [places, setPlaces] = useState([]);
       
    useEffect(() => { 
        fetch('http://localhost:4000/api/museums/museums')
        .then(response => response.json())
        .then(data => {
            setPlaces(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
     }, []);

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences[0]==="" || (Array.isArray(place.tags) && selectedPreferences.every(pref => place.tags.includes(pref)));
        return matchesSearch && matchesPreferences;
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
        sortedPlaces = sortedPlaces.sort((a, b) => a.ticketPrices.native - b.ticketPrices.native );
    } else if (sortOrder === 'high-to-low') {
        sortedPlaces = sortedPlaces.sort((a, b) => b.ticketPrices.native  - a.ticketPrices.native );
    } 
    
    return (
        <div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
            zIndex: 1100,
          }}
        >
          Back
        </button>
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
        <strong>{place.name}</strong> - {place.description} - tags: {Array.isArray(place.tags) ? place.tags.join(', ') : 'No tags available'} - {place.ticketPrices.native}$
    </li>
))}
                    </ul>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default SiteSearchPage;