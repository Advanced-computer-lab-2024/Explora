const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the nested schema for the wallet
const walletType = new mongoose.Schema({
  name: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  cvv: { type: Number, required: true },
  expiryDate: { type: Date, required: true } // fixed the typo
});

// Define the main tourist schema
const touristSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  wallet: {
    type: walletType,
    required: true
  }
}, { timestamps: true });

// Export the model
const Tourist = mongoose.model('Tourist', touristSchema);
module.exports = Tourist; 