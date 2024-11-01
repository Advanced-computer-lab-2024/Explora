const express = require('express');
const router = express.Router();

const { 
    createSeller,      // Correct import
    getAllSellers,     // Correct import
    getSellerById,     // Correct import
    updateSeller,       // Correct import
    deleteSeller
} = require('../controllers/SellerController');  // Ensure correct path to SellerController

// Create a seller profile (POST /seller/create)
router.post('/create', createSeller);
// Assuming deleteSeller is imported from your controller file
router.delete('/:id', deleteSeller);
// Get seller profile by ID (GET /seller/:id)
router.get('/:id', getSellerById);

// Get all sellers (GET /seller)
router.get('/', getAllSellers);

// Update seller profile by ID (PUT /seller/:id)
router.put('/:id', updateSeller);

module.exports = router;
