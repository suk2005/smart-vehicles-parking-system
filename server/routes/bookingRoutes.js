const express = require("express");
const router = express.Router();
const { addBooking, getBookings, deleteBooking } = require("../controllers/bookingController");

// Routes
router.post("/add", addBooking);         // Save booking
router.get("/all", getBookings);         // Get all bookings
router.delete("/:id", deleteBooking);    // Delete booking by ID

module.exports = router;
