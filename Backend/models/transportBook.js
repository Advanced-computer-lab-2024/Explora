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
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
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
bookingSchema.methods.processPayment = async function() {
    const Tourist = require('./Tourist'); // Ensure correct import path
    const tourist = await Tourist.findById(this.tourist);
    
    // Check if tourist has enough wallet balance
    if (tourist.wallet >= this.totalPrice) {
        tourist.wallet -= this.totalPrice; // Deduct the total price from wallet
        await tourist.save(); // Save the updated tourist data
        return true; // Payment successful
    } else {
        throw new Error('Insufficient funds in wallet'); // Handle insufficient funds
    }
};

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
