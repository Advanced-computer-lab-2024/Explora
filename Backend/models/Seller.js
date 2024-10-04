// models/Seller.js
const mongoose = require('mongoose');
const User = require('./User');  // Import the base User model

// Seller-specific fields
const SellerSchema = new mongoose.Schema({
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
    }
});

// Create the Seller model as a discriminator of User
const Seller = User.discriminator('Seller', SellerSchema);

module.exports = Seller;
