const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TouristItinerarySchema = new Schema({
  activities: [{ type: String, required: true }],
  locations: [{ type: String, required: true }],
  startDate: { type: Date, required: true }, // Start date of the itinerary
  endDate: { type: Date, required: true }, // End date of the itinerary
  tags: [{ type: String }], // Tags for categorizing the itinerary
  details: [{
    activity: { type: String, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true }, // e.g., "09:00 AM"
    duration: { type: Number, required: true }, // in hours
  }],
});

module.exports = mongoose.model('TouristItinerary', TouristItinerarySchema);
