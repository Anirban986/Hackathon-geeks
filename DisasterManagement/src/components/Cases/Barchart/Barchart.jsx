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

const data = [
  { case: "Case A", scheduled: 8, completed: 5, adjourned: 3 },
  { case: "Case B", scheduled: 6, completed: 6, adjourned: 0 },
  { case: "Case C", scheduled: 10, completed: 4, adjourned: 6 },
  { case: "Case D", scheduled: 7, completed: 6, adjourned: 1 },
];

function Barchart() {
  return (
    <div className="chart-container">
      <h2 className="chart-title">Hearing & Adjournment Record</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="case" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="completed" name="Completed Hearings" fill="#2ecc71" />
          <Bar dataKey="adjourned" name="Adjourned Hearings" fill="#e74c3c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Barchart;
