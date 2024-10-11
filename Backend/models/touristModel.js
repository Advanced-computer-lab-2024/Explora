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
    },
  },
  { timestamps: true }
);

// Virtual field to calculate age
touristSchema.virtual('age').get(function() {
  const currentDate = moment();
  const birthDate = moment(this.dateOfBirth); // Correct reference
  return currentDate.diff(birthDate, 'years');
});

// Use the discriminator method to create a Tourist model
const Tourist = User.discriminator('Tourist', touristSchema);

// Export the model
module.exports = Tourist;
