const mongoose = require('mongoose');
const User = require('./User');

const Tour_Guide_Profile_ProfileSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  name:{
    type: String,
    required: false
  },
  mobile: {
    type: String,
    required: false,
  },
  yearsOfExperience: {
    type: Number,
    required: false,
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
const TourGuide = User.discriminator('TourGuide', Tour_Guide_Profile_ProfileSchema);

module.exports = TourGuide;
