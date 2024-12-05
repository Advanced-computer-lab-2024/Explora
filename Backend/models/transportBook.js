const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist',  // Reference to the Tourist model
        required: true,
    },
    transportation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transportation',  // Reference to the Transportation method
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    method: {
      type: String,
      enum: ['bus', 'car', 'microbus', 'train', 'plane', 'bike', 'other'],
      required: true,
    },
    seatsBooked: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

// Adding a method to process the booking payment


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
