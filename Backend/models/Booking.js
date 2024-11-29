// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' },
  itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' },
  bookingDate: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
