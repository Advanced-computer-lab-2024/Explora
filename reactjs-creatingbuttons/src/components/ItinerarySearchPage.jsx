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
    const [isPaymentModalOpen, setIsPaymentModalOpen]= useState(false);
    const [selectedItinerary, setSelectedItinerary] = useState(null);


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

     // Select an Itinerary
  const handleItinerarySelect = (Itinerary) => {
    setSelectedItinerary(Itinerary);
    setIsPaymentModalOpen(true); // Open payment modal
  };

  //Handle Wallet Payment
  const handleWalletPayment = () => {
    alert(`Payment via Wallet for ${selectedItinerary.name} successful!`);
    setIsPaymentModalOpen(false);
    setSelectedItinerary(null);
  };


    // Handle credit card payment
  const handleCreditCardPayment = async () => {
    try {
      // Create a Stripe Checkout session
      const response = await axios.post("http://localhost:4000/stripe/create-checkout-session", {
        itemName: selectedItinerary.name,
        itemPrice: selectedItinerary.price,
      });

      const sessionUrl = response.data.url; // URL to redirect to Stripe Checkout
      window.location.href = sessionUrl; // Redirect the user to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to redirect to Stripe. Please try again.");
    }
  };

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
                <h3>Available Itineraries:</h3>
                <ul style={styles.resultsList}>
                    {sortedItineraries.map((itinerary) => (
                        <li key={itinerary.id} style={styles.resultItem}>
                            <Link to={`/itinerary/${itinerary.id}`} style={styles.resultLink}>
                                {itinerary.name} - {selectedCurrency} {convertPrice(itinerary.budget).toFixed(2)} (Rating: {itinerary.rating}) - Date: {itinerary.date}
                            </Link>
                            <button
                             onClick={() => handleItinerarySelect(itinerary)}
                             style={styles.bookButton}
                            >
                                 Book
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Payment Modal */}
{isPaymentModalOpen && selectedItinerary && (
        <div style={styles.modal}>
          <h4>Selected Itinerary:</h4>
          <p>
            {selectedItinerary.name} on {selectedItinerary.date}
          </p>
          <p>
            <strong>Amount to Pay:</strong> {selectedItinerary.price}
          </p>
          <h4>Choose Payment Method:</h4>
          <div style={styles.modalButtonContainer}>
          <button onClick={handleCreditCardPayment} style={styles.creditCardButton}>
            Pay with Credit Card
          </button>
          <button onClick={handleWalletPayment} style={styles.bookButton}>
            Pay with Wallet
          </button>
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          </div>
        </div>
      )}

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
    details: {
        fontSize: '14px',
        color: '#777',
        marginTop: '5px',
    },
    bookButton: {
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      },   
      modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        textAlign: 'center',
      },
      modalButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
        marginTop: '20px',
      },
      modalButton: {
        flex: '1',
        padding: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        color: 'white',
        transition: 'background-color 0.3s',
      },
      creditCardButton: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '10px',
      },
      cancelButton: {
        padding: '10px 15px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
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
