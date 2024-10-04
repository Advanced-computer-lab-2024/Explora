// THIS FILE HAS THE ROUTE IN THE CONTROLLER


const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const ActivityCategory = require('../../src/models/ActivityCategory'); // Import your ActivityCategory model


// Create an activity
router.post('/create/:categoryName', async (req, res) => {
    // Extract the category name from request parameters
    const { categoryName } = req.params;

    // Extract other activity details from the request body
    const { name, date, time, rating, location, price, tags, specialDiscounts, bookingOpen } = req.body;

    try {
        // Find the category by name
        const category = await ActivityCategory.findOne({ category: categoryName });

        // If the category is not found, return an error
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        // Create a new activity instance
        const newActivity = new Activity({
            name,
            date,
            time,
            rating,
            location,
            price,
            category: category._id, // Use the found category's ObjectId
            tags,
            specialDiscounts,
            bookingOpen,
        });

        // Save the activity to the database
        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Filter activities by tag, name, or category
router.get('/filter', async (req, res) => {
    const { tag, name, category } = req.query;

    // Build the filter object based on available query parameters
    let filter = {};

    // Check if tag is provided and add it to the filter
    if (tag) {
        filter.tags = tag;  // Direct match for the tag
    }

    // Check if name is provided and add it to the filter
    if (name) {
        filter.name = { $regex: name, $options: 'i' };  // Case-insensitive partial match
    }

    // Check if category is provided and add it to the filter
    if (category) {
        filter.category = category;  // Direct match for the category
    }

    try {
        // Query the database with the filter object
        const activities = await Activity.find(filter);

        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found with the specified criteria.' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
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

// Get all upcoming itineraries
// Get all upcoming activities
router.get('/upcoming', async (req, res) => {
    const today = new Date(); // Get today's date

    try {
        // Find activities where the date is greater than or equal to today
        const upcomingActivities = await Activity.find({ date: { $gte: today } });

        if (upcomingActivities.length === 0) {
            return res.status(404).json({ message: 'No upcoming activities found.' });
        }

        return res.status(200).json(upcomingActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
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



module.exports = router;