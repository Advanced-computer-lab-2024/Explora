const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  itineraryId: {
    type: Schema.Types.ObjectId,
    ref: 'Itinerary', // Assuming there's an Itinerary model
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a User model
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending'
  },
  paymentDetails: {
    cardType: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      required: true
    },
    expiryDate: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('Booking', BookingSchema);
