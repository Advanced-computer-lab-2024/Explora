const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Tour_Guide_Itinerary');
const Activityy = require('../models/Activityy'); 
const PlacesModel = require('../models/PlacesModel');


// GET all itineraries
router.get('/', async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
    dropoffLocation, 
    hasBookings
  } = req.body;


  try {
    // Check if all activities exist
    const activitiesExist = await Activityy.find({ name: { $in: activities } });
    if (activitiesExist.length !== activities.length) {
      return res.status(400).json({ msg: 'One or more activities do not exist ' });
    }

    // Check if all locations exist
    const locationsExist = await PlacesModel.find({ name: { $in: locations } });
    if (locationsExist.length !== locations.length) {
      return res.status(400).json({ msg: 'One or more locations do not exist ' });
    }

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
      dropoffLocation,
      hasBookings
    });

    await newItinerary.save();
    res.json(newItinerary);
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
    dropoffLocation,
    hasBookings
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
    itinerary.hasBookings = hasBookings || itinerary.hasBookings;

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
    // Find the itinerary by ID
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ msg: 'Itinerary not found' });
    }

    // Check if the itinerary has bookings using the 'hasBookings' field
    if (itinerary.hasBookings) {
      return res.status(400).json({ msg: 'Cannot delete itinerary with existing bookings' });
    }

    // If no bookings, delete the itinerary
    await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Itinerary removed successfully' });
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(500).send('Server error');
  }
})
;
module.exports = router;
