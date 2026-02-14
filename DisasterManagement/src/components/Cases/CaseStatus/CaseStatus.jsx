import { useState } from "react";
import "./CaseStatus.css";

export default function CaseStatus() {
  const [activeTab, setActiveTab] = useState("party");

  const renderForm = () => {
    switch (activeTab) {
      case "party":
        return (
          <>
            <div className="form-row">
              <label>*Petitioner/Respondent</label>
              <input placeholder="Enter Petitioner/Respondent" />
              <label>*Registration Year</label>
              <input placeholder="Enter Year" />
            </div>
          </>
        );

      case "case":
        return (
          <div className="form-row">
            <label>*Case Number</label>
            <input placeholder="Enter Case Number" />
            <label>*Year</label>
            <input placeholder="Enter Year" />
          </div>
        );

      case "advocate":
        return (
          <div className="form-row">
            <label>*Advocate Name</label>
            <input placeholder="Enter Advocate Name" />
          </div>
        );

      case "fir":
        return (
          <div className="form-row">
            <label>*FIR Number</label>
            <input placeholder="Enter FIR Number" />
            <label>*Year</label>
            <input placeholder="Enter Year" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="case-container">

      <h2 className="title">Case Status</h2>

      {/* COURT FILTERS */}
      <div className="filters">
        <select>
          <option>West Bengal</option>
          <option>Maharashtra</option>
          <option>Karnataka</option>
          <option>Kerla</option>
          <option>Andhrapradesh</option>
          
        </select>

        <select>
          <option>North Twenty Four Parganas</option>
        </select>

        <select>
          <option>Select court complex</option>
        </select>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button className={activeTab==="party"?"active":""} onClick={()=>setActiveTab("party")}>Party Name</button>
        <button className={activeTab==="case"?"active":""} onClick={()=>setActiveTab("case")}>Case Number</button>
        <button className={activeTab==="advocate"?"active":""} onClick={()=>setActiveTab("advocate")}>Advocate</button>
        <button className={activeTab==="fir"?"active":""} onClick={()=>setActiveTab("fir")}>FIR Number</button>
      </div>

      {/* FORM AREA */}
      <div className="form-box">
        {renderForm()}

        {/* STATUS FILTER */}
        <div className="status-filter">
          <label><input type="radio" name="status" defaultChecked/> Pending</label>
          <label><input type="radio" name="status"/> Disposed</label>
          <label><input type="radio" name="status"/> Both</label>
        </div>

        {/* CAPTCHA */}
        <div className="captcha-row">
          <div className="captcha-box">cbnsbk</div>
          <input placeholder="Enter Captcha"/>
        </div>

        {/* BUTTONS */}
        <div className="buttons">
          <button className="go">Go</button>
          <button className="reset">Reset</button>
        </div>
      </div>

    </div>
  );
}
