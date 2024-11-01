const mongoose = require('mongoose');
const User = require('./User');

const Tour_Guide_Profile_ProfileSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  tourists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'touristModel' // Link to Tourist model
  }],
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
  },
  profilePicture: { 
    type: String, 
    default: '', // Default to empty string if no image uploaded
  },
  termsAccepted: { // Field to track terms acceptance
    type: Boolean,
    default: false
  },
});
const TourGuide = User.discriminator('TourGuide', Tour_Guide_Profile_ProfileSchema);

module.exports = TourGuide;
