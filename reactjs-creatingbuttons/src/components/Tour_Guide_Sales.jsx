import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LineChart from './LineChart'; // Line chart component
import './SalesReport.module.css'; // Styles for the report

const TourGuideSales = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [filterByMonth, setFilterByMonth] = useState('');
  const [filterByDateRange, setFilterByDateRange] = useState({ startDate: '', endDate: '' });
  const [location, setLocation] = useState(''); // Added location filter state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
  const navigate = useNavigate();

  // Fetch sales data for the logged-in tour guide
  useEffect(() => {
    if (!userId) {
      setError('User ID is not available. Please log in.');
      setLoading(false);
    } else {
      const fetchSalesData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/', {
            params: { tourGuideId: userId },
          });
          const { sales, totalRevenue } = response.data;
          setSales(sales || []);
          setFilteredSales(sales || []);
          setTotalRevenue(totalRevenue || 0);
        } catch (err) {
          setError('Failed to fetch sales data.');
        } finally {
          setLoading(false);
        }
      };
      fetchSalesData();
    }
  }, [userId]);

  // Filter sales by month (using YYYY-MM format)
  const filterSalesByMonth = () => {
    let filtered = sales;
    if (filterByMonth) {
      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.date);
        const formattedDate = `${saleDate.getFullYear()}-${String(saleDate.getMonth() + 1).padStart(2, '0')}`;
        return formattedDate === filterByMonth;
      });
    }

// Filter by date range (start and end dates)
const { startDate, endDate } = filterByDateRange;
if (startDate && endDate) {
  filtered = filtered.filter((sale) => {
    const saleDate = new Date(sale.date);
    const formattedStartDate = new Date(startDate);
    let formattedEndDate = new Date(endDate);
    
    // Set the time to the end of the day (23:59:59.999) to include all sales on the endDate
    formattedEndDate.setHours(23, 59, 59, 999);

    return saleDate >= formattedStartDate && saleDate <= formattedEndDate;
  });
}

    // Filter by Location
    if (location) {
      filtered = filtered.filter((sale) => {
        const itineraryLocation = sale.itineraryId.locations.toLowerCase();
        return itineraryLocation.includes(location.toLowerCase());
      });
    }

    // Calculate total revenue after filtering
    setFilteredSales(filtered);
    setTotalRevenue(filtered.reduce((sum, sale) => sum + sale.amount, 0));
  };

  // Handle change for month filter
  const handleMonthChange = (e) => {
    setFilterByMonth(e.target.value);
  };

  // Handle change for date range filters
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setFilterByDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle change for location filter
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle the filter apply action
  const applyFilters = () => {
    filterSalesByMonth();
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterByMonth('');
    setFilterByDateRange({ startDate: '', endDate: '' });
    setLocation('');
    setFilteredSales(sales);
    setTotalRevenue(sales.reduce((sum, sale) => sum + sale.amount, 0));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="sales-report">
      <h2>Dashboard</h2>

      {/* Line Chart Section */}
      <div className="chart-container">
        <LineChart salesData={filteredSales} filterBy="month" />
      </div>

      <h2>Total Revenue: ${totalRevenue.toFixed(2)}</h2>

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

        {/* Date Range Filter */}
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filterByDateRange.startDate}
            onChange={handleDateRangeChange}
            style={{ padding: '8px', fontSize: '14px' }}
            placeholder="MM-DD-YYYY"
          />
        </div>

        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filterByDateRange.endDate}
            onChange={handleDateRangeChange}
            style={{ padding: '8px', fontSize: '14px' }}
            placeholder="MM-DD-YYYY"
          />
        </div>

        {/* Location Filter */}
        <div>
          <label htmlFor="location">Title:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            style={{ padding: '8px', fontSize: '14px' }}
            placeholder="Enter location"
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

      {/* Sales Table */}
      {filteredSales.length === 0 ? (
        <p>No sales data found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Itinerary Title</th>
              <th>Tourist</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale._id}>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
                <td>${sale.amount.toFixed(2)}</td>
                <td>{sale.itineraryId.locations}</td>
                <td>{sale.touristId.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TourGuideSales;
