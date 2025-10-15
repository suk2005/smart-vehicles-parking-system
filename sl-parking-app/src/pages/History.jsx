// src/pages/History.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/history.css';

const API_URL = "http://localhost:8080/api/bookings";

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const filteredBookings = bookings.filter((b) =>
    (b.driverName || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.vehicleNumber || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="history-page">
      {/* Back Button */}
      <div className="back-home-btn">
        <Link to="/" className="home-link">
          ← Back
        </Link>
      </div>

      <h2>Booking History</h2>

      <input
        className="search-bar"
        type="text"
        placeholder="Search by driver name or vehicle number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="history-table">
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>Vehicle Number</th>
            <th>Vehicle Type</th>
            <th>Hours</th>
            <th>Rent (₹)</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((b) => (
              <tr key={b._id}>
                <td>{b.driverName}</td>
                <td>{b.vehicleNumber}</td>
                <td>{b.vehicleType}</td>
                <td>{b.hours}</td>
                <td>{b.rent}</td>
                <td>{new Date(b.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
