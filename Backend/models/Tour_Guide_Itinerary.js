const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItinerarySchema = new Schema({
  activities: [{ type: String, required: true }],
  locations: [{ type: String, required: true }],
  timeline: [{ type: String, required: true }], // e.g., "9:00 AM - Visit Museum"
  duration: { type: Number, required: true }, // in hours
  language: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: [{ type: Date, required: true }],
  availableTimes: [{ type: String, required: true }], // e.g., "09:00 AM"
  accessibility: { type: Boolean, default: false }, // e.g., wheelchair access
  pickupLocation: { type: String },
  name: { type: String },
  dropoffLocation: { type: String },
  rating: { type: Number, required: true },
  hasBookings: { type: Boolean, default: false }, // Track if bookings are made
  tags: [{ type: String }] // Ensure this field is present
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);