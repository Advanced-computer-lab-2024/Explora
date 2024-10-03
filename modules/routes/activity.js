const express = require('express');
const Activity = require('../models/Activity'); // Import the Activity model
const router = express.Router();

// Create a new activity (for advertisers/tour guides)
router.post('/create', async (req, res) => {
    const { name, description, date, price, category, ratings, location, createdBy } = req.body;

    try {
        const newActivity = new Activity({
            name,
            description,
            date,
            price,
            category,
            ratings,
            location,
            createdBy
        });

        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Filter and sort activities based on budget, date, category, ratings, and price
router.get('/filter', async (req, res) => {
    const { budget, date, category, ratings, sortBy } = req.query;

    let filter = {};
    let sortOption = {};

    // Filter by budget (price <= budget)
    if (budget) {
        filter.price = { $lte: budget };
    }

    // Filter by date (date >= today or provided date)
    if (date) {
        filter.date = { $gte: new Date(date) };
    }

    // Filter by category
    if (category) {
        filter.category = category;
    }

    // Filter by ratings (ratings >= provided ratings)
    if (ratings) {
        filter.ratings = { $gte: ratings };
    }

    // Sort by price or ratings
    if (sortBy === 'price') {
        sortOption.price = 1; // Ascending price, change to -1 for descending
    } else if (sortBy === 'ratings') {
        sortOption.ratings = -1; // Descending ratings (highest first)
    }

    try {
        const activities = await Activity.find(filter).sort(sortOption); // Filter and sort activities
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) return res.status(404).json({ error: 'Activity not found' });
        res.status(200).json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an activity (only for the creator)
router.put('/:id', async (req, res) => {
    const { name, description, date, price, category, ratings, location } = req.body;

    try {
        const updatedActivity = await Activity.findByIdAndUpdate(
            req.params.id,
            { name, description, date, price, category, ratings, location },
            { new: true }
        );

        if (!updatedActivity) return res.status(404).json({ error: 'Activity not found' });
        res.status(200).json(updatedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an activity (only for the creator)
router.delete('/:id', async (req, res) => {
    try {
        const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
        if (!deletedActivity) return res.status(404).json({ error: 'Activity not found' });
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
