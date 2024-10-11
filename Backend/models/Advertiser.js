const mongoose = require('mongoose');
const User = require('./User');  // Import the base User model

const advertiserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: false, 
        unique: true 
    },
    companyName: { type: String, required: false },
    website: { type: String, required: false },
    hotline: { type: String, required: false },
    profile: { type: String }, // Company profile description
    isAccepted: { type: Boolean, default: false } // Acceptance status
});

const Advertiser = User.discriminator('Advertiser', advertiserSchema);

module.exports = Advertiser;