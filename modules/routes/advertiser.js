// routes/advertiser.js

const express = require('express');
const { createAdvertiserProfile } = require('../controllers/AdvertiserController'); // Import the controller

const router = express.Router();

// Route to create an advertiser profile
router.post('/create', createAdvertiserProfile);

// Additional advertiser routes can go here...

module.exports = router;
