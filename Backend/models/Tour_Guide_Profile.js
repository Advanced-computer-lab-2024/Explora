const mongoose = require('mongoose');
const User = require('./User');

const Tour_Guide_Profile_ProfileSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  previousWork: {
    type: String, 
    default: '',
  },
  isAccepted: {
    type: Boolean,
    default: false, // Default to false, can be updated when accepted as a guide
  }
});
const TourGuide = User.discriminator('TourGuide', Tour_Guide_ProfileSchema);

module.exports = TourGuide;
