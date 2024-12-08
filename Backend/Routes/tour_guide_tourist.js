const express = require('express');
const router = express.Router();
const Sales = require('../models/Tour_Guide_Sales');  // Ensure this is the correct path
const Itinerary = require('../models/Tour_Guide_Itinerary');  // Import the correct itinerary model
const Tourist = require('../models/touristModel');  // Assuming you have a Tourist model

// GET route to fetch tourists who booked a specific tour guide's itinerary
router.get('/', async (req, res) => {
  const { tourGuideId } = req.query;  // Get tourGuideId from query parameters

  if (!tourGuideId) {
    return res.status(400).json({ message: 'tourGuideId is required in query parameters.' });
  }

  try {
    // Fetch sales for the specific tour guide
    const sales = await Sales.find({ tourGuideId })
      .populate('touristId', 'username email')  // Populate tourist details (name and email)
      .populate('itineraryId', 'locations availableDates')  // Populate itinerary details
      .exec();

    if (sales.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this tour guide.' });
    }

    // Extract the tourist names, itinerary details, and booking date
    const touristDetails = sales.map((sale) => ({
      touristName: sale.touristId.username,
      touristEmail: sale.touristId.email,
      itineraryLocations: sale.itineraryId.locations,  // Itinerary location
      bookingDate: sale.date,  // Date the booking was made
    }));

    res.status(200).json({ message: 'Tourists who booked the itinerary', touristDetails });
  } catch (err) {
    console.error('Error fetching tourists who booked itinerary:', err.message);
    res.status(500).json({ message: 'Error fetching tourists', error: err.message });
  }
});

module.exports = router;
