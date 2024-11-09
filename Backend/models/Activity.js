const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  advertiserId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Assuming your User model is named 'User'
    required: true 
  },

  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: { type: Number, min: 1, max: 5, required: true },
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  location: {
    type: String,
    required: true, // Store location as a string (e.g., Google Maps location URL or address)
  },
  price: {
    type: Number, // Store price as a number for calculations
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActivityCategory',
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference the PrefrenceTag model
      ref: 'PrefrenceTag',
    },
  ],
  specialDiscounts: {
    type: String,
    default: null, // Optional field
  },
  bookingOpen: {
    type: Boolean,
    default: true, // Optional field with default value
  },
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
