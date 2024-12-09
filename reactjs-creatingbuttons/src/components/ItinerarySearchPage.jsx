import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Ensure this library is installed
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const preferencesOptions = [
    { value: 'historic', label: 'Historic Areas' },
    { value: 'beach', label: 'Beaches' },
    { value: 'family', label: 'Family-Friendly' },
    { value: 'shopping', label: 'Shopping' },
];

const ItinerarySearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]); // No tags selected initially
    const [selectedLanguage, setSelectedLanguage] = useState(''); // No language filter initially
    const [selectedBudget, setSelectedBudget] = useState(null); // No budget filter initially
    const [selectedDate, setSelectedDate] = useState(''); // No date selected initially
    const [selectedPreferences, setSelectedPreferences] = useState([]); // No preferences selected initially
    const [sortByRating, setSortByRating] = useState('none'); // No sorting applied initially
    const [sortByPrice, setSortByPrice] = useState('none'); // No sorting applied initially
    const [itineraries, setItineraries] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default currency is USD
    const [exchangeRates, setExchangeRates] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/tour_guide_itinerary/all');
                console.log(response.data);  // Add a console log here to inspect the data
                const itins = response.data.map(itinerary => ({
                    id: itinerary._id,
                    tourGuideName: itinerary.tourGuideName,
                    locations: itinerary.locations,
                    timeline: itinerary.timeline,
                    duration: itinerary.duration,
                    language: itinerary.language,
                    price: itinerary.price,
                    availableDates: itinerary.availableDates,
                    availableTimes: itinerary.availableTimes,
                    accessibility: itinerary.accessibility,
                    pickupLocation: itinerary.pickupLocation,
                    dropoffLocation: itinerary.dropoffLocation,
                    tags: itinerary.tags,
                    rating: itinerary.rating,
                }));
                setItineraries(itins);
            } catch (err) {
                setError('Failed to fetch itineraries');
            }
        };
        fetchItineraries();
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

    // Apply budget filter only if a valid budget is selected
    const filteredItineraries = itineraries.filter((itinerary) => {
        const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => itinerary.tags.includes(tag.value));
        const matchesLanguage = !selectedLanguage || itinerary.language.toLowerCase() === selectedLanguage.toLowerCase();
        const matchesBudget = selectedBudget === null || itinerary.price <= selectedBudget;
        const matchesDate = !selectedDate || itinerary.availableDates.some(date => {
            const availableDate = new Date(date).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
            return availableDate === selectedDate;
        });
        const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.some(pref =>
            itinerary.tags.includes(pref.value)
        );

        return matchesTags && matchesLanguage && matchesBudget && matchesDate && matchesPreferences;
    });

    let sortedItineraries = [...filteredItineraries];
    if (sortByPrice === 'low-to-high') {
        sortedItineraries.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === 'high-to-low') {
        sortedItineraries.sort((a, b) => b.price - a.price);
    }

    if (sortByRating === 'lowest-to-highest') {
        sortedItineraries.sort((a, b) => a.rating - b.rating);
    } else if (sortByRating === 'highest-to-lowest') {
        sortedItineraries.sort((a, b) => b.rating - a.rating);
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
        <div className="search-page-container" style={styles.pageContainer}>
            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.searchBarContainer}>
                <Select
                    isMulti
                    options={preferencesOptions}
                    onChange={(selectedOptions) => setSelectedTags(selectedOptions || [])}
                    styles={styles.reactSelect}
                    placeholder="Search tags..."
                />
            </div>

            <div style={styles.filtersContainer}>
                <div style={styles.filterGroup}>
                    <label>Budget:</label>
                    <input
                        type="number"
                        value={selectedBudget || ''}
                        onChange={(e) => setSelectedBudget(e.target.value ? parseInt(e.target.value) : null)} // Allow empty value to reset budget
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
                <h3>Itineraries:</h3>
                <ul style={styles.resultsList}>
                    {sortedItineraries.length === 0 ? (
                        <p>No itineraries found.</p>
                    ) : (
                        sortedItineraries.map((itinerary) => (
                            <li key={itinerary.id} style={styles.resultItem}>
                                <Link to={`/itinerary/${itinerary.id}`} style={styles.resultLink}>
                                    {selectedCurrency} {convertPrice(itinerary.price).toFixed(2)} - (Rating: {itinerary.rating}) - Date: {itinerary.availableDates.join(', ')}
                                </Link>
                                <div style={styles.additionalInfo}>
                                    <p>Language: {itinerary.language}</p>
                                    <p>Tags: {itinerary.tags.join(', ')}</p>
                                </div>
                            </li>
                        ))
                    )}
                </ul>

                {/* View Upcoming Itineraries Button */}
                <div style={styles.viewButtonContainer}>
                    <Link to="/UpcomingItineraries" style={styles.viewButton}>
                        View Upcoming Itineraries
                    </Link>
                </div>
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

export default ItinerarySearchPage;