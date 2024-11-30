import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

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
    const [isPaymentModalOpen, setIsPaymentModalOpen]= useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const navigate = useNavigate();

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
                    category: activity.category.activityType,
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
        const matchesCategory = !selectedCategory || place.category === selectedCategory;
        const matchesRating = selectedRating === '' || place.rating?.toString() === selectedRating;
        const matchesPrice = place.price <= selectedPrice;
        const matchesDate = !selectedDate || place.date === selectedDate;
    
        // Ensure that selected preferences match at least one of the tags in the place
        const matchesPreferences =
            selectedPreferences.length === 0 ||
            selectedPreferences.some((pref) =>
                place.tags.some((tag) => tag.toLowerCase() === pref.value.toLowerCase()) // Compare tags directly
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

    // Select an Activity
  const handleActivitySelect = (Activity) => {
    setSelectedActivity(Activity);
    setIsPaymentModalOpen(true); // Open payment modal
  };

  //Handle Wallet Payment
  const handleWalletPayment = () => {
    alert(`Payment via Wallet for ${selectedActivity.name} successful!`);
    setIsPaymentModalOpen(false);
    setSelectedActivity(null);
  };


    // Handle credit card payment
  const handleCreditCardPayment = async () => {
    try {
      // Create a Stripe Checkout session
      const response = await axios.post("http://localhost:4000/stripe/create-checkout-session", {
        itemName: selectedActivity.name,
        itemPrice: selectedActivity.price,
      });

      const sessionUrl = response.data.url; // URL to redirect to Stripe Checkout
      window.location.href = sessionUrl; // Redirect the user to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to redirect to Stripe. Please try again.");
    }
  };
    
      
      if (error) return <div>Error: {error}</div>;

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
                                Category: <span>{place.category}</span> - Price 
                                {selectedCurrency} {convertPrice(place.price).toFixed(2)} - 
                                Rating: {place.rating}/5 - tags: {place.tags.join(', ')}
                            </div>
                            <button
                             onClick={() => handleActivitySelect(place)}
                             style={styles.bookButton}
                            >
                                 Book
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

{/* Payment Modal */}
{isPaymentModalOpen && selectedActivity && (
        <div style={styles.modal}>
          <h4>Selected Activity:</h4>
          <p>
            {selectedActivity.name} on {selectedActivity.date}
          </p>
          <p>
            <strong>Amount to Pay:</strong> {selectedActivity.price}
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


  

export default ActivitySearchPage;


