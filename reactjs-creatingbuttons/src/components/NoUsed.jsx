import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SalesReport.module.css'; // Reuse the same CSS for consistency
import LineChart from './LineChart'; // Line chart component

const TouristReport = () => {
  const [tourists, setTourists] = useState([]);
  const [filteredTourists, setFilteredTourists] = useState([]);
  const [totalTourists, setTotalTourists] = useState(0);
  const [filterByMonth, setFilterByMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in localStorage

  useEffect(() => {
    if (!userId) {
      setError('User ID is not available. Please log in.');
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const fetchTouristData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/report/', {
            params: { tourGuideId: userId },
          });
          const { touristDetails } = response.data;

          setTourists(touristDetails || []);
          setFilteredTourists(touristDetails || []);
          setTotalTourists(touristDetails.length || 0);
        } catch (err) {
          setError('Failed to fetch tourist data.');
        } finally {
          setLoading(false);
        }
      };
      fetchTouristData();
    }
  }, [userId]);

  // Prepare data for the LineChart
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

  // Filter Logic
  const applyFilters = () => {
    let filtered = tourists;

    // Month Filter
    if (filterByMonth) {
      const [selectedYear, selectedMonth] = filterByMonth.split('-');
      filtered = filtered.filter((tourist) => {
        const tourDate = new Date(tourist.itineraryDate);
        return (
          tourDate.getFullYear() === parseInt(selectedYear) &&
          tourDate.getMonth() + 1 === parseInt(selectedMonth)
        );
      });
    }
    setFilteredTourists(filtered);
    setTotalTourists(filtered.length);
  };

  const handleMonthChange = (e) => {
    setFilterByMonth(e.target.value);
  };

  const clearFilters = () => {
    setFilterByMonth('');
    setFilteredTourists(tourists);
    setTotalTourists(tourists.length);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="sales-report">
      <h2>Dashboard</h2>

      {/* Line Chart Section */}
      <div className="chart-container">
      <LineChart salesData={chartData} filterBy="date" />
      </div>

      {/* Filter Section */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
        {/* Month Filter */}
        <div>
          <label htmlFor="month">Select Month:</label>
          <input
            type="month"
            id="month"
            value={filterByMonth}
            onChange={handleMonthChange}
            style={{ padding: '8px', fontSize: '14px' }}
          />
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={applyFilters}
          style={{
            backgroundColor: '#008080',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '14px',
          }}
        >
          Apply Filters
        </button>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          style={{
            backgroundColor: '#008080',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '14px',
          }}
        >
          Clear Filters
        </button>
      </div>

      <h2>Total Tourists: {totalTourists}</h2>

      {/* Tourists Table */}
      {filteredTourists.length === 0 ? (
        <p>No tourists found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking Date</th>
              <th>Tourist Name</th>
              <th>Itinerary Title</th>
            </tr>
          </thead>
          <tbody>
            {filteredTourists.map((tourist, index) => (
              <tr key={index}>
                <td>
                  {tourist.bookingDate
                    ? new Date(tourist.bookingDate).toLocaleDateString()
                    : 'No Date Available'}
                </td>
                <td>{tourist.touristName}</td>
                <td>{tourist.itineraryLocations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TouristReport;
