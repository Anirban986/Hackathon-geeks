import React, { useState } from "react";
import "./Auth.css";
import VerifyClient from "./VerifyClient";

function RegisterStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:3000/register/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

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
        <h2>Register as Client</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p className="message">{message}</p>

      {/* OTP POPUP */}
      {showOtp && (
        <VerifyClient
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

export default RegisterStudent;
