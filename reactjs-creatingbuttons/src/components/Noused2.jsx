import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NoUsed.css';  // Import the CSS file for styling

const TouristReport2 = () => {
  const [tourists, setTourists] = useState([]);
  const [filteredTourists, setFilteredTourists] = useState([]);
  const [totalTourists, setTotalTourists] = useState(0);
  const [month, setMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in localStorage

  // Check if the user is logged in
  useEffect(() => {
    if (!userId) {
      setError('User ID is not available. Please log in.');
      setLoading(false);
    }
  }, [userId]);

  // Fetch tourist data for the logged-in tour guide
  useEffect(() => {
    if (userId) {
      const fetchTouristData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/report2/', {
            params: { advertiserId: userId },
          });

          const { touristDetails } = response.data;  // Updated to match the API response structure

          setTourists(touristDetails || []);
          setFilteredTourists(touristDetails || []);
          setTotalTourists(touristDetails.length || 0);  // Set the total number of tourists
        } catch (err) {
          setError('Failed to fetch tourist data.');
        } finally {
          setLoading(false);
        }
      };
      fetchTouristData();
    }
  }, [userId]);

  // Filter tourists by selected month
  const filterTouristsByMonth = () => {
    let filtered = tourists;

    if (month) {
      const [selectedYear, selectedMonth] = month.split('-'); // Extract year and month from the input (format: YYYY-MM)
      filtered = filtered.filter((tourist) => {
        const tourDate = new Date(tourist.itineraryDate); // Assuming each tourist has a `itineraryDate` field
        const tourYear = tourDate.getFullYear();
        const tourMonth = tourDate.getMonth() + 1; // getMonth() returns 0-based months (0 for January, 11 for December)

        return tourYear === parseInt(selectedYear) && tourMonth === parseInt(selectedMonth);
      });
    }

    // Update the filtered tourists and total count
    setFilteredTourists(filtered);
    setTotalTourists(filtered.length);  // Update total tourists count
  };

  // Clear all filters and show all tourists
  const clearFilters = () => {
    setMonth('');
    setFilteredTourists(tourists); // Reset the filtered tourists to show all
    setTotalTourists(tourists.length); // Recalculate total tourists
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="report-container">
      <h1 className="report-title">Tourist Report</h1>

      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Go Back
      </button>

      <div className="filter-container">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="month-input"
        />
        <button
          onClick={filterTouristsByMonth}
          className="apply-filter-btn"
        >
          Apply Filter
        </button>
        <button
          onClick={clearFilters}
          className="clear-filters-btn"
        >
          Clear All Filters
        </button>
      </div>

      <h2 className="total-tourists">Total Tourists: {totalTourists}</h2>  {/* Display total number of tourists */}

      {filteredTourists.length === 0 ? (
        <p className="no-tourists">No tourists found.</p>
      ) : (
        <table className="tourist-table">
          <thead>
            <tr>
              <th>Tourist Name</th>
              <th>Activity Title</th>
              <th>Activity Date</th>  {/* Added column for itinerary date */}
            </tr>
          </thead>
          <tbody>
            {filteredTourists.map((tourist, index) => (
              <tr key={index}>
                <td>{tourist.touristName}</td>  {/* Display tourist's name */}
                <td>{tourist.itineraryLocations}</td>  {/* Display itinerary locations (assuming it's an array) */}
                <td>{new Date(tourist.itineraryDate).toLocaleDateString()}</td>  {/* Display formatted itinerary date */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TouristReport2;
