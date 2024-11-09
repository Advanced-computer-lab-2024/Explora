const mongoose = require('mongoose');

const hotelReservationSchema = new mongoose.Schema({
    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist',  // Reference to the Tourist model
        required: true,
    },
    cityCode: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    hotelName: { type: String, required: true },
    reservationNumber: { type: String, required: true },
    price: { type: Number, required: true },
    cardNumber: { type: String, required: true },
    cvv: { type: String, required: true },
    cardExpiryDate: { type: String, required: true },
});

module.exports = mongoose.model('HotelReservation', hotelReservationSchema);
