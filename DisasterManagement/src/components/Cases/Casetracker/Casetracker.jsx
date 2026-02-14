import { useState } from "react";
import CountUp from "react-countup";
import "./Casetracker.css";
import download from '../../../assets/download.svg';
import schedule from '../../../assets/schedule.svg';
import Trendchart from "../Trendchart/Trendchart";
import Piechart from "../Piechart/Piechart";
import Barchart from "../Barchart/Barchart";
import CaseStatus from "../CaseStatus/CaseStatus";
import LawyersModal from "../../Lawers/LawyersModal";

export default function Casetracker() {
  const [showLawyers, setShowLawyers] = useState(false);
  const [showPortal, setShowPortal] = useState(false);      // advocate message
  const [showCaseStatus, setShowCaseStatus] = useState(false); // case status page
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("normal");

  const handleSend = async () => {
    if (!message) return alert("Message cannot be empty");

    try {
      const res = await fetch("http://localhost:5000/api/client-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, priority: severity }),
      });

      await res.json();

      setMessage("");
      setSeverity("normal");
      setShowPortal(false);
    } catch (err) {
      console.error("Error sending query:", err);
    }
  };

  return (
    <div className="dashboard">

      {/* TOP HEADER */}
      <div className="dashboard-top">
        <div className="dashboard-top-segment1">
          <h1>My Case Tracker</h1>
          <p>Track your court cases, hearings and legal updates</p>
        </div>

        <div className="dashboard-top-segment2">

          <div className="export">
            <img src={download} alt="" />
            <p>Download Latest Order</p>
          </div>

          <div className="schedule-drill">
            <img src={schedule} alt="" />
            <p>View Next Hearing</p>
          </div>

          {/* ⭐ CASE STATUS BUTTON */}
          <div className="schedule-drill" onClick={() => setShowCaseStatus(true)}>
            <p>Case Status</p>
          </div>

          {/* ⭐ CONNECT ADVOCATE */}
          <div className="export" onClick={() => setShowLawyers(true)}>
            Connect Advocate
          </div>
        </div>
      </div>

      {showLawyers && (
        <LawyersModal close={() => setShowLawyers(false)} />
      )}

      {/* CASE STATUS MODAL */}
      {showCaseStatus && (
        <div className="modal-overlay">
          <div className="modal-card large">

            <div className="modal-header">
              <h2>Search Case Status</h2>
              <button onClick={() => setShowCaseStatus(false)}>✖</button>
            </div>

            <CaseStatus />

          </div>
        </div>
      )}


      {/* ADVOCATE MESSAGE MODAL 
      {showPortal && (
        <div className="alert-portal-overlay">
          <div className="alert-portal">
            <h2>Send Message to Advocate</h2>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your case..."
            />

            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="hearing">Before Hearing</option>
            </select>

            <div className="portal-buttons">
              <button onClick={handleSend}>Send</button>
              <button onClick={() => setShowPortal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}*/}


      {/* DASHBOARD CONTENT */}
      <div className="cards">
        <div className="card blue"><span>Total Cases</span><CountUp end={4} duration={1.2} /></div>
        <div className="card green"><span>Upcoming Hearings</span><CountUp end={2} duration={1.5} /></div>
        <div className="card purple"><span>Disposed Cases</span><CountUp end={1} duration={1.5} /></div>
        <div className="card yellow"><span>Adjournments</span><CountUp end={6} duration={1.2} /></div>
      </div>

      <div className="charts">
        <div className="chart-card"><Trendchart /></div>
        <div className="chart-card"><Piechart /></div>
      </div>

      <div className="barchart">
        <Barchart />
      </div>

    </div>
  );
}
