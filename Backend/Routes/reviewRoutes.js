const express = require('express');
const { getItinerary, addItineraryReview, addTourGuideReview } = require('../controllers/reviewController');

const router = express.Router();

// Route to view an itinerary and its associated tour guide
router.get('/:id', getItinerary);

// Route to add a review to an itinerary
router.post('/:id/review', addItineraryReview);

// Route to add a review to a tour guide
router.post('/:id/review-tour-guide', addTourGuideReview);

module.exports = router;
