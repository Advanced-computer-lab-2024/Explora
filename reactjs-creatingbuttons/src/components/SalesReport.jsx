import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import LineChartComponent from "./LineChartt"; // Import the new LineChart component
import "./SalesReport.module.css"; // Import CSS module for unique styling

const SalesReport = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Example data for the LineChart (replace with actual data from API or props)
  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 }
  ];

  // Function to navigate back to the previous page
  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page in the browser history
  };

  return (
    <div className="sales-report">
      <h2>Dashboard</h2>

      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)} // Use navigate to go back
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
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


      {/* Line Chart Section */}
      <div className="chart-container">
        <LineChartComponent data={chartData} /> {/* Passing chartData as prop */}
      </div>

      {/* Total Sales Section */}
      <div className="sales-summary">
        <h3>Total Sales</h3>
        <div className="sales-stats">
          {/* Credit Sales */}
          <div className="sales-item">
            <div className="circle" style={{ backgroundColor: "#FF6384" }}>
              <span>80%</span>
            </div>
            <div className="sales-info">
              <strong>$36,059</strong>
              <span>Credit Sales</span>
            </div>
          </div>

          {/* Channel Sales */}
          <div className="sales-item">
            <div className="circle" style={{ backgroundColor: "#FFCE56" }}>
              <span>64%</span>
            </div>
            <div className="sales-info">
              <strong>$24,834</strong>
              <span>Channel Sales</span>
            </div>
          </div>

          {/* Direct Sales */}
          <div className="sales-item">
            <div className="circle" style={{ backgroundColor: "#36A2EB" }}>
              <span>34%</span>
            </div>
            <div className="sales-info">
              <strong>$15,650</strong>
              <span>Direct Sales</span>
            </div>
          </div>
        </div>

        {/* November Sales Table */}
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dallas Oak Dining Chair</td>
              <td>20</td>
              <td>$1,342</td>
            </tr>
            <tr>
              <td>Benmore Glass Coffee Table</td>
              <td>18</td>
              <td>$1,550</td>
            </tr>
            <tr>
              <td>Aoraki Leather Sofa</td>
              <td>15</td>
              <td>$4,170</td>
            </tr>
            <tr>
              <td>Bali Outdoor Wicker Chair</td>
              <td>25</td>
              <td>$2,974</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
