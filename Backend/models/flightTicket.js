const mongoose = require('mongoose');

const flightTicketSchema = new mongoose.Schema({
    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist',  // Reference to the Tourist model
        required: true,
    },
      origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  flightNumber: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price: { type: Number, required: true },
  cardNumber: { type: String, required: true },
  cvv: { type: String, required: true },
  cardExpiryDate: { type: String, required: true },
});

module.exports = mongoose.model('FlightTicket', flightTicketSchema);
