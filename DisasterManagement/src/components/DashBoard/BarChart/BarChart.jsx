import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./BarChart.css";

// Case type wise filing vs disposal
const data = [
  { type: "Civil", filed: 420, disposed: 310 },
  { type: "Criminal", filed: 380, disposed: 250 },
  { type: "Family", filed: 210, disposed: 180 },
  { type: "Property", filed: 260, disposed: 190 },
  { type: "Corporate", filed: 150, disposed: 120 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { filed, disposed } = payload[0].payload;
    const percentage = ((disposed / filed) * 100).toFixed(1);

    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{label} Cases</p>
        <p>Filed: <span>{filed}</span></p>
        <p>Disposed: <span>{disposed}</span></p>
        <p>Disposal Rate: <span>{percentage}%</span></p>
      </div>
    );
  }
  return null;
};

// 🔹 renamed component
const CaseBarChart = () => {
  const chartData = data.map(d => ({
    ...d,
    disposalRate: ((d.disposed / d.filed) * 100).toFixed(1),
  }));

  return (
    <div className="chart-container">
      <h2 className="chart-title">Case Type Disposal Efficiency</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="type" />
          <YAxis domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Bar
            dataKey="disposalRate"
            name="Disposal Rate (%)"
            fill="#2c3e50"
            barSize={50}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CaseBarChart;
