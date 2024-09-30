const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    acceptedAsSeller: { type: Boolean, default: false } // Track if the seller is accepted
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
