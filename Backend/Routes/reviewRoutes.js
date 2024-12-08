const express = require('express');
const { getItinerary, addItineraryReview, addTourGuideReview } = require('../controllers/reviewController');
const Review = require('../models/Review');
const TourGuide = require('../models/Tour_Guide_Profile');
const Tourist = require('../models/touristModel');
const Itinerary = require('../models/Tour_Guide_Itinerary');

const router = express.Router();

// Route to view an itinerary and its associated tour guide
router.get('/:id', getItinerary);

// Route to add a review to an itinerary
router.post('/:id/review', addItineraryReview);

// Route to add a review to a tour guide
router.post('/:id/review-tour-guide', addTourGuideReview);

// POST: Rate and comment on an itinerary
router.post('/rateItinerary', async (req, res) => {
    const { touristId, itineraryId, rating, comment } = req.body;
  
    try {
      // Ensure the tourist exists
      const tourist = await Tourist.findById(touristId);
      if (!tourist) {
        return res.status(404).json({ msg: 'Tourist not found' });
      }
  
      // Ensure the itinerary exists
      const itinerary = await Itinerary.findById(itineraryId);
      if (!itinerary) {
        return res.status(404).json({ msg: 'Itinerary not found' });
      }
  
      // Update the itinerary's rating and comment
      itinerary.rating = rating;
      itinerary.comment = comment;
  
      // You can also calculate the average rating if you have multiple ratings, for example:
      // itinerary.rating = (itinerary.rating + rating) / 2;  // Average rating
  
      await itinerary.save();
  
      res.status(200).json({ msg: 'Rating and comment added successfully', itinerary });
    } catch (error) {
      console.error('Error adding rating and comment:', error);
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  });
    
  // POST: Rate and comment on a tour guide
  router.post('/rateTourGuide', async (req, res) => {
    const { touristId, tourGuideId, rating, comment } = req.body;
  
    try {
      // Ensure the tourist exists
      const tourist = await Tourist.findById(touristId);
      if (!tourist) {
        return res.status(404).json({ msg: 'Tourist not found' });
      }
  
      // Ensure the tour guide exists
      const tourGuide = await TourGuide.findById(tourGuideId);
      if (!tourGuide) {
        return res.status(404).json({ msg: 'Tour guide not found' });
      }
  
      // Create a new review for the tour guide
      const newReview = new Review({
        tourist: touristId,
        tourGuide: tourGuideId,
        rating,
        comment,
      });

      tourGuide.rating = rating;
      tourGuide.comment = comment;
  
      await tourGuide.save();
  
      res.status(201).json({ msg: 'Review added successfully', review: newReview });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  });
      
module.exports = router;
