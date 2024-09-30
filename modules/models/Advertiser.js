const mongoose = require('mongoose');

const advertiserSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the User model
    companyName: { type: String, required: true },
    website: { type: String, required: true },
    hotline: { type: String, required: true },
    profile: { type: String }, // Company profile description
    isAccepted: { type: Boolean, default: false } // Acceptance status
});

module.exports = mongoose.model('Advertiser', advertiserSchema);
