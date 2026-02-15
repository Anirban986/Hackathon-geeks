import React, { useState } from "react";
import { Link } from "react-router";
import "./Auth.css";
import VerifyLawyer from "./VerifyLawyer";
function RegisterParent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    registration: "",
  });

  const [message, setMessage] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/register/lawyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned non-JSON response:\n" + text);
      }

      if (response.ok) {
         // 👉 instead of showing message → open OTP popup
        setRegisteredEmail(formData.email);
        setShowOtp(true);
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Try again.");
    }
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register as Lawyer</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="registration" placeholder=" BAR registration number" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p className="message">{message}</p>

      {/* OTP POPUP */}
            {showOtp && (
              <VerifyLawyer
                email={registeredEmail}
                onClose={(verified) => {
                  setShowOtp(false);
                  if (verified) {
                    setMessage("✅ Registration complete. You can login now.");
                  }
                }}
              />
            )}
    </div>
  );
}

export default RegisterParent;
