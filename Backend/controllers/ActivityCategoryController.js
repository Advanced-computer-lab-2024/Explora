const ActivityCategory = require("../models/ActivityCategory");
const mongoose = require("mongoose");

// Create a new ActivityCategory
const createActivityCategory = async (req, res) => {
    const { activityType } = req.body;  
    try {
        // Check if the activity category already exists
        const activityCategory = await ActivityCategory.findOne({ activityType }); // Use findOne for a single document
        if (activityCategory) {
            return res.status(400).json({ message: "Activity category already exists" });
        }

        // Create a new activity category if it doesn't exist
        const newActivityCategory = await ActivityCategory.create({ activityType });
        
        // Respond with the new category
        res.status(201).json(newActivityCategory); // Use 201 for resource creation
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Read all activity categories
const readActivityCategories = async (req, res) => {
    try {
        const activityCategories = await ActivityCategory.find();
        res.status(200).json(activityCategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update a specific activity category
const updateActivityCategory = async (req, res) => {
    const { activityType } = req.params;
    const { newActivityType } = req.body;

    console.log('Attempting to update activity type:', activityType, 'to:', newActivityType);

    if (!newActivityType) {
        return res.status(400).json({ message: "New activity type is required." });
    }

    try {
        const activityCategory = await ActivityCategory.findOneAndUpdate(
            { activityType },
            { $set: { activityType: newActivityType } },
            { new: true }
        );

        if (!activityCategory) {
            return res.status(404).json({ message: "Activity category not found." });
        }

        res.json(activityCategory);
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ message: "An error occurred while updating the category." });
    }
};



// Delete a specific activity category
const deleteActivityCategory = async (req, res) => {
    const { activityType } = req.params;
    try {
        const activityCategory = await ActivityCategory.findOneAndDelete({ activityType });
        if (!activityCategory) {
            return res.status(404).json({ message: "Activity category not found." });
        }
        res.json({ msg: 'Deleted successfully', activityCategory });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createActivityCategory,
    readActivityCategories,
    updateActivityCategory,
    deleteActivityCategory
};
