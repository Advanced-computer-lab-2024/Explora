const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Activity = require('../models/Tour_Guide_Activites');

// GET all activities
router.get('/', async (req, res) => {
    try {
        const activity = await Activity.find();
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a tourist activity
router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all tourist activity
router.get('/', async (req, res) => {
  try {
    const activity = await Activity.find();
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET activities tagged with "historical place"
router.get('/historical', async (req, res) => {
  try {
      const historicalActivities = await Activity.find({ tags: 'historical' });
      res.status(200).json(historicalActivities);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// GET activities tagged with "museum"
router.get('/museum', async (req, res) => {
  try {
      const museumActivities = await Activity.find({ tags: 'museum' });
      res.status(200).json(museumActivities);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Read a specific tourist activity by ID and populate activities
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('activities');
    if (!activity) {
      return res.status(404).json({ error: 'activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a tourist activity by ID
router.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!activity) {
      return res.status(404).json({ error: 'activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a tourist activity by ID
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'activity not found' });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
