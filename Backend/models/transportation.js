const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transportationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: { type: String, required: true, default: 'USD' },
  method: {
    type: String,
    enum: ['bus', 'car', 'microbus', 'train', 'plane', 'bike', 'other'],
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes or hours, depending on your preference
    required: false,
  },
  capacity: {
    type: Number,
    required: false,
  },
}, { timestamps: true });

const Transportation = mongoose.model('Transportation', transportationSchema);
module.exports = Transportation;
