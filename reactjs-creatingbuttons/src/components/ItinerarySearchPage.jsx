import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Ensure this library is installed
import { Link } from 'react-router-dom';


const ItinerarySearchPage = () => {
  const preferencesOptions = [
    { value: 'historic', label: 'Historic Areas' },
    { value: 'beach', label: 'Beaches' },
    { value: 'family', label: 'Family-Friendly' },
    { value: 'shopping', label: 'Shopping' },
  ];

  // State to manage the search input, category, and additional filters
  const [searchTerm, setSearchTerm] = useState('');
  const [budgetSearchTerm, setBudgetSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState(299999000); // Default max price
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [currency, setCurrency] = useState('USD'); // Default currency
  const [exchangeRates, setExchangeRates] = useState({ USD: 1, EUR: 0.85, EGP: 15.7 }); // Mock exchange rates
  const [places, setPlaces] = useState([]); // State for storing fetched places

  useEffect(() => {
    fetch('http://localhost:4000/api/tour_guide_itinerary/')
      .then(response => response.json())
      .then(data => {
        data = data.map((place) => {
          return { ...place, date: place.date.split('T')[0] }
        });
        setPlaces(data);
      });
  }, []);

  // Dummy data with ratings, price, date, and preferences
  // Replace with actual data if needed
  const samplePlaces = [
    {
      id: 1,
      name: "Eiffel Tower",
      price: 50,
      rating: 4.8,
      date: "2024-11-10",
      language: "French",
      tags: ['historic', 'beach'],
    },
    {
      id: 2,
      name: "Louvre Museum",
      price: 20,
      rating: 4.7,
      date: "2024-11-12",
      language: "French",
      tags: ['historic', 'shopping'],
    },
    {
      id: 3,
      name: "Disneyland",
      price: 100,
      rating: 4.9,
      date: "2024-11-15",
      language: "English",
      tags: ['family', 'shopping'],
    },
    {
      id: 4,
      name: "Bondi Beach",
      price: 0,
      rating: 4.6,
      date: "2024-11-18",
      language: "English",
      tags: ['beach'],
    },
  ];

  // Filtering logic
  const filteredPlaces = samplePlaces.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBudget = place.price <= selectedPrice;
    const matchesLanguage = place.language.toLowerCase().includes(selectedLanguage.toLowerCase());
    const matchesRating = selectedRating === 'all' || place.rating >= Number(selectedRating);
    const matchesDate = !selectedDate || place.date === selectedDate;
    const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.some(pref =>
      place.tags?.includes(pref.value)
    );
    return matchesSearch && matchesRating && matchesDate && matchesPreferences && matchesLanguage && matchesBudget;
  });

  // Event handlers
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleBudgetChange = (e) => setBudgetSearchTerm(e.target.value);
  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);
  const handlePriceChange = (e) => setSelectedPrice(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handlePreferencesChange = (selectedOptions) => {
    setSelectedPreferences(selectedOptions || []);
    console.log("Selected Preferences:", selectedOptions);
  };

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
    <div>
      <h2>Itinerary Search Page</h2>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '20px', 
        border: '2px solid #ccc', 
        borderRadius: '8px', 
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', 
        backgroundColor: '#f9f9f9' }}>
        
        {/* Search Bar */}
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
          value={selectedPreferences.join(', ')}
          onChange={(e) => setSelectedPreferences(e.target.value.split(',').map(tag => tag.trim()))}
          style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '20px', 
        border: '2px solid #ccc', 
        borderRadius: '8px', 
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', 
        backgroundColor: '#f9f9f9' }}>
        
        {/* Budget Filter */}
        <label style={{ marginLeft: '15px' }}>Budget:</label>
        <input 
          type="number" 
          placeholder="Max Price" 
          value={selectedPrice} 
          onChange={handlePriceChange} 
          style={{ padding: '10px', marginLeft: '10px', width: '80px' }} 
        />

        {/* Language Dropdown */}
        <label style={{ marginLeft: '15px' }}>Language: </label>
        <input
          type="text"
          placeholder="Search by language..."
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{ padding: '10px', width: '300px', marginRight: '15px' }}
        />

        {/* Date Picker */}
        <label style={{ marginLeft: '15px' }}>Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} style={{ padding: '10px', marginLeft: '10px' }} />

        <label style={{ marginLeft: '15px' }}>Currency:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ padding: '10px', marginLeft: '10px' }}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="EGP">EGP</option>
        </select>
      </div>

      {/* Preferences Selection */}
      <div style={{ marginBottom: '15px' }}>
        <h4>Select Your Preferences:</h4>
        <Select
          isMulti
          options={preferencesOptions}
          onChange={handlePreferencesChange}
          styles={{
            control: (provided) => ({
              ...provided,
              width: '300px',
              marginTop: '10px',
            }),
          }}
        />
      </div>

      {/* Sort by Rating */}
      <label style={{ marginLeft: '15px' }}>Sort by Rating:</label>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '10px', marginLeft: '10px' }}>
        <option value="none">None</option>
        <option value="lowest-to-highest">Low to High</option>
        <option value="highest-to-lowest">High to Low</option>
      </select>

      <label style={{ marginLeft: '15px' }}>Sort by Price:</label>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '10px', marginLeft: '10px' }}>
        <option value="none">None</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>

      {/* Button to View All Upcoming Itineraries */}
      <div style={{ marginTop: '20px' }}>
      <Link
        to="/UpcomingItineraries"
        style={{
          padding: '10px 15px',
          backgroundColor: '#000000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          textDecoration: 'none',
          display: 'inline-block',
          cursor: 'pointer',
        }}
      >
        View All Upcoming Itineraries
      </Link>

      </div>

      {/* Results Section */}
      <div style={{ marginTop: '20px' }}>
        <h3>Results:</h3>
        {sortedPlaces.length > 0 ? (
          <ul>
            {sortedPlaces.map((place, index) => (
              <li key={index}>
                {place.name} - {place.price} {currency} (Rating: {place.rating}) - Date: {place.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default ItinerarySearchPage;
