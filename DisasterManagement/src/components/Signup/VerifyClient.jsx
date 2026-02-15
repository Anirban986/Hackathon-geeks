import React, { useState } from "react";
import "./Auth.css";

function VerifyClient({ email, onClose }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/verify-otp/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Email verified successfully!");
        setTimeout(() => onClose(true), 1200);
      } else {
        setMessage(data.error || "Invalid OTP");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <h2>Email Verification</h2>
        <p>OTP sent to <b>{email}</b></p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>

        <p className="message">{message}</p>

        <button className="close-btn" onClick={() => onClose(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default VerifyClient;
