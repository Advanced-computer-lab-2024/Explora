import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerSales = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [specificDate, setSpecificDate] = useState('');
  const [month, setMonth] = useState('');
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setError('User ID is not available. Please log in.');
      setLoading(false);
      return;
    }

    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/sellersales', {
          params: { seller: userId },
        });

        const { sales } = response.data;
        setSales(sales || []);
        setFilteredSales(sales || []);
        setTotalRevenue(sales.reduce((sum, sale) => sum + sale.amount, 0));
      } catch (err) {
        setError('No sales');
      } finally {
        setLoading(false);
      }
    };
    fetchSalesData();
  }, [userId]);

  const filterSales = () => {
    let filtered = sales;

    // Filter by Specific Date
    if (specificDate) {
      const selectedDate = new Date(specificDate);
      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.productId?.date);
        return saleDate.toDateString() === selectedDate.toDateString();
      });
    }

    // Filter by Month
    if (month) {
      const [selectedYear, selectedMonth] = month.split('-');
      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.productId?.date);
        const saleYear = saleDate.getFullYear();
        const saleMonth = saleDate.getMonth() + 1;

        return saleYear == selectedYear && saleMonth == selectedMonth;
      });
    }

    // Filter by Product Name (case insensitive)
    if (product) {
      filtered = filtered.filter((sale) => {
        const productName = sale.productId?.name?.toLowerCase() || '';
        return productName.includes(product.toLowerCase());
      });
    }

    setFilteredSales(filtered);
    setTotalRevenue(filtered.reduce((sum, sale) => sum + sale.amount, 0));
  };

  const clearFilters = () => {
    setSpecificDate('');
    setMonth('');
    setProduct('');
    setFilteredSales(sales);
    setTotalRevenue(sales.reduce((sum, sale) => sum + sale.amount, 0));
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Seller Sales Report</h1>

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
          type="date"
          value={specificDate}
          onChange={(e) => setSpecificDate(e.target.value)}
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
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
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
              <th style={{ padding: '10px', width: '25%' }}>Date</th>
              <th style={{ padding: '10px', width: '25%' }}>Amount</th>
              <th style={{ padding: '10px', width: '25%' }}>Product</th>
              <th style={{ padding: '10px', width: '25%' }}>Tourist</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale._id}>
                <td style={{ padding: '10px' }}>
                  {sale.productId?.date ? new Date(sale.productId.date).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ padding: '10px' }}>${sale.amount?.toFixed(2) || 'N/A'}</td>
                <td style={{ padding: '10px' }}>{sale.productId?.name || 'N/A'}</td>
                <td style={{ padding: '10px' }}>{sale.touristId.username || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SellerSales;
