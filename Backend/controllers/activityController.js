// controllers/activityController.js
const mongoose = require("mongoose");

const Activity = require('../models/Activity');
const ActivityCategory = require('../models/ActivityCategory');
const PrefrenceTag = require('../models/PrefrenceTag');
const { checkAdmin } = require('../middleware/AuthMiddleware');

const createActivity = async (req, res) => {
    try {
        const {
            name, date, time, location, price, tags, specialDiscounts,
            bookingOpen, category
        } = req.body;
        const { id } = req.params;

        // Validate required fields
        if (!name || !date || !time || !location || !price || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the activity already exists
        const existingActivity = await Activity.findOne({ name, date, time, location });
        if (existingActivity) {
            return res.status(400).json({ message: 'Activity already exists.' });
        }

        // Find the category by name
        const foundCategory = await ActivityCategory.findOne({ activityType: category });
        if (!foundCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        const categoryId = foundCategory._id;

        // Find tags by names and get their ObjectIds
        const tagsId = [];
for (const tagName of tags) { // Use `tagName` to avoid naming conflict
    const tag = await PrefrenceTag.findOne({ tag: tagName }); // Use `PrefrenceTag` model
    if (!tag) {
        return res.status(404).json({ message: `Tag "${tagName}" not found.` });
    }
    tagsId.push(tag._id);
}

        // Create a new activity instance
        const newActivity = new Activity({
            advertiserId: id,
            name,
            date,
            time,
            location,
            price,
            category: categoryId,
            tags: tagsId,
            specialDiscounts,
            bookingOpen,
            
        });

        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Filter activities by tag, name, or category
const filterActivities = async (req, res) => {
    const { tag, name, category } = req.query;
    let filter = {};

    try {
        // Filter by tag
        if (tag) {
            const prefTag = await PrefrenceTag.findOne({ tag });
            if (prefTag) {
                filter.tags = prefTag._id; // Filter by tag ObjectId
            } else {
                return res.status(404).json({ message: 'Tag not found.' });
            }
        }

        // Filter by name
        if (name) {
            filter.name = { $regex: name, $options: 'i' }; // Case-insensitive partial match
        }

        // Filter by category
        if (category) {
            const foundCategory = await ActivityCategory.findOne({ activityType: category });
            if (!foundCategory) {
                return res.status(404).json({ message: 'Category not found.' });
            }
            filter.category = foundCategory._id;
        }

        // Query the database
        const activities = await Activity.find(filter).populate('tags');
        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found with the specified criteria.' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Read all activities
const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find().populate('category', 'activityType').populate('tags', 'tag').select('-createdAt -updatedAt');
        res.status(200).json(activities);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
};

// Get all upcoming activities
const getUpcomingActivities = async (req, res) => {
    const today = new Date(); // Get today's date

    try {
        const upcomingActivities = await Activity.find({ date: { $gte: today } });

        if (upcomingActivities.length === 0) {
            return res.status(404).json({ message: 'No upcoming activities found.' });
        }

        return res.status(200).json(upcomingActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getPreviousActivities = async (req, res) => {
    const today = new Date(); // Get today's date

    try {
        const previousActivities = await Activity.find({ date: { $lt: today } }); // Find activities that happened before today

        if (previousActivities.length === 0) {
            return res.status(404).json({ message: 'No previous activities found.' });
        }

        return res.status(200).json(previousActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update an activity
const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date, time, location, price, category, tags, specialDiscounts, bookingOpen } = req.body;
        
        // Check if activity exists
        const existingActivity = await Activity.findById(id);
        if (!existingActivity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        // Prepare the update object
        const updateData = { name, date, time, location, price, specialDiscounts, bookingOpen };

        // Handle category update if provided
        if (category) {
            const foundCategory = await ActivityCategory.findOne({ activityType: category });
            if (!foundCategory) {
                return res.status(404).json({ error: 'Category not found.' });
            }
            updateData.category = foundCategory._id;
        }

        // Handle tags update if provided
        if (tags && tags.length) {
            const tagsId = [];
            for (const tagName of tags) {
                const tag = await PrefrenceTag.findOne({ tag: tagName });
                if (!tag) {
                    return res.status(404).json({ error: `Tag "${tagName}" not found.` });
                }
                tagsId.push(tag._id);
            }
            updateData.tags = tagsId;
        }

        // Update the activity
        const updatedActivity = await Activity.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Delete an activity
const deleteActivity = async (req, res) => {
    try {
        const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
        if (!deletedActivity) {
            return res.status(404).json({ message: 'Activity not found.' });
        }
        res.status(200).json({ message: 'Activity deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get activities by tag
const getActivitiesByTag = async (req, res) => {
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
};

// Filter activities by price, date, category, and rating
const searchActivities = async (req, res) => {
    const { price, date, category, rating } = req.query;
    let filter = {};

    if (price) {
        filter.price = { $lte: price }; // Less than or equal to the provided price
    }

    if (date) {
        filter.date = { $gte: new Date(date) }; // Greater than or equal to the provided date
    }

    if (category) {
        filter.category = category; // Direct match for the category
    }

    if (rating) {
        filter.rating = { $gte: rating }; // Greater than or equal to the provided rating
    }

    try {
        const activities = await Activity.find(filter);
        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found with the specified criteria.' });
        }
        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Sort activities by price (low to high or high to low)
const sortActivitiesByPrice = async (req, res) => {
    const { order } = req.query;

    let sortOption = {};
    
    if (order === 'low') {
        sortOption.price = 1; // Ascending order
    } else if (order === 'high') {
        sortOption.price = -1; // Descending order
    } else {
        return res.status(400).json({ message: 'Invalid sort order. Use "low" or "high".' });
    }

    try {
        const sortedActivities = await Activity.find().sort(sortOption);
        res.status(200).json(sortedActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Sort activities by rating (low to high or high to low)
const sortActivitiesByRating = async (req, res) => {
    const { order } = req.query;

    let sortOption = {};
    
    if (order === 'low') {
        sortOption.rating = 1; // Ascending order
    } else if (order === 'high') {
        sortOption.rating = -1; // Descending order
    } else {
        return res.status(400).json({ message: 'Invalid sort order. Use "low" or "high".' });
    }

    try {
        const sortedActivities = await Activity.find().sort(sortOption);
        res.status(200).json(sortedActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};  

module.exports = {
    createActivity,
    filterActivities,
    getAllActivities,
    getUpcomingActivities,
    updateActivity,
    deleteActivity,
    getActivitiesByTag,
    searchActivities,
    sortActivitiesByPrice,
    sortActivitiesByRating,
};