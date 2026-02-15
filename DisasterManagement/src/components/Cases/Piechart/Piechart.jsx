import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Piechart.css";

const COLORS = ["#3498db", "#f1c40f", "#9b59b6", "#e67e22", "#2ecc71", "#e74c3c"];

function Piechart() {

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");

    // ---------- CLIENT ----------
    if (role === "Client") {
      setTitle("My Case Status Overview");

      setData([
        { name: "Under Review", value: 2 },
        { name: "Hearing Scheduled", value: 3 },
        { name: "Evidence Stage", value: 1 },
        { name: "Judgment Pending", value: 1 },
        { name: "Disposed", value: 4 },
      ]);
    }

    // ---------- LAWYER ----------
    else if (role === "Lawyer") {
      setTitle("Cases Handled by Category");

      setData([
        { name: "Civil Cases", value: 18 },
        { name: "Criminal Cases", value: 25 },
        { name: "Family Matters", value: 12 },
        { name: "Corporate Cases", value: 9 },
        { name: "Property Disputes", value: 7 },
      ]);
    }

    // ---------- JUDGE ----------
    else if (role === "Judge") {
      setTitle("Court Case Workload Distribution");

      setData([
        { name: "Fresh Filings", value: 32 },
        { name: "Hearings", value: 48 },
        { name: "Arguments", value: 21 },
        { name: "Orders Reserved", value: 10 },
        { name: "Disposed Today", value: 27 },
      ]);
    }

    else {
      setTitle("Case Overview");
      setData([]);
    }

  }, []);

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-title">{title}</h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={140}
            dataKey="value"
            label={({ value }) => total ? `${((value / total) * 100).toFixed(0)}%` : ""}
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
