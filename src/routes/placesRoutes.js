// routes/placesRouter.js

const express = require('express');
const { createPlace,searchPlaces, getAllPlaces, getPlaceById, updatePlace, deletePlace } = require('../controllers/placesController');
const router = express.Router();

// Route to create a new place
router.post('/', createPlace);

router.get('/search', searchPlaces);

// Route to get all places
router.get('/', getAllPlaces);

// Route to get a place by ID
router.get('/:id', getPlaceById);

// Route to update a place by ID
router.put('/:id', updatePlace);

// Route to delete a place by ID
router.delete('/:id', deletePlace);

module.exports = router;
