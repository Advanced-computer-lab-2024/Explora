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
    isAccepted: { type: Boolean, default: false }, // Acceptance status
    idFile: {
        type: String,
        required: true // Path to the ID file for the advertiser
    },
    taxFile: {
        type: String,
        required: true // Path to the tax file for the advertiser
    },
    imageFile: {
        type: String,
        required: true // Path to the logo for the seller
    },
    status: {
        type: String,
        default: 'Pending' // Default status is 'pending'
    }
});

const Advertiser = User.discriminator('Advertiser', advertiserSchema);

module.exports = Advertiser;