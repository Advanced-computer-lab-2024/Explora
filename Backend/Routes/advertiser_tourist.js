const express = require('express');
const router = express.Router();
const Sales = require('../models/Advertiser_Sales');  // Ensure this is the correct path
const Activity = require('../models/Activity');  // Import the correct itinerary model
const Tourist = require('../models/touristModel');  // Assuming you have a Tourist model

// GET route to fetch tourists who booked a specific advertiser's itinerary
router.get('/', async (req, res) => {
  const { advertiserId } = req.query;  // Get advertiserId from query parameters

  if (!advertiserId) {
    return res.status(400).json({ message: 'advertiserId is required in query parameters.' });
  }

  try {
    // Fetch sales for the specific advertiser
    const sales = await Sales.find({ advertiserId })
      .populate('touristId', 'username email')  // Populate tourist details (name and email)
      .populate('activityId', 'location date')  // Populate activity details
      .exec();

    if (sales.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this advertiser.' });
    }

    // Extract details, including bookingDate
    const touristDetails = sales.map((sale) => ({
      touristName: sale.touristId.username,
      touristEmail: sale.touristId.email,
      activityLocations: sale.activityId.location, // Activity location
      bookingDate: sale.date,               // Date of booking
    }));

    res.status(200).json({ message: 'Tourists who booked the activity', touristDetails });
  } catch (err) {
    console.error('Error fetching tourists who booked:', err.message);
    res.status(500).json({ message: 'Error fetching tourists', error: err.message });
  }
});

module.exports = router;
