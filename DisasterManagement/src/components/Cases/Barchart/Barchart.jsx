import React, { useEffect, useState } from "react";
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

function Barchart() {

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {

    const role = localStorage.getItem("role");

    // ---------------- CLIENT ----------------
    if (role === "Client") {
      setTitle("My Hearing & Adjournment Record");

      setData([
        { case: "Property Dispute", completed: 2, adjourned: 1 },
        { case: "Loan Recovery", completed: 1, adjourned: 2 },
        { case: "Family Matter", completed: 3, adjourned: 0 },
      ]);
    }

    // ---------------- LAWYER ----------------
    else if (role === "Lawyer") {
      setTitle("Advocate Case Performance");

      setData([
        { case: "Civil Cases", completed: 18, adjourned: 6 },
        { case: "Criminal Cases", completed: 25, adjourned: 10 },
        { case: "Family Cases", completed: 12, adjourned: 3 },
        { case: "Corporate Cases", completed: 9, adjourned: 4 },
      ]);
    }

    // ---------------- JUDGE ----------------
    else if (role === "Judge") {
      setTitle("Court Daily Case Handling");

      setData([
        { case: "Monday", completed: 32, adjourned: 14 },
        { case: "Tuesday", completed: 28, adjourned: 11 },
        { case: "Wednesday", completed: 36, adjourned: 18 },
        { case: "Thursday", completed: 30, adjourned: 9 },
        { case: "Friday", completed: 41, adjourned: 16 },
      ]);
    }

    else {
      setTitle("Hearing Record");
      setData([]);
    }

  }, []);

  return (
    <div className="chart-container">
      <h2 className="chart-title">{title}</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="case" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="completed" name="Completed Hearings" fill="#2ecc71" radius={[6,6,0,0]} />
          <Bar dataKey="adjourned" name="Adjourned Hearings" fill="#e74c3c" radius={[6,6,0,0]} />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Barchart;
