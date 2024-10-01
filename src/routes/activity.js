// THIS FILE HAS THE ROUTE IN THE CONTROLLER


const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// Create an activity
router.post('/create', async (req, res) => {
    const newActivity = new Activity(req.body);
    try {
        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an activity
router.put('/:id', async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
    try {
        await Activity.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;