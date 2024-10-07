const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  name: { type: String, required: true },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}],
  locations: [{ type: String, required: true }], // Locations of the activity
  startDate: { type: Date, required: true }, // Start date of the itinerary
  endDate: { type: Date, required: true }, // End date of the itinerary
  tags: [{ type: String }], // Tags for categorizing the itinerary
  details: [{
    activity: { type: String, required: true }, // Detailed description of the activity
    location: { type: String, required: true }, // Location of the activity
    time: { type: String, required: true }, // e.g., "09:00 AM"
    duration: { type: Number, required: true }, // Duration in hours
  }],
});

module.exports = mongoose.model('Activity', ActivitySchema);
