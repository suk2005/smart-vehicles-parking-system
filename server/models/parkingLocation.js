const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
  spotNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  totalSpots: {
    type: Number,
    required: true
  },
  availableSpots: {
    type: Number,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);
