// Import necessary components and styles
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LineChart from './LineChart'; // Line chart component
import './SalesReport.module.css'; // Styles for the report

const TourGuideSales = () => {
  // State declarations
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [filterByMonth, setFilterByMonth] = useState('');
  const [filterByDateRange, setFilterByDateRange] = useState({ startDate: '', endDate: '' });
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  // Fetch sales data
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

  // Filter sales data
  const filterSalesByMonth = () => {
    let filtered = sales;

    if (filterByMonth) {
      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.date);
        const formattedDate = `${saleDate.getFullYear()}-${String(saleDate.getMonth() + 1).padStart(2, '0')}`;
        return formattedDate === filterByMonth;
      });
    }

    const { startDate, endDate } = filterByDateRange;
    if (startDate && endDate) {
      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.date);
        const formattedStartDate = new Date(startDate);
        let formattedEndDate = new Date(endDate);
        formattedEndDate.setHours(23, 59, 59, 999);

        return saleDate >= formattedStartDate && saleDate <= formattedEndDate;
      });
    }

    if (location) {
      filtered = filtered.filter((sale) =>
        sale.itineraryId.locations.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredSales(filtered);
    setTotalRevenue(filtered.reduce((sum, sale) => sum + sale.amount, 0));
  };

  const applyFilters = () => filterSalesByMonth();
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

      {/* Dashboard Title */}
      <h2>Dashboard</h2>

      {/* Line Chart Section */}
      <div className="chart-container" style={{ marginTop: '20px' }}>
        <LineChart salesData={filteredSales} filterBy="month" />
      </div>

      {/* Total Revenue */}
      <h2 style={{ marginTop: '20px' }}>Total Revenue: ${totalRevenue.toFixed(2)}</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
        <div>
          <label htmlFor="month">Select Month:</label>
          <input
            type="month"
            id="month"
            value={filterByMonth}
            onChange={(e) => setFilterByMonth(e.target.value)}
            style={{ padding: '8px', fontSize: '14px' }}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filterByDateRange.startDate}
            onChange={(e) => setFilterByDateRange({ ...filterByDateRange, startDate: e.target.value })}
            style={{ padding: '8px', fontSize: '14px' }}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filterByDateRange.endDate}
            onChange={(e) => setFilterByDateRange({ ...filterByDateRange, endDate: e.target.value })}
            style={{ padding: '8px', fontSize: '14px' }}
          />
        </div>
        <div>
          <label htmlFor="location">Title:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ padding: '8px', fontSize: '14px' }}
          />
        </div>
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
