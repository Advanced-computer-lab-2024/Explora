const PrefrenceTag = require("../models/PrefrenceTag");
const mongoose = require("mongoose");

// Create a new Prefrence Tag
const createPrefrenceTag = async (req, res) => {
    const { tag } = req.body;  // Data from body instead of params
    try {
        const newPrefranceTag = await PrefrenceTag.create({
            tag
        });
        res.status(200).json(newPrefranceTag);
    } catch (err) {
        res.status(400).json({ message: err.message });
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

// Update a specific Prefrence Tag
const updatePrefrenceTag = async (req, res) => {
    const { oldTag, newTag } = req.body; // Data from body instead of params
    try {
        const newprefrenceTag = await PrefrenceTag.findOneAndUpdate(
            { tag: oldTag },
            { $set: { tag: newTag } },
            { new: true }
        );
        if (!newprefrenceTag) {
            return res.status(404).json({ message: "Prefrence Tag category not found." });
        }
        res.json(newprefrenceTag);
    } catch (err) {
        res.status(400).json({ message: err.message });
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