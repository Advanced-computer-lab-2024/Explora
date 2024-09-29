const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItinerarySchema = new Schema({
  activities: [{ type: String, required: true }],
  locations: [{ type: String, required: true }],
  timeline: [{ type: String, required: true }], // e.g., "9:00 AM - Visit Museum"
  duration: { type: Number, required: true }, // in hours
  language: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: [{ type: Date, requisred: true }],
  availableTimes: [{ type: String, required: true }], // e.g., "09:00 AM"
  accessibility: { type: Boolean, default: false }, // e.g., wheelchair access
  pickupLocation: { type: String },
  dropoffLocation: { type: String }
});

// Define the booking schema
const bookingSchema = new Schema({
  itineraryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',
    required: true // This field is required and references the Itinerary model
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true // This field is required and references the User model
  },
  bookingDate: {
    type: Date,
    default: Date.now // Set to the current date and time by default
  },
  numberOfPeople: {
    type: Number,
    required: true // This field indicates how many people are booked
  },
  specialRequests: {
    type: String,
    trim: true // Optional field for any special requests by the user
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'canceled'], // Possible statuses for a booking
    default: 'pending' // Default status set to 'pending'
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields


module.exports = mongoose.model('Booking', bookingSchema);
module.exports = mongoose.model('Itinerary', ItinerarySchema);
