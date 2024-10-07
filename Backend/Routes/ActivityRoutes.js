// routes/ActivityRoutes.js

const express = require('express');
const {
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
} = require('../controllers/activityController'); // Import the activity controller

const router = express.Router();

// Create an activity
router.post('/create/:categoryName', createActivity);

// Filter activities by tag, name, or category
router.get('/filter', filterActivities);

// Read all activities
router.get('/', getAllActivities);

// Get all upcoming activities
router.get('/upcoming', getUpcomingActivities);

// Update an activity
router.put('/:id', updateActivity);

// Delete an activity
router.delete('/:id', deleteActivity);

// Get activities by tag
router.get('/tag/:tag', getActivitiesByTag);

// Filter activities by price, date, category, and rating
router.get('/search', searchActivities);

// Sort activities by price (low to high or high to low)
router.get('/sortprice', sortActivitiesByPrice);

// Sort activities by rating (low to high or high to low)
router.get('/sortrate', sortActivitiesByRating);

module.exports = router;