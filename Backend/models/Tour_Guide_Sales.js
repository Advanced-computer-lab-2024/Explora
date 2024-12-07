const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  tourGuideId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'TourGuide' },
  itineraryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Itinerary' },
  touristId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;
