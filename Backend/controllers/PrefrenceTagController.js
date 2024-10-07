const PrefrenceTag = require("../models/PrefrenceTag");
const mongoose = require("mongoose");

// Create a new Prefrence Tag
const createPrefrenceTag = async (req, res) => {
    const { tag } = req.body; // Data from body instead of params
    try {
        const prefTag = await PrefrenceTag.findOne({ tag }); // Use findOne for a single document
        if (prefTag) {
            return res.status(400).json({ message: "tag already exists" });
        }

        const newPrefrenceTag = await PrefrenceTag.create({ tag });
        res.status(201).json(newPrefrenceTag);
    } catch (err) {
        console.error('Error creating tag:', err); // Log the error for debugging
        res.status(400).json({ message: err.message || 'Failed to create tag' });
    }
};


// Read all Prefrence Tag
const readPrefrenceTag = async (req, res) => {
    try {
        const newprefrenceTag = await PrefrenceTag.find();
        res.status(200).json(newprefrenceTag);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update a specific Preference Tag
const updatePrefrenceTag = async (req, res) => {
    const { newTag } = req.body;
    const { oldTag } = req.params;

    try {
        if (!newTag) {
            return res.status(400).json({ message: "New activity type is required." });
        }

        const newprefrenceTag = await PrefrenceTag.findOneAndUpdate(
            { tag: oldTag },
            { $set: { tag: newTag } },
            { new: true }
        );

        if (!newprefrenceTag) {
            return res.status(404).json({ message: "Preference Tag category not found." });
        }
        res.json(newprefrenceTag);
    } catch (err) {
        console.error('Error updating preference tag:', err);
        res.status(500).json({ message: "An error occurred while updating the tag." });
    }
};


// Delete a specific Prefrence Tag
const deletePrefrenceTag = async (req, res) => {
    const { tag } = req.params; // Expect Prefrence Tag in body
    try {
        const newprefrenceTag = await PrefrenceTag.findOneAndDelete({ tag: tag });
        if (!newprefrenceTag) {
            return res.status(404).json({ message: "Prefrence Tag not found." });
        }
        res.json({ msg: 'Deleted successfully', newprefrenceTag });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createPrefrenceTag,
    readPrefrenceTag,
    updatePrefrenceTag,
    deletePrefrenceTag
};
