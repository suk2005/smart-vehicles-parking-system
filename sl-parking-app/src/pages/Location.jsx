// src/pages/Location.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import '../assets/location.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const API_URL = 'http://localhost:8080/api/bookings';

const locations = [
  { name: "Ratnagiri ST Stand", lat: 16.9902, lng: 73.3125, slots: 240 },
  { name: "Maruti Mandir", lat: 16.9947, lng: 73.3122, slots: 60 },
  { name: "Bhatye Beach Parking", lat: 16.9773, lng: 73.2810, slots: 120 },
  { name: "Ganpatipule Parking", lat: 17.1446, lng: 73.2657, slots: 320 },
  { name: "Tilak Ali Museum", lat: 16.9904, lng: 73.3139, slots: 40 },
  { name: "Mirkarwada Jetty", lat: 16.9816, lng: 73.3020, slots: 80 },
  { name: "Government Polytechnic", lat: 16.9996, lng: 73.3039, slots: 200 },
  { name: "Ratnagiri Railway Station", lat: 17.0055, lng: 73.2906, slots: 160 },
];

function Location() {
  const [locationData, setLocationData] = useState(locations); // <-- dynamic slots
  const [showForm, setShowForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [slotNumber, setSlotNumber] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const formRef = useRef();

  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    location: locations[0].name,
    time: '',
  });

  const handlePreBook = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setShowPayment(false);
    setBookingData(null);
    setSlotNumber(null);
    setPaymentDone(false);
    setTransactionId("");
    setFormInput({ name: '', email: '', phone: '', vehicle: '', location: locations[0].name, time: '' });
  };
  const handleChange = (e) => setFormInput({ ...formInput, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const convertTimeToHours = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60;
  };

  const handlePaymentVerify = () => {
    if (transactionId.trim().length >= 10) {
      alert("Transaction ID verified ✔");
      setPaymentDone(true);
    } else {
      alert("Enter a valid Transaction ID from your payment receipt.");
    }
  };

  const handlePaymentSuccess = async () => {
    if (!paymentDone) {
      alert("Please check the Transaction ID first.");
      return;
    }

    try {
      const newBooking = {
        driverName: formInput.name,
        driverEmail: formInput.email,
        driverPhone: formInput.phone,
        vehicleNumber: formInput.vehicle,
        vehicleType: "N/A",
        hours: convertTimeToHours(formInput.time),
        rent: 20,
        timestamp: new Date().toISOString(),
        slot: formInput.location,
        transactionId: transactionId,
      };

      await axios.post(`${API_URL}/add`, newBooking);

      const randomSlot = Math.floor(Math.random() * 150) + 1;
      setSlotNumber(randomSlot);

      setBookingData(formInput);
      setShowPayment(false);
      alert("Booking successful ✅");

      // **Update slots for booked location**
      setLocationData(prev =>
        prev.map(loc =>
          loc.name === formInput.location ? { ...loc, slots: loc.slots - 1 } : loc
        )
      );

    } catch (error) {
      console.error("Error saving booking:", error.response?.data || error.message);
      alert("Failed to save booking. Try again.");
    }
  };

  const handlePrint = () => {
    const printContents = formRef.current.innerHTML;
    const win = window.open('', '', 'height=600,width=800');
    win.document.write('<html><head><title>Booking Confirmation</title></head><body>');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  return (
    <div className="location-page">
      <div className="back-home-btn">
        <Link to="/" className="home-link">
          ← Back
        </Link>
      </div>

      <h1 className="title">Ratnagiri Parking Locations</h1>
      <div className="map-wrapper">
        <MapContainer center={[16.9902, 73.3125]} zoom={13} scrollWheelZoom={true} className="fullscreen-map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {locationData.map((loc, idx) => (
            <Marker key={idx} position={[loc.lat, loc.lng]}>
              <Popup>
                <strong>{loc.name}</strong><br />
                Available Slots: {loc.slots} <br />
                <button onClick={handlePreBook} className="popup-button">Pre-Book Now</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseForm}>&times;</span>
            <h2>Pre-Booking Form</h2>

            {!bookingData && !showPayment && (
              <form className="booking-form" onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formInput.name} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={formInput.email} onChange={handleChange} required />
                <label>Phone:</label>
                <input type="tel" name="phone" value={formInput.phone} onChange={handleChange} required />
                <label>Vehicle Number:</label>
                <input type="text" name="vehicle" value={formInput.vehicle} onChange={handleChange} required />
                <label>Select Location:</label>
                <select name="location" value={formInput.location} onChange={handleChange} required>
                  {locationData.map((loc, i) => <option key={i}>{loc.name}</option>)}
                </select>
                <label>Preferred Time (HH:MM):</label>
                <input type="time" name="time" value={formInput.time} onChange={handleChange} required />
                <button type="submit">Proceed to Pay</button>
              </form>
            )}

            {showPayment && (
              <div className="payment-section">
                <h3>Payment ₹20</h3>
                <p>Scan & Pay via GPay:</p>
                <img src="/gpay.jpeg" alt="GPay QR" className="qr-image" />
                <input
                  type="text"
                  placeholder="Enter UPI Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                {!paymentDone ? (
                  <button className="pay-btn" onClick={handlePaymentVerify}>
                    Verify Transaction ID
                  </button>
                ) : (
                  <button className="pay-btn" onClick={handlePaymentSuccess}>
                    Confirm & Complete Booking
                  </button>
                )}
              </div>
            )}

            {bookingData && (
              <div className="booking-confirmation" ref={formRef}>
                <h3>Booking Confirmed ✅</h3>
                <p><strong>Name:</strong> {bookingData.name}</p>
                <p><strong>Email:</strong> {bookingData.email}</p>
                <p><strong>Phone:</strong> {bookingData.phone}</p>
                <p><strong>Vehicle Number:</strong> {bookingData.vehicle}</p>
                <p><strong>Location:</strong> {bookingData.location}</p>
                <p><strong>Time:</strong> {bookingData.time}</p>
                <p><strong>Slot Number:</strong> {slotNumber}</p>
                <p><strong>Transaction ID:</strong> {transactionId}</p>
                <button onClick={handlePrint}>🖨️ Print Slip</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Location;
