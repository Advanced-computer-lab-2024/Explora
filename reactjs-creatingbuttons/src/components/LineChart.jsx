import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // Example data for the chart
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Credit Sales",
        data: [2000, 2500, 3000, 3500, 3200, 4000, 3800],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4, // Smooth curves
      },
      {
        label: "Channel Sales",
        data: [1500, 1800, 2000, 2200, 2500, 2800, 2700],
        borderColor: "#FFCE56",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.4,
      },
      {
        label: "Direct Sales",
        data: [1000, 1200, 1300, 1500, 1700, 1900, 2000],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of legend (top, bottom, left, right)
      },
      title: {
        display: true,
        text: "Sales Performance (Weekly)",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at 0
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
