import React from "react";
import "./AboutUs.css";

export default function About() {
  return (
    <div className="about-container">

      {/* HERO */}
      <section className="about-hero">
        <h1>About Our Website</h1>
        <p>
          A digital bridge between citizens and the justice system.
        </p>
      </section>

      {/* INTRO */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          NyayaSetu is a judiciary assistance platform designed to simplify
          legal processes and make justice accessible to everyone. Our platform
          connects clients, lawyers, and court authorities in one unified
          ecosystem where legal updates, case tracking, and communication
          become seamless and transparent.
        </p>
      </section>

      {/* PROBLEM */}
      <section className="about-section light">
        <h2>Problems We Solve</h2>
        <ul>
          <li>Difficulty tracking case status</li>
          <li>Missing hearing dates</li>
          <li>Limited communication with advocates</li>
          <li>Understanding legal rights</li>
          <li>Accessing court orders and notices</li>
        </ul>
      </section>

      {/* FEATURES */}
      <section className="about-section">
        <h2>Key Features</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📂 Case Tracking</h3>
            <p>Track hearings, adjournments, and judgments in real time.</p>
          </div>

          <div className="feature-card">
            <h3>👨‍⚖️ Advocate Hiring</h3>
            <p>Explore advocate profiles, specialization and experience.</p>
          </div>

          <div className="feature-card">
            <h3>📜 Court Notices</h3>
            <p>Receive official orders and documents directly.</p>
          </div>

          <div className="feature-card">
            <h3>📚 Learn Your Rights</h3>
            <p>Understand the Indian Constitution in simple language.</p>
          </div>

          <div className="feature-card">
            <h3>💬 Communication Portal</h3>
            <p>Structured communication between clients and lawyers.</p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="about-section light">
        <h2>Our Vision</h2>
        <p>
          To build a transparent, citizen-centric judiciary ecosystem where
          legal information is understandable, case updates are visible,
          and justice becomes accessible to everyone.
        </p>
      </section>

      {/* MISSION */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          We aim to leverage technology to simplify legal procedures and empower
          citizens with knowledge, accessibility, and confidence in the justice
          system.
        </p>
      </section>

      {/* FOOTER NOTE */}
      <section className="about-footer">
        <p>
          Justice works best when people understand it.  
          NyayaSetu brings law closer to citizens.
        </p>
      </section>

    </div>
  );
}

