// routes/profile.js

const express = require('express');
const router = express.Router();
const { createTourist, getTourist, updateTourist } = require('../controllers/touristController');

// Route for creating a tourist
router.post('/create', createTourist);

// Route for getting a tourist by email
router.get('/:get', getTourist);

// Route for updating a tourist
router.put('/:update', updateTourist);

module.exports = router;
