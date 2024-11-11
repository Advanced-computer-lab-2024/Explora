import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SiteSearchPage = () => {
    // State to manage the search input, category, and additional filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState('all');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
    const [sortOrder, setSortOrder] = useState('none');
    const [currency, setCurrency] = useState('USD'); // Default currency
    const [exchangeRates, setExchangeRates] = useState({ USD: 1, EUR: 0.85, EGP: 50 }); // Mock exchange rates
    const [places, setPlaces] = useState([]);

    // Fetch places data from API
    useEffect(() => {
        axios.get('http://localhost:4000/api/museums')
            .then(response => setPlaces(response.data))
            .catch(error => console.error('Error fetching places:', error));
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
    const handleCurrencyChange = (e) => setCurrency(e.target.value);

    const convertPrice = (price) => {
        return (price * exchangeRates[currency]).toFixed(2);
    };

    const handlePreferencesChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedPreferences(value);
    };

    let sortedPlaces = [...filteredPlaces];

    if (sortOrder === 'low-to-high') {
        sortedPlaces = sortedPlaces.sort((a, b) => (a.ticketPrices?.native || 0) - (b.ticketPrices?.native || 0));
    } else if (sortOrder === 'high-to-low') {
        sortedPlaces = sortedPlaces.sort((a, b) => (b.ticketPrices?.native || 0) - (a.ticketPrices?.native || 0));
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Site Search Page</h2>

            <div style={styles.filtersContainer}>
                {/* Search Bar for places */}
                <input
                    type="text"
                    placeholder="Search by name or tags..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />

                {/* Tags Filter */}
                <div style={styles.filterGroup}>
                    <label>Tags:</label>
                    <input
                        type="text"
                        placeholder="Search tags..."
                        value={selectedPreferences.join(', ')} // Display selected preferences as a string
                        onChange={(e) => setSelectedPreferences(e.target.value.split(',').map(tag => tag.trim()))}
                        style={styles.selectInput}
                    />
                </div>

                {/* Currency Selector */}
                <div style={styles.filterGroup}>
                    <label>Currency:</label>
                    <select value={currency} onChange={handleCurrencyChange} style={styles.selectInput}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="EGP">EGP</option>
                    </select>
                </div>
            </div>

            {/* Sorting and Filtering Options */}
            <div style={styles.filtersContainer}>
                <div style={styles.filterGroup}>
                    <label>Sort by price:</label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={styles.selectInput}>
                        <option value="none">None</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </div>
            </div>

            {/* Displaying the filtered results */}
            <div style={styles.resultsContainer}>
                <h3>Results:</h3>
                {sortedPlaces.length > 0 ? (
                    <ul style={styles.resultsList}>
                        {sortedPlaces.map((place, index) => (
                            <li key={index} style={styles.resultItem}>
                                <strong>{place.name || 'No Name Available'}</strong> - 
                                {place.description || 'No Description Available'} - 
                                Tags: {place.tags?.join(', ') || 'No Tags'} - 
                                Price: {convertPrice(place.ticketPrices?.native || 0)} {currency} - 
                                Location: {place.location} - 
                                Opening Hours: {place.openingHours}
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

const styles = {
    container: {
        padding: '20px',
    },
    heading: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    },
    filtersContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px',
    },
    filterGroup: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '150px',
    },
    searchInput: {
        padding: '10px',
        width: '300px',
        marginRight: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    selectInput: {
        padding: '10px',
        marginLeft: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    resultsContainer: {
        marginTop: '30px',
    },
    resultsList: {
        listStyleType: 'none',
        padding: '0',
    },
    resultItem: {
        padding: '10px',
        backgroundColor: '#fff',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
};

export default SiteSearchPage;