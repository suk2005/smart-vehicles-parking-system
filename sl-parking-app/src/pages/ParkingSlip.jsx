import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./parkingslip.css";

const ParkingSlip = () => {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [rent, setRent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [transactionId, setTransactionId] = useState(""); // ✅ Transaction ID

  const [formData, setFormData] = useState({
    driverName: "",
    driverEmail: "",
    driverPhone: "",
    driverPicture: "",
    vehicleNumber: "",
    vehicleType: "Car",
    hours: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file" && name === "driverPicture") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, [name]: file.name }));
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!/^[A-Za-z ]{3,}$/.test(formData.driverName))
      newErrors.driverName = "Name must be at least 3 letters.";

    if (!/^\S+@\S+\.\S+$/.test(formData.driverEmail))
      newErrors.driverEmail = "Enter a valid email.";

    if (!/^\d{10}$/.test(formData.driverPhone))
      newErrors.driverPhone = "Phone must be 10 digits.";

    if (step === 2) {
      if (!/^[A-Za-z0-9]{6,10}$/.test(formData.vehicleNumber))
        newErrors.vehicleNumber = "Enter a valid vehicle number.";

      if (!formData.hours) newErrors.hours = "Please select duration.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) setStep(2);
  };

  const handlePaymentVerify = () => {
    if (transactionId.length >= 10) {
      alert(
        "Please check this Transaction ID in your bank/GPay app.\nIf valid, press OK."
      );
      setPaymentDone(true);
    } else {
      alert("Enter a valid Transaction ID from your payment receipt.");
    }
  };

  // ✅ Corrected rent calculation logic added here (as per your request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields() || !paymentDone) return;

    // ✅ Corrected rent calculation
    let calculatedRent = 0;
    if (formData.hours === "1") calculatedRent = 100;
    else if (formData.hours === "3") calculatedRent = 300;
    setRent(calculatedRent);

    const newEntry = {
      ...formData,
      rent: calculatedRent,
      timestamp: new Date().toISOString(),
      transactionId: transactionId,
    };

    try {
      await axios.post("http://localhost:8080/api/bookings/add", newEntry);
      setSubmitted(true);
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("Failed to save booking. Try again.");
    }
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => window.print(), 300);
    }
  }, [submitted]);

  return (
    <div className="parking-slip-wrapper">
      <video autoPlay muted loop className="bg-video">
        <source src="/parking_bg.mp4" type="video/mp4" />
      </video>

      <div className="back-home-btn">
        <Link to="/" className="home-link">
          ← Back
        </Link>
      </div>

      <div className="sl-container">
        <h2 className="sl-heading">Smart Parking Pass</h2>
        <form onSubmit={handleSubmit} className="sl-form">
          {step === 1 && (
            <div className="sl-step">
              <label>Driver Name</label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
              />
              {errors.driverName && <p className="error">{errors.driverName}</p>}

              <label>Driver Email</label>
              <input
                type="email"
                name="driverEmail"
                value={formData.driverEmail}
                onChange={handleChange}
              />
              {errors.driverEmail && <p className="error">{errors.driverEmail}</p>}

              <label>Driver Phone</label>
              <input
                type="tel"
                name="driverPhone"
                value={formData.driverPhone}
                onChange={handleChange}
              />
              {errors.driverPhone && <p className="error">{errors.driverPhone}</p>}

              <label>Upload Driver Photo</label>
              <input
                type="file"
                name="driverPicture"
                accept="image/*"
                onChange={handleChange}
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="sl-preview" />
              )}

              <button
                type="button"
                className="sl-btn"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && !submitted && (
            <div className="sl-step">
              <label>Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
              />
              {errors.vehicleNumber && (
                <p className="error">{errors.vehicleNumber}</p>
              )}

              <label>Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
              >
                <option>Car</option>
                <option>Bike</option>
              </select>

              <label>Parking Duration (months)</label>
              <select
                name="hours"
                value={formData.hours}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {[1, 3].map((hr) => (
                  <option key={hr} value={hr}>
                    {hr} month(s) - ₹{hr * 100}
                  </option>
                ))}
              </select>
              {errors.hours && <p className="error">{errors.hours}</p>}

              <hr />
              <h3>Scan & Pay via GPay</h3>
              <div className="qr-container">
                <img src="/gpay_qr.jpeg" alt="GPay QR" className="qr-image" />
                <h5>Payment for 1 month pass</h5>
                <img src="/phonepe_qr.jpeg" alt="PhonePe QR" className="qr-image" />
                <h5>Payment for 3 month pass</h5>
              </div>

              {/* Enter Transaction ID */}
              <input
                type="text"
                placeholder="Enter UPI Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
              {!paymentDone ? (
                <button
                  type="button"
                  className="sl-btn pay-btn"
                  onClick={handlePaymentVerify}
                >
                  Verify Payment
                </button>
              ) : (
                <p className="success">Payment confirmed ✔</p>
              )}

              <div className="sl-buttons">
                <button
                  type="button"
                  className="sl-btn"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="sl-btn"
                  disabled={!paymentDone}
                >
                  Generate Pass
                </button>
              </div>
            </div>
          )}
        </form>

        {submitted && (
          <div className="sl-summary">
            <h3>Parking Slip Summary</h3>
            <p>
              <strong>Driver:</strong> {formData.driverName}
            </p>
            <p>
              <strong>Vehicle:</strong> {formData.vehicleNumber} (
              {formData.vehicleType})
            </p>
            <p>
              <strong>Duration:</strong> {formData.hours} month(s)
            </p>
            <p>
              <strong>Total:</strong> ₹{rent}
            </p>
            <p>
              <strong>Transaction ID:</strong> {transactionId}
            </p>
            <p>
              <strong>Payment:</strong> Done via GPay
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingSlip;
