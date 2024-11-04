const Itinerary = require('../models/Tour_Guide_Itinerary'); // Itinerary model
const TourGuide = require('../models/Tour_Guide_Profile');   // Tour Guide model
const User = require('../models/User');                     // User model for tourists

// Fetch itinerary details along with reviews
const getItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id).populate('reviews.tourist', 'username');
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a review to a specific itinerary
const addItineraryReview = async (req, res) => {
    const { rating, comment } = req.body;
    const touristId = req.user._id; // Assuming authentication middleware adds user ID to req.user

    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        itinerary.reviews.push({ tourist: touristId, rating, comment, date: new Date() });
        await itinerary.save();

        res.status(201).json({ message: 'Review added successfully', review: { rating, comment } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a review for the tour guide
const addTourGuideReview = async (req, res) => {
    const { rating, comment } = req.body;
    const touristId = req.user._id;

    try {
        const itinerary = await Itinerary.findById(req.params.id).populate('tourGuide');
        if (!itinerary || !itinerary.tourGuide) {
            return res.status(404).json({ error: 'Tour guide or itinerary not found' });
        }

        const tourGuide = await TourGuide.findById(itinerary.tourGuide._id);
        tourGuide.reviews.push({ tourist: touristId, rating, comment, date: new Date() });
        await tourGuide.save();

        res.status(201).json({ message: 'Tour guide review added successfully', review: { rating, comment } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getItinerary,
    addItineraryReview,
    addTourGuideReview
};
