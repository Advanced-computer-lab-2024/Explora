const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
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
    required: true,
  },
  location: {
    type: String,
    required: true,  // You can save Google Maps location as a string
  },
  price: {
    type: Number,   // Price as a Number for arithmetic operations
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ActivityCategory',
    required: true,
  },
  tags: {
    type: 
    [{
      type: mongoose.Schema.Types.ObjectId,   // Reference the PrefrenceTag model
      ref: 'PrefrenceTag'
    }], 
    default: [],
  
  },
  specialDiscounts: {
    type: String,
    default: null,  // Optional field
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
