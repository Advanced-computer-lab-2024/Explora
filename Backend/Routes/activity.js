// THIS FILE HAS THE ROUTE IN THE CONTROLLER


const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const ActivityCategory = require('../models/ActivityCategory'); // Import your ActivityCategory model
const PrefrenceTag = require('../models/PrefrenceTag');
const mongoose = require('mongoose');

// Create an activity
router.post('/create/:categoryName', async (req, res) => {
    // Extract the category name from request parameters
    const { categoryName } = req.params;

    // Extract other activity details from the request body
    const { name, date, time, rating, location, price, tags, specialDiscounts, bookingOpen } = req.body;

    try {
        const activity = await Activity.findOne({ name, date, time, location });
        if (activity) {
            return res.status(400).json({ message: 'Activity already exists.' });
        }
        // Find the category by name
        const category = await ActivityCategory.findOne({ activityType: categoryName });

        // If the category is not found, return an error
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        const prefTags = await PrefrenceTag.find({ tag: { $in: tags } });


        if (prefTags.length !== tags.length) {
            return res.status(400).json({ message: 'One or more tags are invalid.' });
        }

        // Create a new activity instance
        const newActivity = new Activity({
            name,
            date,
            time,
            rating,
            location,
            price,
            category: category._id,
            tags: prefTags.map(tag => tag._id), 
            specialDiscounts,
            bookingOpen,
        });

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
        const prefTag = await PrefrenceTag.findOne({ tag });
        if (prefTag) {
            filter.tags = prefTag._id; // Filter by tag ObjectId
        } else {
            return res.status(404).json({ message: 'Tag not found.' });
        }    }

    // Check if name is provided and add it to the filter
    if (name) {
        filter.name = { $regex: name, $options: 'i' };  // Case-insensitive partial match
    }

    // Check if category is provided and add it to the filter
    if (category) {
        const foundCategory = await ActivityCategory.findOne({ activityType: category });
        if (!foundCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        } 
        filter.category = foundCategory._id;
    }
    try {
        // Query the database with the filter object
        const activities = await Activity.find(filter).populate('tags');

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
    const activities = await Activity.find().populate('category', 'activityType').populate('tags', 'tag').select('-createdAt -updatedAt');
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

// Filter activities by price, date, category, and rating
router.get('/search', async (req, res) => {
    const { price, date, category, rating } = req.query;

    // Build the filter object based on available query parameters
    let filter = {};

    // Check if price is provided and add it to the filter
    if (price) {
        filter.price = { $lte: price };  // Less than or equal to the provided price
    }

    // Check if date is provided and add it to the filter
    if (date) {
        filter.date = { $gte: new Date(date) };  // Greater than or equal to the provided date
    }

    // Check if category is provided and add it to the filter
    if (category) {
        filter.category = category;  // Direct match for the category
    }

    // Check if rating is provided and add it to the filter
    if (rating) {
        filter.rating = { $gte: rating };  // Greater than or equal to the provided rating
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
// Sort activities by price (low to high or high to low)
router.get('/sortprice', async (req, res) => {
    const { order } = req.query;  // Get the order (either 'low' or 'high')
    
    let sortOption = {};
    
    // Set the sorting order based on the query parameter
    if (order === 'low') {
        sortOption.price = 1; // Ascending order
    } else if (order === 'high') {
        sortOption.price = -1; // Descending order
    } else {
        return res.status(400).json({ message: 'Invalid sort order. Use "low" or "high".' });
    }

    try {
        // Query the database and sort the activities by price
        const sortedActivities = await Activity.find().sort(sortOption);
        res.status(200).json(sortedActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Sort activities by rating (low to high or high to low)
router.get('/sortrate', async (req, res) => {
    const { order } = req.query;  // Get the order (either 'low' or 'high')

    let sortOption = {};

    // Set the sorting order based on the query parameter
    if (order === 'low') {
        sortOption.rating = 1; // Ascending order
    } else if (order === 'high') {
        sortOption.rating = -1; // Descending order
    } else {
        return res.status(400).json({ message: 'Invalid sort order. Use "low" or "high".' });
    }

    try {
        // Query the database and sort the activities by rating
        const sortedActivities = await Activity.find().sort(sortOption);
        res.status(200).json(sortedActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find().populate('category').populate('tags');
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;