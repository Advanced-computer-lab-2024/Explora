import React, { useState } from 'react';

const SiteSearchPage = () => {
    // State to manage the search input, category, and additional filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState('all');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
    const [sortOrder, setSortOrder] = useState('none');
    const [currency, setCurrency] = useState('USD'); // Default currency
    const [exchangeRates, setExchangeRates] = useState({ USD: 1, EUR: 0.85, EGP: 50 }); // Mock exchange rates

    // Dummy data with ratings, price, date, and preferences
    const places = [
        {
            name: "Museum of Art",
            description: "A great museum with historical art.",
            tags: ["art", "history", "culture"],
            ticketPrices: { native: 15 },
        },
        {
            name: "Science Center",
            description: "Explore the wonders of science with interactive exhibits.",
            tags: ["science", "education", "interactive"],
            ticketPrices: { native: 20 },
        },
        {
            name: "Botanical Garden",
            description: "Beautiful garden with rare species of plants.",
            tags: ["nature", "plants", "outdoor"],
            ticketPrices: { native: 10 },
        },
        {
            name: "History Museum",
            description: "Dive deep into the history of the world.",
            tags: ["history", "culture", "museum"],
            ticketPrices: { native: 25 },
        },
        {
            name: "Aquarium",
            description: "Experience the beauty of marine life.",
            tags: ["animals", "water", "marine"],
            ticketPrices: { native: 18 },
        },
    ];

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
                    placeholder="Search by name..."
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
                                tags: {place.tags?.join(', ') || 'No Tags'} - 
                                {convertPrice(place.ticketPrices?.native || 0)} {currency}
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
