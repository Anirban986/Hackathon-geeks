import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./TrendChart.css";

// Monthly court performance data
const data = [
  { month: "Jan", filed: 1200, disposed: 950, pendingIncrease: 250 },
  { month: "Feb", filed: 1350, disposed: 1000, pendingIncrease: 350 },
  { month: "Mar", filed: 1280, disposed: 1100, pendingIncrease: 180 },
  { month: "Apr", filed: 1420, disposed: 1150, pendingIncrease: 270 },
  { month: "May", filed: 1500, disposed: 1300, pendingIncrease: 200 },
  { month: "Jun", filed: 1600, disposed: 1400, pendingIncrease: 200 },
  { month: "Jul", filed: 1700, disposed: 1500, pendingIncrease: 200 },
  { month: "Aug", filed: 1750, disposed: 1550, pendingIncrease: 200 },
  { month: "Sep", filed: 1650, disposed: 1500, pendingIncrease: 150 },
  { month: "Oct", filed: 1580, disposed: 1450, pendingIncrease: 130 },
  { month: "Nov", filed: 1620, disposed: 1500, pendingIncrease: 120 },
  { month: "Dec", filed: 1800, disposed: 1650, pendingIncrease: 150 },
];

function TrendChart() {
  return (
    <div className="trend-chart-container">
      <h2 className="trend-chart-title">Monthly Case Filing vs Disposal Trend</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />
          <YAxis />

          <Tooltip formatter={(value) => `${value} cases`} />
          <Legend />

          <Line
            type="monotone"
            dataKey="filed"
            name="Cases Filed"
            stroke="#e74c3c"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="disposed"
            name="Cases Disposed"
            stroke="#2ecc71"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="pendingIncrease"
            name="Pending Growth"
            stroke="#f1c40f"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;
