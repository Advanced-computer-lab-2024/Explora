const express = require('express');
const router = express.Router();

// Mock database for activities
let activities = [];

// Import activity category controllers
const {
    createActivityCategory,
    readActivityCategories,
    updateActivityCategory,
    deleteActivityCategory
} = require("../controllers/ActivityCategoryController");

// Routes for activities

// GET route for retrieving activities (MyActivities)
router.get('/my-activities', (req, res) => {
  res.json(activities); // Return the mock activities
});

// Routes for activity categories

// POST - Create a new activity category
router.post("/categories", createActivityCategory);

// GET - Read all activity categories
router.get("/categories", readActivityCategories);

// PUT - Update an existing activity category
router.put("/categories", updateActivityCategory);

// DELETE - Delete an activity category by activity type
router.delete("/categories/:activityType", deleteActivityCategory);

module.exports = router;
