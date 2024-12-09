const express = require('express');
const router = express.Router();
const AdvertiserSale = require('../models/Advertiser_Sales');  // Assuming this is the correct path
const Activity = require('../models/Activity');  // Assuming you have an Activity model
const User = require('../models/User');  // Assuming this is the correct model for tourists/users

// GET route to get all sales for a specific advertiser
router.get('/', async (req, res) => {
  const { advertiserId } = req.query;  // Get advertiserId from query parameters

  if (!advertiserId) {
    return res.status(400).json({ message: 'advertiserId is required in query parameters.' });
  }

  try {
    const sales = await AdvertiserSale.find({ advertiserId })
      .populate('touristId', 'username email')  // Populate tourist information
      .populate('activityId', 'title description price')  // Populate activity details
     

    if (sales.length === 0) {
      return res.status(404).json({ message: 'No sales found for this advertiser.' });
    }

    return res.status(200).json({ message: 'Sales records retrieved successfully', sales });
  } catch (error) {
    console.error('Error fetching sales:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router