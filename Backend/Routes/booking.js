// routes/booking.js
const express = require('express');
const { bookTicket , cancelBooking} = require('../controllers/bookingController');
const router = express.Router();

// POST route to book a ticket for an activity
router.post('/book', bookTicket);

// Route to cancel a booking by booking ID
router.post('/cancel/:bookingId', cancelBooking);

module.exports = router;
