import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const ItinerarySearchPage = () => {

  // State to manage the search input, category, and additional filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState(100); // Default max price
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');
  // Dummy data with ratings, price, date, and preferences
  const places = [
    { name: 'Egyptian Museum',Language:'Arabic Tour', category: 'museum tour', rating: 4.5, price: 20, date: '2024-10-10', preferences: [ 'educational', 'museum tour'] },
    { name: 'Egyptian Museum',Language:'Spanish Tour', category: 'museum tour', rating: 4.5, price: 28, date: '2024-10-10', preferences: ['educational', 'museum tour'] },
    { name: 'Egyptian Museum',Language:'English Tour', category: 'museum tour', rating: 4.5, price: 22, date: '2024-10-10', preferences: ['educational', 'museum tour'] },
    { name: 'Pyramids of Giza',Language:'Arabic Tour', category: 'historical place tour', rating: 5, price: 50, date: '2024-11-01', preferences: ['adventurous', 'outdoors','landmark'] },
    { name: 'Pyramids of Giza',Language:'English Tour', category: 'historical place tour', rating: 5, price: 53, date: '2024-11-01', preferences: ['adventurous', 'outdoors','landmark'] },
    { name: 'Pyramids of Giza',Language:'Italian Tour', category: 'historical place tour', rating: 4.8, price: 55, date: '2024-11-01', preferences: ['adventurous', 'outdoors','landmark'] },
    { name: 'Art Museum',Language:'Arabic Tour', category: 'museum tour', rating: 4.0, price: 15, date: '2024-09-20', preferences: ['cultural', 'budget-friendly','educational','museum tour'] },
    { name: 'Cairo Tower',Language:'Arabic Tour',category: 'landmark tour', rating: 3.5, price: 10, date: '2024-12-05', preferences: ['scenic','budget-friendly','landmark'] },
    { name: 'Luxor Temple',Language:'Arabic Tour', category: 'historical place tour', rating: 4.7, price: 30, date: '2024-10-25', preferences: ['educational', 'adventurous','outdoors','landmark'] },
    { name: 'Luxor Temple',Language:'German Tour', category: 'historical place tour', rating: 4.7, price: 40, date: '2024-10-25', preferences: ['educational', 'adventurous','outdoors','landmark'] }
  ];

  // Filtering logic
  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all languages' || place.Language === selectedLanguage;
    const matchesRating = selectedRating === 'all' || place.rating >= Number(selectedRating);
    const matchesPrice = place.price <= selectedPrice;
    const matchesDate = !selectedDate || place.date === selectedDate;
    const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref => place.preferences.includes(pref));
    
    return matchesSearch && matchesRating && matchesPrice && matchesDate && matchesPreferences && matchesLanguage;
  });

  // Event handlers
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);
  const handleRatingChange = (e) => setSelectedRating(e.target.value);
  const handlePriceChange = (e) => setSelectedPrice(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handlePreferencesChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedPreferences(value);
  };

  let sortedPlaces = [...filteredPlaces];

  if (sortOrder === 'low-to-high'){
    sortedPlaces = sortedPlaces.sort((a,b)=>a.price -b.price);
  } else if (sortOrder === 'high-to-low'){
    sortedPlaces = sortedPlaces.sort((a,b)=>b.price -a.price);
  }


  return (
    <div>
      <h2>Itinerary Search Page</h2>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: '10px', width: '300px', marginRight: '15px' }}
      />

      

      {/* Language Dropdown */}
     <select value={selectedLanguage} onChange={handleLanguageChange} style={{ padding: '10px' }}>
        <option value="all languages">All Languages</option>
        <option value="Arabic Tour">Arabic Tour</option>
        <option value="English Tour">English Tour</option>
        <option value="Spanish Tour">Spanish Tour</option>
        <option value="German Tour">German Tour</option>
        <option value="Italian Tour">Italian Tour</option>
      </select>


      {/* Rating Filter */}
      <select value={selectedRating} onChange={handleRatingChange} style={{ padding: '10px', marginLeft: '15px' }}>
        <option value="all">All Ratings</option>
        <option value="5">5 stars</option>
        <option value="4">4 stars and above</option>
        <option value="3">3 stars and above</option>
        <option value="2">2 stars and above</option>
      </select>

      {/* Price Slider */}
      <label style={{ marginLeft: '15px' }}>Max Price: ${selectedPrice}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={selectedPrice}
        onChange={handlePriceChange}
        style={{ marginLeft: '10px' }}
      />

      {/* Date Picker */}
      <label style={{ marginLeft: '15px' }}>Date:</label>
      <input type="date" value={selectedDate} onChange={handleDateChange} style={{ padding: '10px', marginLeft: '10px' }} />

      {/* Preferences Multi-select */}
      <label style={{ marginLeft: '15px' }}>Tags:</label>
      <select multiple={true} value={selectedPreferences} onChange={handlePreferencesChange} style={{ padding: '10px', marginLeft: '10px' }}>
        <option value="educational">Educational</option>
        <option value="adventurous">Adventurous</option>
        <option value="outdoors">Outdoors</option>
        <option value="budget-friendly">Budget-friendly</option>
        <option value="scenic">Scenic</option>
        <option value="museum tour">Museum Tour</option>
        <option value="landmark">Landmark</option>
      </select>

      {/* Sort by Price */}
      <label style={{ marginLeft: '15px' }}>Sort by Price:</label>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '10px', marginLeft: '10px' }}>
        <option value="none">None</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>

      {/* Displaying the filtered results */}
      <div style={{ marginTop: '20px' }}>
        <h3>Results:</h3>
        {sortedPlaces.length > 0 ? (
          <ul>
            {sortedPlaces.map((place, index) => (
              <li key={index}>
                <strong>{place.name}</strong> - {place.category} - ({place.Language}) - ${place.price} - {place.rating} stars
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
      {/* Add the "View Upcoming Itineraries" button */}
      <Link to="/UpcomingItineraries">
        <button style={{ padding: '10px', margin: '10px', fontSize: '16px' }}>
          View Upcoming Itineraries
        </button>
      </Link>


      {/* Rest of the Itinerary search page */}
      {/* You can add your existing filters and search functionality here */}
    </div>
  );
};

export default ItinerarySearchPage;
