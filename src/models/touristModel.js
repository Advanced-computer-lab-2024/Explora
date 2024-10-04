const mongoose = require('mongoose');
const User = require('./User'); // Ensure correct import path

// Define the main tourist schema
const touristSchema = new mongoose.Schema(
  {
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
    },
    job: {
      type: String,
      required: true,
    },
    wallet: {
      type: Number,
      default: 0, // Optional: Initialize wallet with a default value
    },
  },
  { timestamps: true }
);

// Use the discriminator method to create a Tourist model
const Tourist = User.discriminator('Tourist', touristSchema);

// Export the model
module.exports = Tourist;