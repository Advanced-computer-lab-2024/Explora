const ActivityCategory = require("../models/ActivityCategory");
const mongoose = require("mongoose");

// Create a new ActivityCategory
const createActivityCategory = async (req, res) => {
    const { activityType } = req.body;  
    try {
        const newActivityCategory = await ActivityCategory.create({
            activityType
        });
        res.status(200).json(newActivityCategory);
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
    const { oldActivityType, newActivityType } = req.body;
    try {
        const activityCategory = await ActivityCategory.findOneAndUpdate(
            { activityType: oldActivityType }, 
            { $set: { activityType: newActivityType } },
            { new: true }
        );
        if (!activityCategory) {
            return res.status(404).json({ message: "Activity category not found." });
        }
        res.json(activityCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
