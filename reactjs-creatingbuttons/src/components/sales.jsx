import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesReport = () => {
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [itineraryId, setItineraryId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [month, setMonth] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieve userId and tourGuideId from localStorage
    const userId = localStorage.getItem('userId');
    console.log('UserId:', userId);

    useEffect(() => {
        if (!userId) {
            setError('User ID or Tour Guide ID is not available.');
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            const fetchSalesData = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/api/sales-report`, {
                        params: { tourGuideId: userId },
                    });

                    const { sales, totalRevenue } = response.data;
                    setSales(sales);
                    setFilteredSales(sales);
                    setTotalRevenue(totalRevenue);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setError('Error fetching sales data.');
                    setLoading(false);
                }
            };

            fetchSalesData();
        }
    }, [userId]);

    const filterSales = () => {
        let filtered = [...sales];

        if (itineraryId) {
            filtered = filtered.filter(sale => sale.itineraryId === itineraryId);
        }

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            filtered = filtered.filter(sale => {
                const saleDate = new Date(sale.date);
                return saleDate >= start && saleDate <= end;
            });
        }

        if (month) {
            filtered = filtered.filter(sale => {
                const saleDate = new Date(sale.date);
                const saleMonth = `${saleDate.getFullYear()}-${(saleDate.getMonth() + 1).toString().padStart(2, '0')}`;
                return saleMonth === month;
            });
        }

        setFilteredSales(filtered);
        const totalRevenue = filtered.reduce((sum, sale) => sum + sale.amount, 0);
        setTotalRevenue(totalRevenue);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="sales-report-container">
            <h1>Sales Report</h1>

            <div className="filters">
                <input
                    className="filter-input"
                    type="text"
                    placeholder="Itinerary ID"
                    value={itineraryId}
                    onChange={(e) => setItineraryId(e.target.value)}
                />
                <input
                    className="filter-input"
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    className="filter-input"
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <input
                    className="filter-input"
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
                <button className="filter-button" onClick={filterSales}>Apply Filters</button>
            </div>

            <div className="total-revenue">
                <h2>Total Revenue: ${totalRevenue ? totalRevenue.toFixed(2) : "0.00"}</h2>
            </div>

            {filteredSales.length === 0 ? (
                <p className="no-data-message">No sales data available for this tour guide.</p>
            ) : (
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Itinerary ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map((sale) => (
                            <tr key={sale._id}>
                                <td>{new Date(sale.date).toLocaleDateString()}</td>
                                <td>${sale.amount.toFixed(2)}</td>
                                <td>{sale.itineraryId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};


export default SalesReport;

