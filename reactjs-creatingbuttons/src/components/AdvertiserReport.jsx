import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdvertiserReport = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activityId, setActivityId] = useState('');
  const [specificDate, setspecificDate] = useState('');
  const [month, setMonth] = useState('');
  const [location, setLocation] = useState('');
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

  // Fetch sales data for the logged-in advertiser
  useEffect(() => {
    if (userId) {
      const fetchSalesData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/sal', {
            params: { advertiserId: userId },
          });
          const { sales } = response.data;
          setSales(sales || []);
          setFilteredSales(sales || []);
          setTotalRevenue(sales.reduce((sum, sale) => sum + sale.amount, 0)); // Calculate total revenue
        } catch (err) {
          setError('Failed to fetch sales data.');
        } finally {
          setLoading(false);
        }
      };
      fetchSalesData();
    }
  }, [userId]);

  // Filter sales data based on the selected filters
  const filterSales = () => {
    let filtered = sales;
  
    // Filter by Activity ID
    if (activityId) {
      filtered = filtered.filter((sale) => sale.activityId._id === activityId);
    }
  
    // Filter by Specific Date (Exact Match)
    if (specificDate) {
      const selectedDate = new Date(specificDate); // Convert to Date object
      filtered = filtered.filter((sale) => {
        const availableDate = new Date(sale.activityId.date); // Assuming `activityId.date` contains the activity date
        return availableDate.toDateString() === selectedDate.toDateString(); // Compare only the date part
      });
    }      

    // Filter by Month (YYYY-MM format)
    if (month) {
      const [selectedYear, selectedMonth] = month.split('-'); // Extract year and month
      filtered = filtered.filter((sale) => {
        const availableDate = new Date(sale.activityId.date); // Assuming `activityId.date` contains the activity date
        const availableYear = availableDate.getFullYear();
        const availableMonth = availableDate.getMonth() + 1; // getMonth() is zero-based, so add 1
        
        return availableYear == selectedYear && availableMonth == selectedMonth;
      });
    }
    
    // Filter by Location (case insensitive)
    if (location) {
      filtered = filtered.filter((sale) => {
        const activityLocation = sale.activityId.location.toLowerCase(); // Assuming location is in `activityId.location`
        return activityLocation.includes(location.toLowerCase());
      });
    }
  
    // Calculate total revenue after filtering
    setFilteredSales(filtered);
    setTotalRevenue(filtered.reduce((sum, sale) => sum + sale.amount, 0)); // Recalculate total revenue
  };

  // Clear all filters and show all sales
  const clearFilters = () => {
    setActivityId('');
    setspecificDate('');
    setMonth('');
    setLocation('');
    setFilteredSales(sales); // Reset the filtered sales to show all sales
    setTotalRevenue(sales.reduce((sum, sale) => sum + sale.amount, 0)); // Recalculate total revenue
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Sales Report</h1>
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Back
      </button>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Activity ID"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          style={{ flex: '1 1 200px', padding: '8px', fontSize: '14px' }}
        />
        <input
          type="date"
          value={specificDate}
          onChange={(e) => setspecificDate(e.target.value)}
          style={{ flex: '1 1 200px', padding: '8px', fontSize: '14px' }}
        />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ flex: '1 1 200px', padding: '8px', fontSize: '14px' }}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ flex: '1 1 200px', padding: '8px', fontSize: '14px' }}
        />
        <button
          onClick={filterSales}
          style={{
            flex: '1 1 200px',
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          style={{
            flex: '1 1 200px',
            backgroundColor: '#dc3545',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Clear All Filters
        </button>
      </div>

      <h2>Total Revenue: ${totalRevenue.toFixed(2)}</h2>

      {filteredSales.length === 0 ? (
        <p>No sales data found.</p>
      ) : (
        <table
          style={{
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginTop: '20px',
            marginBottom: '20px',
            padding: '0',
            textAlign: 'left',
            boxSizing: 'border-box',
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: '10px', width: '20%' }}>Date</th>
              <th style={{ padding: '10px', width: '20%' }}>Amount</th>
              <th style={{ padding: '30px', width: '30%' }}>Activity ID</th>
              <th style={{ padding: '10px', width: '20%' }}>Location</th>
              <th style={{ padding: '10px', width: '20%' }}>Tourist</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale._id}>
                <td style={{ padding: '10px' }}>
                  {new Date(sale.activityId.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '10px' }}>${sale.amount.toFixed(2)}</td>
                <td style={{ padding: '10px' }}>{sale.activityId._id}</td>
                <td style={{ padding: '10px' }}>{sale.activityId.location}</td>
                <td style={{ padding: '10px' }}>{sale.touristId.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdvertiserReport;