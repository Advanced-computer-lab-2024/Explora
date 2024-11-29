const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    tourGuideId: { type: mongoose.Schema.Types.ObjectId, ref: 'TourGuide', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Sales', salesSchema);
