const express = require('express');
const router = express.Router();
const Sales = require('../models/Advertiser_Sales');  // Ensure this is the correct path
const Activity = require('../models/Activity');  // Import the correct itinerary model
const Tourist = require('../models/touristModel');  // Assuming you have a Tourist model

// GET route to fetch tourists who booked a specific tour guide's itinerary
router.get('/', async (req, res) => {
  const { advertiserId } = req.query;  // Get tourGuideId from query parameters

  if (!advertiserId) {
    return res.status(400).json({ message: 'advertiserId is required in query parameters.' });
  }

  try {
    // Fetch sales for the specific tour guide
    const sales = await Sales.find({ advertiserId })
      .populate('touristId', 'username email')  // Populate tourist details (name and email)
      .populate('activityId', 'location date')  // Populate itinerary details
      .exec();

    if (sales.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this advertiser.' });
    }

    // Extract the tourist names and itinerary details from the sales records
    const touristDetails = sales.map((sale) => ({
      touristName: sale.touristId.username,
      touristEmail: sale.touristId.email,
      itineraryLocations: sale.activityId.location,  // Itinerary location
      itineraryDate: sale.activityId.date,  // Itinerary available dates
    }));

    res.status(200).json({ message: 'Tourists who booked the activity', touristDetails });
  } catch (err) {
    console.error('Error fetching tourists who booked :', err.message);
    res.status(500).json({ message: 'Error fetching tourists', error: err.message });
  }
});

module.exports = router;
