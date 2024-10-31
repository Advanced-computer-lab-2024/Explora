// models/Seller.js
const mongoose = require('mongoose');
const User = require('./User');  // Import the base User model

// Seller-specific fields
const SellerSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: {
        type: String,
        trim: true
    },
    products: {
        type: [String], // Array of product names (strings)
    },
    isAccepted: {
        type: Boolean,
        default: false  // For testing, default is false
    },
    idFile: {
        type: String,
        required: false // Path to the ID file for the advertiser
    },
    taxFile: {
        type: String,
        required: false // Path to the tax file for the advertiser
    },
    imageFile: {
        type: String,
        required: false // Path to the logo for the seller
    }
});

// Create the Seller model as a discriminator of User
const Seller = User.discriminator('Seller', SellerSchema);

module.exports = Seller;
