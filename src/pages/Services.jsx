// src/pages/Services.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../assets/services.css";

const Services = () => {
  return (
    <div className="services-page">
      {/* Back Button */}
      <div className="back-home-btn">
        <Link to="/" className="home-link">
          ← Back
        </Link>
      </div>

      <h2>Our Smart Parking Services</h2>

      <div className="service-boxes">
        <div className="service-box">
        
          <h3>24/7 Customer Support</h3>
          <p>Our support team is available around the clock to help you with any parking-related issues.</p>
        </div>

        <div className="service-box">
          
          <h3>Chatbot Assistance</h3>
          <p>Get instant answers to your parking queries with our AI-powered chatbot, available on the bottom-left corner.</p>
        </div>

        <div className="service-box">
          
          <h3>SMS & Email Alerts</h3>
          <p>Receive instant confirmations, reminders, and alerts via SMS and email after booking or check-in.</p>
        </div>

        <div className="service-box">
          
          <h3>Real-Time Slot Availability</h3>
          <p>Check live slot status before arriving, so you always find a spot without delay.</p>
        </div>

        <div className="service-box">
          
          <h3>Secure Digital Payments</h3>
          <p>Pay safely through card or UPI with complete data encryption and protection.</p>
        </div>

        <div className="service-box">
          
          <h3>Multi-Vehicle Support</h3>
          <p>Our platform supports bookings for cars, bikes, scooties, and even auto rickshaws and bicycles.</p>
        </div>
      </div>

    </div>
  );
};

export default Services;
