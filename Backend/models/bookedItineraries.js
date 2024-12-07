const mongoose = require('mongoose');

const bookedItinerarySchema = new mongoose.Schema({
  itinerary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',  // Reference to the Itinerary model
    required: true,
  },
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',  // Reference to the Tourist model
    required: true,
  },
  tourGuideName: { type: String, required: true },
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
  availableDates: { type: [Date], required: true },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  tags: { type: [String], required: false },
  rating: { type: Number, default: 0 },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const BookedItinerary = mongoose.model('BookedItinerary', bookedItinerarySchema);

module.exports = BookedItinerary;
