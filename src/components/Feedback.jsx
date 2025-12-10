import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

const Feedback = () => {
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dqsmn5j",   // replace with your service ID
        "template_ywlhj3j",  // replace with your template ID
        e.target,
        "gDui5Gynluc_MNvIM"  // replace with your public key
      )
      .then(
        () => {
          setStatus("✅ Feedback sent successfully!");
          e.target.reset();
        },
        () => {
          setStatus("❌ Failed to send feedback. Try again!");
        }
      );
  };

  return (
    <div className="feedback-page">
      {/* Back Button */}
      <Link to="/" className="back-btn">← Back</Link>

      <div className="feedback-container">
        <h2>Feedback Form</h2>
        <form onSubmit={sendEmail}>
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
          />
          <button type="submit">Send Feedback</button>
        </form>
        <p className="status">{status}</p>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .feedback-page {
          background: linear-gradient(135deg, #e0f7fa, #e3f2fd);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-family: 'Poppins', sans-serif;
        }

        .back-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          transition: 0.3s;
        }

        .back-btn:hover {
          background-color: #0056b3;
        }

        .feedback-container {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .feedback-container h2 {
          margin-bottom: 20px;
          color: #333;
        }

        .feedback-container input,
        .feedback-container textarea {
          width: 100%;
          margin-bottom: 12px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
        }

        .feedback-container button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s;
        }

        .feedback-container button:hover {
          background-color: #0056b3;
        }

        .status {
          margin-top: 15px;
          color: #333;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default Feedback;
