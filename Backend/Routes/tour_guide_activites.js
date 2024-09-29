const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const TouristItinerary = require('../models/Tour_Guide_Activites'); 

// Create a tourist itinerary
router.post('/', async (req, res) => {
  try {
    const itinerary = new TouristItinerary(req.body);
    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all tourist itineraries
router.get('/', async (req, res) => {
  try {
    const itineraries = await TouristItinerary.find();
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific tourist itinerary by ID
router.get('/:id', async (req, res) => {
  try {
    const itinerary = await TouristItinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a tourist itinerary by ID
router.put('/:id', async (req, res) => {
  try {
    const itinerary = await TouristItinerary.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a tourist itinerary by ID
router.delete('/:id', async (req, res) => {
  try {
    const itinerary = await TouristItinerary.findByIdAndDelete(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
