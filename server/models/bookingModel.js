const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  driverName: { type: String, required: true },
  driverEmail: { type: String, required: true },
  driverPhone: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  hours: { type: Number, required: true },
  rent: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
