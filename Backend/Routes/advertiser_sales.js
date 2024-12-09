const express = require('express');
const router = express.Router();
const Sales = require('../models/Advertiser_Sales'); // Ensure this is the Activity Sales model
const Activity = require('../models/Activity'); // Import the Activity model
const Tourist = require('../models/touristModel'); // Assuming tourists are stored in the User model

// GET route to get all sales for a specific advertiser
router.get('/sal', async (req, res) => {
  const { advertiserId } = req.query; // Get advertiserId from query parameters

  if (!advertiserId) {
    return res.status(400).json({ message: 'advertiserId is required in query parameters.' });
  }

  try {
    const sales = await Sales.find({ advertiserId })
      .populate('touristId', 'username email') // Populate tourist info (username, email)
      .populate('activityId', 'name price date location') // Populate activity fields

    if (sales.length === 0) {
      return res.status(404).json({ message: 'No sales found for this advertiser.' });
    }

    return res.status(200).json({
      message: 'Sales records retrieved successfully',
      sales,
    });
  } catch (error) {
    console.error('Error fetching sales:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
