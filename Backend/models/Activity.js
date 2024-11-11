const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const ActivityCategory = require('./ActivityCategory');
const PrefrenceTag = require('./PrefrenceTag');

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
  rating: {
    type: Number,
    required: false,
  },
  location: {
    type: String,
    required: true,  // You can save Google Maps location as a string
  },
  price: {
    type: Number,   // Price as a Number for arithmetic operations
    required: true,
  },
  category: { type: Schema.Types.ObjectId, ref: 'ActivityCategory' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'PrefrenceTag' }],
    specialDiscounts: {
      type: String,  // Assuming your discount model is named 'Discount'
      required: false,  // Optional field
    },
  bookingOpen: {
    type: Boolean,
    default: true,  // Optional field with default value
  },
  isDeleted: {
    type: Boolean,
    default: false,  // Optional field
  },
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
