const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/AuthMiddleware'); // Adjust the path as necessary

const { 
    createSeller,      // Correct import
    getAllSellers,     // Correct import
    getSellerById,     // Correct import
    updateSeller,       // Correct import
    deleteSeller, 
    signUp,
    login,
    logout,
    changePassword
} = require('../controllers/SellerController');  // Ensure correct path to SellerController

router.post("/signup", signUp);
router.post('/login', login)
router.get('/logout', logout);
router.put("/change-password", changePassword);

// Create a seller profile (POST /seller/create)
router.post('/create', createSeller);
// Assuming deleteSeller is imported from your controller file
router.delete('/:id',deleteSeller);
// Get seller profile by ID (GET /seller/:id)
router.get('/:id',getSellerById);

// Get all sellers (GET /seller)
router.get('/',getAllSellers);

// Update seller profile by ID (PUT /seller/:id)
router.put('/:id',updateSeller);

module.exports = router;
