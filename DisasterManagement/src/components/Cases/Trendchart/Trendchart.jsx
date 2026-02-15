import React, { useEffect, useState } from "react";
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
import "./Trendchart.css";

function Trendchart() {

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("");

  const getStage = (value) => {
    if (value < 20) return "Case Filed";
    if (value < 40) return "Notice Served";
    if (value < 60) return "Evidence Stage";
    if (value < 80) return "Arguments";
    if (value < 100) return "Judgment Reserved";
    return "Disposed";
  };

  useEffect(() => {

    const role = localStorage.getItem("role");

    // ---------- CLIENT ----------
    if (role === "Client") {
      setTitle("My Case Progress Timeline");
      setMode("client");

      setData([
        { month: "Jan", progress: 10 },
        { month: "Feb", progress: 25 },
        { month: "Mar", progress: 40 },
        { month: "Apr", progress: 55 },
        { month: "May", progress: 70 },
        { month: "Jun", progress: 85 },
        { month: "Jul", progress: 100 },
      ]);
    }

    // ---------- LAWYER ----------
    else if (role === "Lawyer") {
      setTitle("Monthly Case Performance");
      setMode("lawyer");

      setData([
        { month: "Jan", filed: 12, disposed: 6 },
        { month: "Feb", filed: 15, disposed: 9 },
        { month: "Mar", filed: 18, disposed: 12 },
        { month: "Apr", filed: 14, disposed: 11 },
        { month: "May", filed: 20, disposed: 16 },
        { month: "Jun", filed: 22, disposed: 18 },
      ]);
    }

    // ---------- JUDGE ----------
    else if (role === "Judge") {
      setTitle("Court Pendency Trend");
      setMode("judge");

      setData([
        { month: "Jan", pending: 320 },
        { month: "Feb", pending: 340 },
        { month: "Mar", pending: 310 },
        { month: "Apr", pending: 290 },
        { month: "May", pending: 270 },
        { month: "Jun", pending: 250 },
      ]);
    }

  }, []);

  return (
    <div className="trend-chart-container">
      <h2 className="trend-chart-title">{title}</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />

          {/* CLIENT TOOLTIP */}
          {mode === "client" && (
            <Tooltip formatter={(value) => `${value}% (${getStage(value)})`} />
          )}

          {/* LAWYER TOOLTIP */}
          {mode === "lawyer" && (
            <Tooltip formatter={(value) => `${value} cases`} />
          )}

          {/* JUDGE TOOLTIP */}
          {mode === "judge" && (
            <Tooltip formatter={(value) => `${value} pending cases`} />
          )}

          <Legend />

          {/* CLIENT */}
          {mode === "client" && (
            <Line
              type="monotone"
              dataKey="progress"
              name="Case Progress"
              stroke="#2c3e50"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          )}

          {/* LAWYER */}
          {mode === "lawyer" && (
            <>
              <Line type="monotone" dataKey="filed" name="Filed" stroke="#3498db" strokeWidth={3} />
              <Line type="monotone" dataKey="disposed" name="Disposed" stroke="#2ecc71" strokeWidth={3} />
            </>
          )}

          {/* JUDGE */}
          {mode === "judge" && (
            <Line
              type="monotone"
              dataKey="pending"
              name="Pending Cases"
              stroke="#e74c3c"
              strokeWidth={3}
            />
          )}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Trendchart;
