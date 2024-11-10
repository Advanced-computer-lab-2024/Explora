import React, { useState, useEffect } from 'react';
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
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});
    const [error, setError] = useState(null);

    // Dummy data to simulate an API response
    const dummyData = [
        {
            id: 1,
            name: 'Beachside Paradise',
            category: { activityType: 'Beach' },
            rating: 4.5,
            price: 50, // Price in USD
            date: '2024-12-01',
            tags: [{ tag: 'beach' }, { tag: 'family' }],
        },
        {
            id: 2,
            name: 'Historic Ruins Tour',
            category: { activityType: 'Historic' },
            rating: 4.8,
            price: 70,
            date: '2024-12-05',
            tags: [{ tag: 'historic' }, { tag: 'shopping' }],
        },
        {
            id: 3,
            name: 'Family Fun Amusement Park',
            category: { activityType: 'Family-Friendly' },
            rating: 3.9,
            price: 30,
            date: '2024-12-10',
            tags: [{ tag: 'family' }, { tag: 'shopping' }],
        },
        {
            id: 4,
            name: 'Shopping Extravaganza',
            category: { activityType: 'Shopping' },
            rating: 4.2,
            price: 40,
            date: '2024-12-15',
            tags: [{ tag: 'shopping' }],
        }
    ];

    useEffect(() => {
        setPlaces(dummyData);
    }, []);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
                setExchangeRates(response.data.rates);
            } catch (err) {
                setError('Failed to fetch exchange rates');
            }
        };

        fetchExchangeRates();
    }, [selectedCurrency]);

    const convertPrice = (priceInUSD) => {
        if (selectedCurrency === 'USD') return priceInUSD;
        if (exchangeRates[selectedCurrency]) {
            return priceInUSD * exchangeRates[selectedCurrency];
        }
        return priceInUSD;
    };

    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || place.category?.activityType === selectedCategory;
        const matchesRating = selectedRating === '' || place.rating?.toString() === selectedRating;
        const matchesPrice = place.price <= selectedPrice;
        const matchesDate = !selectedDate || place.date === selectedDate;
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.some(pref =>
            place.tags?.map(tag => tag.tag).includes(pref.value)
        );

        return matchesSearch && matchesCategory && matchesRating && matchesPrice && matchesDate && matchesPreferences;
    });

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
        <div className="search-page-container" style={styles.pageContainer}>
            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.searchBarContainer}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.inputField}
                />
                <input
                    type="text"
                    placeholder="Search by category..."
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={styles.inputField}
                />
            </div>

            <div style={styles.selectContainer}>
                <Select
                    isMulti
                    options={preferencesOptions}
                    onChange={(selectedOptions) => setSelectedPreferences(selectedOptions || [])}
                    styles={styles.reactSelect}
                    placeholder="Select Preferences"
                />
            </div>

            <div style={styles.filtersContainer}>
                <div style={styles.filterGroup}>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={styles.selectInput}
                    />
                </div>

                <div style={styles.filterGroup}>
                    <label>Rating:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(e.target.value)}
                        placeholder="Search rating..."
                        style={styles.selectInput}
                    />
                </div>

                <div style={styles.filterGroup}>
                    <label>Budget:</label>
                    <input
                        type="number"
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        style={styles.selectInput}
                    />
                </div>

                <div style={styles.filterGroup}>
                    <label>Currency:</label>
                    <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        style={styles.selectInput}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="EGP">EGP</option>
                    </select>
                </div>

                <div style={styles.filterGroup}>
                    <label>Sort by:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        style={styles.selectInput}
                    >
                        <option value="none">None</option>
                        <option value="lowest-to-highest">Rating: Low to High</option>
                        <option value="highest-to-lowest">Rating: High to Low</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div style={styles.resultsContainer}>
                <h3>Available Activities:</h3>
                <ul style={styles.resultsList}>
                    {sortedPlaces.map((place) => (
                        <li key={place.id} style={styles.resultItem}>
                            <Link to={`/activity/${place.id}`} style={styles.resultLink}>
                                {place.name}
                            </Link>
                            <div style={styles.details}>
                                <span>{place.category.activityType}</span> - 
                                {selectedCurrency} {convertPrice(place.price).toFixed(2)} - 
                                Rating: {place.rating}
                            </div>
                        </li>
                    ))}
                </ul>
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

const styles = {
    pageContainer: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f4f4f9',
        minHeight: '100vh',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
        textAlign: 'center',
    },
    searchBarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    inputField: {
        padding: '10px',
        width: '48%',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    selectContainer: {
        marginBottom: '20px',
    },
    reactSelect: {
        control: (styles) => ({
            ...styles,
            borderRadius: '5px',
            border: '1px solid #ccc',
        }),
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
    selectInput: {
        padding: '8px',
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
    resultLink: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
        textDecoration: 'none',
    },
    details: {
        fontSize: '14px',
        color: '#777',
        marginTop: '5px',
    },
};

export default ActivitySearchPage;
