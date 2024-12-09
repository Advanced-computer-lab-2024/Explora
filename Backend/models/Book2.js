const mongoose = require('mongoose');

const bookingSchema2 = new mongoose.Schema({
  advertiserId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Advertiser' 
  }, // References the advertiser who created the activity
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, // References the tourist making the booking
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  }, // References the booked activity
  numberOfTickets: {
    type: Number,
    required: true,
    default: 1,
  }, // Number of tickets booked
  totalPrice: {
    type: Number,
    required: true,
  }, // Total cost of the booking
  bookingDate: {
    type: Date,
    default: Date.now,
  }, // Date the booking was made
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  }, // Tracks the payment status
});

const Book2 = mongoose.model('Book2', bookingSchema2);

module.exports = Book2;
