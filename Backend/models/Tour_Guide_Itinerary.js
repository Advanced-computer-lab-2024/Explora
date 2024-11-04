const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  tourGuideId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TourGuide', // Assuming your User model is named 'User'
    required: true 
  },
  activities: [{
    duration: { type: Number, required: true }, // Duration in minutes
    date: { type: Date, required: true },
    time: { type: String, required: true }
  }],
  timeline: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in days or appropriate unit
  language: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: { type: [Date], required: true },
  availableTimes: { type: [String], required: true },
  accessibility:{ type: Boolean, default: false }, 
  pickupLocation: { type: String, required: true },
  name: { type: String, required: false },
  dropoffLocation: { type: String, required: true },
  hasBookings: { type: Boolean, default: false},
  isActive: { type: Boolean, default: true },
  tags: { type: [String], required: false },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      tourist: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ]
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
