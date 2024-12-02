const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tourGuideId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'TourGuide' },
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itinerary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',
    required: true,
  },
  numberOfTickets: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
});

const Book = mongoose.model('Book', bookingSchema);

module.exports = Book;
