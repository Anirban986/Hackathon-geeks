import React, { useState } from "react";
import RegisterStudent from "./RegisterStudent";
import RegisterParent from "./RegisterParent";
import RegisterTeacher from "./RegisterTeacher";
import LoginStudent from "./LoginStudent";
import LoginParent from "./LoginParent";
import LoginTeacher from "./LoginTeacher";
import "./SignUp.css";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";

function SignUp({ isOpen, onClose }) {
  const [mainTab, setMainTab] = useState("register"); // "register" or "login"
  const [activeTab, setActiveTab] = useState("Client"); // student/parent/teacher

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Main Tabs: Register / Login */}
        <div className="tab-buttons">
          <button
            onClick={() => { setMainTab("register"); setActiveTab("Client"); }}
            className={mainTab === "register" ? "active" : ""}
          >
            Register
          </button>
          <button
            onClick={() => { setMainTab("login"); setActiveTab("Client"); }}
            className={mainTab === "login" ? "active" : ""}
          >
            Login
          </button>
        </div>

        {/* Sub Tabs: Student / Parent / Teacher */}
        <div className="tab-buttons">
          <button onClick={() => setActiveTab("Client")} className={activeTab === "Client" ? "active" : ""}>
            Client
          </button>
          <button onClick={() => setActiveTab("Lawyer")} className={activeTab === "Lawyer" ? "active" : ""}>
            Lawyer
          </button>
          <button onClick={() => setActiveTab("Judge")} className={activeTab === "Judge" ? "active" : ""}>
            Judge
          </button>
          <button onClick={() => setActiveTab("Admin")} className={activeTab === "Admin" ? "active" : ""}>
            Admin
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {mainTab === "register" && activeTab === "Client" && <RegisterStudent />}
          {mainTab === "register" && activeTab === "Lawyer" && <RegisterParent />}
          {mainTab === "register" && activeTab === "Judge" && <RegisterTeacher />}
          {mainTab === "register" && activeTab === "Admin" &&   <AdminRegister/>}
          {mainTab === "login" && activeTab === "Client" && <LoginStudent />}
          {mainTab === "login" && activeTab === "Lawyer" && <LoginParent />}
          {mainTab === "login" && activeTab === "Judge" && <LoginTeacher />}
          {mainTab === "login" && activeTab === "Admin" && <AdminLogin/>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
