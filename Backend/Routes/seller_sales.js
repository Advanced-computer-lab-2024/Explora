const express = require('express');
const router = express.Router();
const Sales = require('../models/Seller_Sales'); // SellerSales model
const Product = require('../models/Products'); // Product model
const Tourist = require('../models/touristModel'); // Assuming 'User' model stores tourist info

// GET route to get all sales for a specific seller
router.get('/sellersales', async (req, res) => {
  const { seller } = req.query; // Get sellerId from query parameters

  if (!seller) {
    return res.status(400).json({ message: 'sellerId is required in query parameters.' });
  }

  try {
    const sales = await Sales.find({ seller})
      .populate('touristId', 'username email') // Populate tourist info (username, email)
      .populate('productId', 'name price ') // Populate product fields (name, price)
      

    if (sales.length === 0) {
      return res.status(404).json({ message: 'No sales found for this seller.' });
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
