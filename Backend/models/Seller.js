const mongoose = require('mongoose');
const User = require('./User');  // Assuming User model is in the same models folder

const sellerSchema = new mongoose.Schema({
    sellerName: { 
        type: String, 
        required: true 
    },
    sellerDescription: { 
        type: String, 
        required: true 
    },
    isSellerAccepted: {
        type: Boolean,
        default: false  // Only set to true after admin approval
    }
});

// Using Mongoose Discriminator to extend the User model
const Seller = User.discriminator('Seller', sellerSchema);

module.exports = Seller;
