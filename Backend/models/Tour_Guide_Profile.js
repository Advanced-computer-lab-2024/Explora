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
    default: true, // Default to false, can be updated when accepted as a guide
  },
  termsAccepted: { // Field to track terms acceptance
    type: Boolean,
    default: false
},
  rating: { 
    type: Number,
     default: 0 
},
  comment: {
     type: String,
      required: false
},
idFile: {
    type: String,
    required: false, // URL of ID file (if available)
  },
  certificatesFile : {
    type: String,
    required: false, // URL of tax file (if available)
  },
  imageFile: {
    type: String,
    required: false, // URL of photo (if available)
  },
  status: {
    type: String,
    default: 'Pending' // Default status is 'pending'
}

});
const TourGuide = User.discriminator('TourGuide', Tour_Guide_Profile_ProfileSchema);

module.exports = TourGuide;
