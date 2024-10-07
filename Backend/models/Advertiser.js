const mongoose = require('mongoose');
const User = require('./User');  // Import the base User model

const advertiserSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    website: { type: String, required: true },
    hotline: { type: String, required: true },
    profile: { type: String }, // Company profile description
    isAccepted: { type: Boolean, default: false } // Acceptance status
});

const Advertiser = User.discriminator('Advertiser', advertiserSchema);

module.exports = Advertiser;