// routes/advertiser.js

const express = require('express');
const {
    createAdvertiserProfile,
    getAllAdvertisers,
    getAdvertiserById,
    updateAdvertiserProfile,
    deleteAdvertiserProfile,
} = require('../controllers/advertiserController');

const router = express.Router();

// POST route for creating an advertiser profile
router.post('/create', createAdvertiserProfile);

// GET route for retrieving all advertisers
router.get('/', getAllAdvertisers);

// GET route for retrieving a specific advertiser by ID
router.get('/:id', getAdvertiserById);

// PUT route for updating an advertiser's profile
router.put('/:id', updateAdvertiserProfile); // Define PUT route

// DELETE route for deleting an advertiser's profile
router.delete('/:id', deleteAdvertiserProfile); 


module.exports = router;
