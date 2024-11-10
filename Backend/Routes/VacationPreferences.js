const express = require('express');
const router = express.Router();
const Preferences = require('../models/VacationPreferences');  // Import the Preferences model

// Define the POST route to save preferences
router.post('/save', async (req, res) => {
    const { historicAreas, beaches, familyFriendly, shopping, budget, email } = req.body;

    try {
        // Save preferences to the database
        const preferences = new Preferences({ historicAreas, beaches, familyFriendly, shopping, budget, email });
        await preferences.save();

        res.status(200).json({ message: 'Preferences saved successfully' });
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ message: 'An error occurred while saving preferences' });
    }
});

module.exports = router;
