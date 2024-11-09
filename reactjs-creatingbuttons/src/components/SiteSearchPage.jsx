import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SiteSearchPage = () => {
    // State to manage the search input, category, and additional filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState('all');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
    const [sortOrder, setSortOrder] = useState('none');
    const [currency, setCurrency] = useState('USD'); // Default currency
    const [exchangeRates, setExchangeRates] = useState({ USD: 1, EUR: 0.85, EGP: 15.7 }); // Mock exchange rates


    // Data with ratings, price, date, and preferences
    const [places, setPlaces] = useState([]);
       
    useEffect(() => { 
        axios.get('http://localhost:4000/api/Governor/museums')
            .then((response) => {
                setPlaces(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
     }, []);

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
        const matchesPreferences = 
            selectedPreferences.length === 0 || 
            selectedPreferences[0] === "" || 
            selectedPreferences.every(pref => place?.tags?.includes(pref));
        return matchesSearch && matchesPreferences;
    });

    // Event handlers
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handlePriceChange = (e) => setSelectedPrice(e.target.value);

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
      };

      const convertPrice = (price) => {
        return (price * exchangeRates[currency]).toFixed(2);
      };
      
    const handlePreferencesChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedPreferences(value);
    }

    let sortedPlaces = [...filteredPlaces];

    if (sortOrder === 'low-to-high') {
        sortedPlaces = sortedPlaces.sort((a, b) => (a.ticketPrices?.native || 0) - (b.ticketPrices?.native || 0));
    } else if (sortOrder === 'high-to-low') {
        sortedPlaces = sortedPlaces.sort((a, b) => (b.ticketPrices?.native || 0) - (a.ticketPrices?.native || 0));
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

                <label style={{ marginLeft: '15px' }}>Currency:</label>
<select value={currency} onChange={handleCurrencyChange} style={{ padding: '10px', marginLeft: '10px' }}>
  <option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="EGP">EGP</option>
</select>

            </div>

            {/* Displaying the filtered results */}
            <div style={{ marginTop: '20px' }}>
                <h3>Results:</h3>
                {sortedPlaces.length > 0 ? (
                    <ul>
                        {sortedPlaces.map((place, index) => (
                            <li key={index}>
                                <strong>{place.name || 'No Name Available'}</strong> - 
                                {place.description || 'No Description Available'} - 
                                tags: {place.tags?.join(', ') || 'No Tags'} - 
                                {place.ticketPrices?.native || 0}$
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
