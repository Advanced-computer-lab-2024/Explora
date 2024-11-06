const mongoose = require('mongoose');
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
    loyaltyPoints: {
      type: Number,
      default: 0,
  },
  },
  { timestamps: true }
);
// Virtual field to calculate age
touristSchema.virtual('age').get(function() {
  const currentDate = moment();
  const birthDate = moment(this.dob);
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
