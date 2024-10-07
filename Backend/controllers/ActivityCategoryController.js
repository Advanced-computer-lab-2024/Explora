const ActivityCategory = require("../models/ActivityCategory");
const mongoose = require("mongoose");

// Create a new ActivityCategory
const createActivityCategory = async (req, res) => {
    const { categoryName } = req.params; // The category name from URL params
    const { name, date, time, rating, location, price, tags, specialDiscounts, bookingOpen } = req.body;

    try {
<<<<<<< HEAD
        // Validate required fields
        if (!name || !date || !time || !location || !price) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the activity already exists
        const existingActivity = await Activity.findOne({ name, date, time, location });
        if (existingActivity) {
            return res.status(400).json({ message: 'Activity already exists.' });
        }

        // Try to find the category by name
        let category = await ActivityCategory.findOne({ activityType: categoryName });

        // If category doesn't exist, create a default one
        if (!category) {
            category = new ActivityCategory({ activityType: 'Default', description: 'Default category for activities' });
            await category.save(); // Save the new default category in the database
        }

        // Validate tags (assuming you want to do the same for tags)
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
            category: category._id, // Link the category to the new activity
            tags: prefTags.map(tag => tag._id), // Store ObjectId references for tags
            specialDiscounts,
            bookingOpen,
        });

        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
=======
        // Check if the activity category already exists
        const activityCategory = await ActivityCategory.findOne({ activityType }); // Use findOne for a single document
        if (activityCategory) {
            return res.status(400).json({ message: "Activity category already exists" });
        }

        // Create a new activity category if it doesn't exist
        const newActivityCategory = await ActivityCategory.create({ activityType });
        
        // Respond with the new category
        res.status(201).json(newActivityCategory); // Use 201 for resource creation
>>>>>>> 0b91fb7a83cee7e1ca248370c036e2ffbc6a826e
    } catch (err) {
        res.status(500).json({ error: err.message });
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
