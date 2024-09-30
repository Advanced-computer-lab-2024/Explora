const express = require('express');
const router = express.Router();

const { 
    createSellerProfile, 
    getSellerProfile, 
    updateSellerProfile 
} = require('../controllers/SellerController');

router.post('/create', createSellerProfile); // Create a seller profile
router.get('/:id', getSellerProfile);        // Get seller profile by ID
router.put('/:id', updateSellerProfile);     // Update seller profile by ID

module.exports = router;
