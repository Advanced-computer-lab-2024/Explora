const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({

    activities: [{
      duration: { type: Number, required: true }, // Duration in minutes
      date: { type: Date, required: true },
      time: { type: String, required: true },
    }],
  locations: { type: String, required: true },
  timeline: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in days or appropriate unit
  language: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true, default: 'USD' },
  availableDates: { type: [Date], required: true },
  availableTimes: { type: [String], required: true },
  accessibility:{ type: Boolean, default: false }, 
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  name: { type: String, required: false },
  hasBookings: {
    type: Boolean,
    default: false, // Default to false, can be updated when accepted as a guide
  },
  tags: { type: [String], required: false },
  rating: { type: Number, default: 0 },
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
