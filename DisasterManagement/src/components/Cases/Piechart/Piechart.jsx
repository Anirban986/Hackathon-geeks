import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Piechart.css";

const data = [
  { name: "Under Review", value: 2 },
  { name: "Hearing Scheduled", value: 3 },
  { name: "Evidence Stage", value: 1 },
  { name: "Judgment Pending", value: 1 },
  { name: "Disposed", value: 4 },
];

const COLORS = ["#3498db", "#f1c40f", "#9b59b6", "#e67e22", "#2ecc71"];

function Piechart() {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-title">Your Case Status Overview</h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={140}
            dataKey="value"
            label={({ value }) => `${((value / total) * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `${value} cases`} />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Piechart;
