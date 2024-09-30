const express = require('express');
const router = express.Router();
const { createSellerProfile, getSellerProfile, updateSellerProfile } = require('../controllers/SellerController');

// Route for creating seller profile
router.post('/profile', createSellerProfile);

// Route for reading seller profile
router.get('/profile', getSellerProfile);

// Route for updating seller profile
router.put('/profile', updateSellerProfile);

module.exports = router;
