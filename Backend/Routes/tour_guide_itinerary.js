const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Tour_Guide_Itinerary');
const Booking = require('../models/Booking');

// Create a new itinerary
router.post('/', async (req, res) => {
  const {
    activities,
    locations,
    timeline,
    duration,
    language,
    price,
    availableDates,
    availableTimes,
    accessibility,
    pickupLocation,
    dropoffLocation
  } = req.body;

  try {
    const newItinerary = new Itinerary({
      activities,
      locations,
      timeline,
      duration,
      language,
      price,
      availableDates,
      availableTimes,
      accessibility,
      pickupLocation,
      dropoffLocation
    });

    await newItinerary.save();
    res.json(newItinerary);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all itineraries
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get an itinerary by ID
router.get('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ msg: 'Itinerary not found' });
    }
    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update an itinerary
router.put('/:id', async (req, res) => {
  const {
    activities,
    locations,
    timeline,
    duration,
    language,
    price,
    availableDates,
    availableTimes,
    accessibility,
    pickupLocation,
    dropoffLocation
  } = req.body;

  try {
    let itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ msg: 'Itinerary not found' });
    }

    itinerary.activities = activities || itinerary.activities;
    itinerary.locations = locations || itinerary.locations;
    itinerary.timeline = timeline || itinerary.timeline;
    itinerary.duration = duration || itinerary.duration;
    itinerary.language = language || itinerary.language;
    itinerary.price = price || itinerary.price;
    itinerary.availableDates = availableDates || itinerary.availableDates;
    itinerary.availableTimes = availableTimes || itinerary.availableTimes;
    itinerary.accessibility = accessibility !== undefined ? accessibility : itinerary.accessibility;
    itinerary.pickupLocation = pickupLocation || itinerary.pickupLocation;
    itinerary.dropoffLocation = dropoffLocation || itinerary.dropoffLocation;

    await itinerary.save();
    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete an itinerary
router.delete('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ msg: 'Itinerary not found' });
    }

    // Check if there are any bookings associated with this itinerary
    const existingBookings = await Booking.find({ itineraryId: req.params.id });
    if (existingBookings.length > 0) {
      return res.status(400).json({ msg: 'Cannot delete itinerary with existing bookings' });
    }

    // Use findByIdAndDelete instead of remove
    await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Itinerary removed' });
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(500).send('Server error');
  }
});


module.exports = router;
