import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const TouristLineChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '400px', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center' }}>Tourist Overview by Date</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} label={{ value: 'Date', position: 'insideBottom', dy: 10 }} />
          <YAxis label={{ value: 'Number of Tourists', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#008080" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TouristLineChart;