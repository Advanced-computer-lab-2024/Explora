import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NoUsed.css'; // Import the CSS file for styling
import TouristLineChart from './TouristLineChart'; // Import the new chart

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
          const response = await axios.get('http://localhost:4000/api/advertiser_tourist/', {
            params: { advertiserId: userId },
          });

          const { touristDetails } = response.data; // Updated to match the API response structure

          setTourists(touristDetails || []);
          setFilteredTourists(touristDetails || []);
          setTotalTourists(touristDetails.length || 0); // Set the total number of tourists
        } catch (err) {
          setError('Failed to fetch tourist data.');
        } finally {
          setLoading(false);
        }
      };
      fetchTouristData();
    }
  }, [userId]);

  // Prepare data for the TouristLineChart
  const prepareChartData = () => {
    const dataMap = {};

    // Aggregate the number of tourists by date
    filteredTourists.forEach((tourist) => {
      const date = new Date(tourist.bookingDate).toLocaleDateString();
      dataMap[date] = (dataMap[date] || 0) + 1;
    });

    // Convert to an array format suitable for the chart
    return Object.entries(dataMap).map(([date, count]) => ({ date, count }));
  };

  const chartData = prepareChartData();

  // Filter tourists by selected month
  const filterTouristsByMonth = () => {
    let filtered = tourists;

    if (month) {
      const [selectedYear, selectedMonth] = month.split('-');
      filtered = filtered.filter((tourist) => {
        const tourDate = new Date(tourist.bookingDate);
        const tourYear = tourDate.getFullYear();
        const tourMonth = tourDate.getMonth() + 1;

        return tourYear === parseInt(selectedYear) && tourMonth === parseInt(selectedMonth);
      });
    }

    setFilteredTourists(filtered);
    setTotalTourists(filtered.length);
  };

  // Clear all filters
  const clearFilters = () => {
    setMonth('');
    setFilteredTourists(tourists);
    setTotalTourists(tourists.length);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="report-container">
      <h1 className="report-title">Tourist Report</h1>

      <button onClick={() => navigate(-1)} className="back-button">
        Go Back
      </button>

      {/* Line Chart Section */}
      <div className="chart-container" style={{ marginBottom: '40px' }}>
        <TouristLineChart data={chartData} />
      </div>

      {/* Filters */}
      <div className="filter-container">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="month-input"
        />
        <button onClick={filterTouristsByMonth} className="apply-filter-btn">
          Apply Filter
        </button>
        <button onClick={clearFilters} className="clear-filters-btn">
          Clear All Filters
        </button>
      </div>

      <h2 className="total-tourists">Total Tourists: {totalTourists}</h2>

      {/* Tourist Table */}
      {filteredTourists.length === 0 ? (
        <p className="no-tourists">No tourists found.</p>
      ) : (
        <table className="tourist-table">
          <thead>
            <tr>
              <th>Tourist Name</th>
              <th>Activity Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTourists.map((tourist, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  {tourist.touristName || 'No Name'}
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  {tourist.bookingDate
                    ? new Date(tourist.bookingDate).toLocaleDateString()
                    : 'No Date Available'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TouristReport2;
