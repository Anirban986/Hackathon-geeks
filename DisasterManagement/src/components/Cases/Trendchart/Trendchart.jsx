import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Trendchart.css";

// Stage progression score (0–100)
const data = [
  { month: "Jan", progress: 10 },
  { month: "Feb", progress: 25 },
  { month: "Mar", progress: 40 },
  { month: "Apr", progress: 55 },
  { month: "May", progress: 70 },
  { month: "Jun", progress: 85 },
  { month: "Jul", progress: 100 },
];

const getStage = (value) => {
  if (value < 20) return "Case Filed";
  if (value < 40) return "Notice Served";
  if (value < 60) return "Evidence Stage";
  if (value < 80) return "Arguments";
  if (value < 100) return "Judgment Reserved";
  return "Disposed";
};

function Trendchart() {
  return (
    <div className="trend-chart-container">
      <h2 className="trend-chart-title">Case Progress Timeline</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />

          <Tooltip
            formatter={(value) => `${value}% (${getStage(value)})`}
          />

          <Line
            type="monotone"
            dataKey="progress"
            stroke="#2c3e50"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Trendchart;
