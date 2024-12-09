import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SalesReport.module.css'; // Reuse the same CSS for consistency
import TouristLineChart from './TouristLineChart'; // Import the new chart

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

  // Filter Logic
  const filterTouristsByMonth = () => {
    let filtered = tourists;
  
    if (filterByMonth) {
      // Ensure filterByMonth is in the format YYYY-MM (e.g., '2024-12')
      const [year, month] = filterByMonth.split('-'); // Split into year and month
  
      // Convert the month string to an integer (0-based index)
      const monthIndex = parseInt(month, 10) - 1; // December is 12, but JavaScript months are 0-based (0-11)
  
      console.log("Filtering for:", month, year, "Month Index:", monthIndex); // Log selected month and year
  
      if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex <= 11) { // Validate month index
        filtered = filtered.filter((tourist) => {
          const bookingDate = new Date(tourist.bookingDate); // Parse the booking date
  
          // Check if the booking date is valid
          if (isNaN(bookingDate)) {
            console.error("Invalid booking date for tourist:", tourist.bookingDate);
            return false; // Skip this tourist if the booking date is invalid
          }
  
          const bookingYear = bookingDate.getFullYear(); // Get the year of the booking date
          const bookingMonth = bookingDate.getMonth(); // Get the month of the booking date (0-based index)
  
          console.log("Booking Year:", bookingYear, "Booking Month:", bookingMonth);
  
          // Check if the year and month match
          return bookingYear === parseInt(year) && bookingMonth === monthIndex;
        });
      } else {
        console.error("Invalid month:", month); // Handle invalid month case
      }
    }
  
    // Update the filtered tourists and total count
    setFilteredTourists(filtered);
    setTotalTourists(filtered.length);  // Update total tourists count
  };
  
  // Handle month selection change
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
      <h2 style={{ textAlign: 'center' }}>Tourist Dashboard</h2>
      {/* Back Button */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>

      {/* Line Chart Section */}
      <div className="chart-container" style={{ marginBottom: '40px' }}>
        <TouristLineChart data={chartData} />
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
          onClick={filterTouristsByMonth}
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

      {/* Total Tourists */}
      <h2 style={{ textAlign: 'center' }}>Total Tourists: {totalTourists}</h2>

      {/* Tourists Table Section */}
      <div style={{ marginTop: '40px' }}>
        {filteredTourists.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No tourists found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Booking Date</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Tourist Name</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Itinerary Title</th>
              </tr>
            </thead>
            <tbody>
              {filteredTourists.map((tourist, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    {tourist.bookingDate
                      ? new Date(tourist.bookingDate).toLocaleDateString()
                      : 'No Date Available'}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{tourist.touristName}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{tourist.itineraryLocations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TouristReport;