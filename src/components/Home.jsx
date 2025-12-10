// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.css';

function Home() {
  return (
    <>
      {/* Background Video */}
      <video autoPlay muted loop id="background-video">
        <source src="/parking.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navigation Bar */}
      <nav className="menu-bar">
        <ul className="menu-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/form">PARKING_SLIP</Link></li>
          <li><Link to="/history">HISTORY</Link></li>
          <li><Link to="/services">SERVICES</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li><Link to="/location">LOCATION</Link></li>
          <li><Link to="/feedback">FEEDBACK</Link></li>
        </ul>

        <div className="logo-container">
          <img src="/logo.png" alt="Parking Logo" className="logo" />
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="welcome">
        <h1>Welcome to Park Easy</h1>
        <h2>Your Smart Vehicle Parking System</h2>

        <div className="button-group">
          <button className="cta-button">
            <Link to="/login" className="button-link">Login</Link>
          </button>

          <button className="cta-button">
            <Link to="/register" className="button-link">Register</Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;