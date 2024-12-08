const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  tourGuide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourGuide',
    required: false, // Optional because it can be a review for itinerary
  },
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
    required: true,
  },
  itinerary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour_Guide_Itinerary',
    required: false, // Optional because it can be a review for tour guide
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
