// src/pages/Contact.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import '../components/contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Back Button */}
      <div className="back-home-btn">
        <Link to="/" className="home-link">
          ← Back
        </Link>
      </div>

      {/* Banner */}
      <div className="contact-banner">
        <h1>CONTACT US</h1>
      </div>

      {/* Contact Icons */}
      <div className="contact-icons">
        <a href="https://wa.me/8275876460" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="icon" /> WhatsApp
        </a>
        <a href="https://github.com/suk2005" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon" /> GitHub
        </a>
        <a href="mailto:sumitkambli16@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope className="icon" /> Gmail
        </a>
        <a href="https://www.linkedin.com/in/sumit-kambli-a15155295/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="icon" /> LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Contact;
