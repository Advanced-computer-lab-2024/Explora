const mongoose = require('mongoose');
const moment = require('moment'); // Ensure you have moment.js installed
const User = require('./User'); // Ensure correct import path

// Define the main tourist schema
const touristSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    tours: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour_Guide_Profile' // Link to TourGuide model
     }],
    mobileNumber: {
      type: String, // Changed to String to accommodate various formats (e.g., international)
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      immutable: true
    },
    job: {
      type: String,
      required: true,
    },
    wallet: {
      type: Number,
      default: 0, // Optional: Initialize wallet with a default value
      currency: 'USD', // Optional: Add currency field
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
  },
  bookmarksActivity: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }] ,// Array of bookmarked event IDs
  bookmarksItinerary: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }] // Array of bookmarked event IDs
  },
  { timestamps: true }
);

// Virtual field to calculate age
touristSchema.virtual('age').get(function() {
  const currentDate = moment();
  const birthDate = moment(this.dateOfBirth); // Correct reference
  return currentDate.diff(birthDate, 'years');
});



touristSchema.virtual('level').get(function () {
  if (this.loyaltyPoints > 500000) {
      return 3;
  } else if (this.loyaltyPoints > 100000) {
      return 2;
  } else {
      return 1;
  }
});

touristSchema.virtual('badge').get(function () {
  const level = this.level;
  switch (level) {
      case 3:
          return 'Gold';
      case 2:
          return 'Silver';
      case 1:
          return 'Bronze';
      default:
          return 'No Badge';
  }
});



// Use the discriminator method to create a Tourist model
const Tourist = User.discriminator('Tourist', touristSchema);

// Export the model
module.exports = Tourist;
