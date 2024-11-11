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
    const [selectedPrice, setSelectedPrice] = useState(9999999); // Default max price
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [sortOrder, setSortOrder] = useState('none');
    const [places, setPlaces] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/activity');
                const activities = response.data.map(activity => ({
                    id: activity._id,
                    name: activity.name,
                    date: activity.date,
                    time: activity.time,
                    location: activity.location,
                    price: activity.price,
                    category: activity.category?.activityType || 'General',
                    tags: activity.tags.map(tag => tag.tag),
                }));
                setPlaces(activities);
            } catch (err) {
                setError('Failed to fetch activities');
            }
        };

        fetchActivities();
    }, []);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
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
        const matchesCategory = !selectedCategory || place.category === selectedCategory;
        const matchesRating = selectedRating === '' || place.rating?.toString() === selectedRating;
        const matchesPrice = place.price <= selectedPrice;
        const matchesDate = !selectedDate || place.date === selectedDate;
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.some(pref =>
            place.tags.includes(pref.value)
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
                        onChange={(e) => setSelectedPrice(Number(e.target.value))}
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
                                Category: <span>{place.category}</span> - Price 
                                {selectedCurrency} {convertPrice(place.price).toFixed(2)} - 
                                Rating: {place.rating || 'N/A'}/5 - tags: {place.tags.join(', ')}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Link to="/UpcomingActivities">
                    <button style={{ padding: '10px 15px' }}>View Upcoming Activities</button>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: { maxWidth: '800px', padding: '20px', margin: '0 auto' },
    error: { color: 'red' },
    searchBarContainer: { display: 'flex', gap: '8px', marginBottom: '15px' },
    inputField: { padding: '10px', flex: 1 },
    selectContainer: { marginBottom: '15px' },
    filtersContainer: { display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '15px' },
    filterGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
    selectInput: { padding: '10px' },
    resultsContainer: { marginTop: '20px' },
    resultsList: { listStyle: 'none', padding: 0 },
    resultItem: { padding: '10px', borderBottom: '1px solid #ccc' },
    resultLink: { fontWeight: 'bold', fontSize: '16px', color: 'blue', textDecoration: 'none' },
    details: { marginTop: '5px', color: '#555' },
};

export default ActivitySearchPage;
