// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist', required: true },
    ticketCount: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
    cancellationDate: { type: Date } // Optional field to record cancellation time
});

module.exports = mongoose.model('Booking', bookingSchema);
