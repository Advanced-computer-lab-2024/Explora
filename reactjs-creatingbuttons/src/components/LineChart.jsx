import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ salesData, filterBy }) => {
  // Generate data for chart
  const chartData = {
    labels: salesData.map((sale) => {
      const date = new Date(sale.date);
      if (filterBy === 'month') {
        return `${date.getMonth() + 1}/${date.getFullYear()}`; // Format as Month/Year
      } else if (filterBy === 'year') {
        return `${date.getFullYear()}`; // Format as Year
      }
      return date.toLocaleDateString(); // Fallback to full date
    }),
    datasets: [
      {
        label: 'Sales Amount',
        data: salesData.map((sale) => sale.amount),
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)', // Blue color
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
    </div>
  );
};

export default LineChart;
