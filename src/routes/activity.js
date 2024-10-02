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

// Get activities by tag
router.get('/tag/:tag', async (req, res) => {
    const { tag } = req.params;

    try {
        const activities = await Activity.find({ tags: tag });

        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found with the specified tag.' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get activities by name
router.get('/name/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const activities = await Activity.find({ name: { $regex: name, $options: 'i' } });

        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found with the specified name.' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get activities by category
router.get('/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const activities = await Activity.find({ category });

        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found in the specified category.' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;