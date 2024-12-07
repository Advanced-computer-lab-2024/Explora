const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookedActivitySchema = new Schema({
    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist',  // Assuming 'User' is the Tourist model
        required: true,
      },
       activity: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Activity', // Reference to the original Activity
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
    required: true,  // Google Maps location as a string
  },
  price: {
    type: Number,   // Price as a Number for arithmetic operations
    required: true,
  },
  category: { type: Schema.Types.ObjectId, ref: 'ActivityCategory' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'PrefrenceTag' }],
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const BookedActivity = mongoose.model('BookedActivity', bookedActivitySchema);

module.exports = BookedActivity;
