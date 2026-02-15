import React, { useState } from "react";
import { Link } from "react-router";
import "./Auth.css";

function RegisterStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

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
        setMessage(data.message);
        setSuccess(true);
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
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default RegisterStudent;
