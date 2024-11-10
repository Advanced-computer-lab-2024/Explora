import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Ensure this library is installed
import { Link } from 'react-router-dom';
import axios from 'axios';

const preferencesOptions = [
    { value: 'historic', label: 'Historic Areas' },
    { value: 'beach', label: 'Beaches' },
    { value: 'family', label: 'Family-Friendly' },
    { value: 'shopping', label: 'Shopping' },
];

const ItinerarySearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedBudget, setSelectedBudget] = useState(100); // Default max budget
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [sortByRating, setSortByRating] = useState('none');
    const [sortByPrice, setSortByPrice] = useState('none');
    const [itineraries, setItineraries] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setItineraries(dummyItineraries);
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

    const filteredItineraries = itineraries.filter((itinerary) => {
        const matchesSearch = itinerary.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => itinerary.tags.includes(tag.value));
        const matchesLanguage = !selectedLanguage || itinerary.language.toLowerCase() === selectedLanguage.toLowerCase();
        const matchesBudget = itinerary.budget <= selectedBudget;
        const matchesDate = !selectedDate || itinerary.date === selectedDate;
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.some(pref =>
            itinerary.tags.includes(pref.value)
        );

        return matchesSearch && matchesTags && matchesLanguage && matchesBudget && matchesDate && matchesPreferences;
    });

    let sortedItineraries = [...filteredItineraries];
    if (sortByPrice === 'low-to-high') {
        sortedItineraries.sort((a, b) => a.budget - b.budget);
    } else if (sortByPrice === 'high-to-low') {
        sortedItineraries.sort((a, b) => b.budget - a.budget);
    }

    if (sortByRating === 'lowest-to-highest') {
        sortedItineraries.sort((a, b) => a.rating - b.rating);
    } else if (sortByRating === 'highest-to-lowest') {
        sortedItineraries.sort((a, b) => b.rating - a.rating);
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
                    placeholder="Search tags..."
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e.target.value)}
                    style={styles.inputField}
                />
            </div>

            <div style={styles.filtersContainer}>
                <div style={styles.filterGroup}>
                    <label>Budget:</label>
                    <input
                        type="number"
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(e.target.value)}
                        style={styles.selectInput}
                    />
                </div>

                <div style={styles.filterGroup}>
                    <label>Language:</label>
                    <input
                        type="text"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        placeholder="Search by language..."
                        style={styles.selectInput}
                    />
                </div>

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
                    <label>Select Preferences:</label>
                    <Select
                        isMulti
                        options={preferencesOptions}
                        onChange={(selectedOptions) => setSelectedPreferences(selectedOptions || [])}
                        styles={styles.reactSelect}
                        placeholder="Select..."
                    />
                </div>

                <div style={styles.filterGroup}>
                    <label>Sort by Rating:</label>
                    <select
                        value={sortByRating}
                        onChange={(e) => setSortByRating(e.target.value)}
                        style={styles.selectInput}
                    >
                        <option value="none">None</option>
                        <option value="lowest-to-highest">Low to High</option>
                        <option value="highest-to-lowest">High to Low</option>
                    </select>
                </div>

                <div style={styles.filterGroup}>
                    <label>Sort by Price:</label>
                    <select
                        value={sortByPrice}
                        onChange={(e) => setSortByPrice(e.target.value)}
                        style={styles.selectInput}
                    >
                        <option value="none">None</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </div>
            </div>

            <div style={styles.resultsContainer}>
                <h3>Upcoming Itineraries:</h3>
                <ul style={styles.resultsList}>
                    {sortedItineraries.map((itinerary) => (
                        <li key={itinerary.id} style={styles.resultItem}>
                            <Link to={`/itinerary/${itinerary.id}`} style={styles.resultLink}>
                                {itinerary.name} - {selectedCurrency} {convertPrice(itinerary.budget).toFixed(2)} (Rating: {itinerary.rating}) - Date: {itinerary.date}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* View Upcoming Itineraries Button */}
                <div style={styles.viewButtonContainer}>
                    <Link to="/UpcomingItineraries" style={styles.viewButton}>
                        View Upcoming Itineraries
                    </Link>
                </div>
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
    filtersContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
    },
    filterGroup: {
        margin: '10px',
        minWidth: '150px',
    },
    selectInput: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    },
    resultsContainer: {
        marginTop: '30px',
    },
    resultsList: {
        listStyleType: 'none',
        padding: 0,
    },
    resultItem: {
        backgroundColor: '#fff',
        padding: '10px',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    resultLink: {
        fontSize: '18px',
        textDecoration: 'none',
        color: '#333',
    },
    viewButtonContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    viewButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '16px',
    },
    reactSelect: {
        control: (styles) => ({
            ...styles,
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
        }),
    },
};

const dummyItineraries = [
    {
        id: 1,
        name: 'Historic Cairo Tour',
        budget: 80,
        rating: 4.5,
        date: '2024-12-01',
        tags: ['historic', 'family'],
        language: 'English',
    },
    {
        id: 2,
        name: 'Beach Holiday in Alexandria',
        budget: 120,
        rating: 4.7,
        date: '2024-12-15',
        tags: ['beach', 'shopping'],
        language: 'Arabic',
    },
    {
        id: 3,
        name: 'Luxor Adventure',
        budget: 100,
        rating: 4.3,
        date: '2024-11-30',
        tags: ['historic', 'shopping'],
        language: 'English',
    },
    {
        id: 4,
        name: 'Family Tour in Giza',
        budget: 90,
        rating: 4.6,
        date: '2024-12-05',
        tags: ['family', 'historic'],
        language: 'Arabic',
    },
];

export default ItinerarySearchPage;