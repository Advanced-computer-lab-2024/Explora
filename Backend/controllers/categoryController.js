const ActivityCategory = require('../models/ActivityCategory');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await ActivityCategory.find(); // Fetch all categories from the database
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllCategories
};
