const express = require('express');
const router = express.Router();
const Sales = require('../models/Tour_Guide_Sales');  // Ensure this is the correct path
const Itinerary = require('../models/Tour_Guide_Itinerary');  // Import the correct itinerary model
const Tourist = require('../models/touristModel');  // Assuming you have a Tourist model

// GET route to get all sales for a specific tour guide
router.get('/', async (req, res) => {
  const { tourGuideId } = req.query;  // Get tourGuideId from query parameters

  if (!tourGuideId) {
    return res.status(400).json({ message: 'tourGuideId is required in query parameters.' });
  }

  try {
    const sales = await Sales.find({ tourGuideId })
      .populate('touristId', 'username email') // Populate tourist info
      .populate('itineraryId', 'title availableDates price locations') // Populate itinerary fields

    if (sales.length === 0) {
      return res.status(404).json({ message: 'No sales found for this tour guide.' });
    }

    return res.status(200).json({ message: 'Sales records retrieved successfully', sales });
  } catch (error) {
    console.error('Error fetching sales:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
