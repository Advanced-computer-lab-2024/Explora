// routes/deletionRequest.js
const express = require('express');
const router = express.Router();
const DeletionRequest = require('../models/DeletionRequest');
const User = require('../models/User');

router.post('/requestDeletion', async (req, res) => {
    const { username, reason } = req.body;
    console.log("Request Body:", req.body); // Debugging line

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found for username:", username); // Debugging line
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user has the allowed role
        const allowedRoles = ['Tourist', 'TourGuide', 'Advertiser', 'Seller'];
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'You are not authorized to request account deletion' });
        }

        // Check if a pending deletion request already exists for this user
        const existingRequest = await DeletionRequest.findOne({ user: user._id, status: 'pending' });
        if (existingRequest) return res.status(400).json({ message: 'Deletion request already exists' });

        // Create the deletion request
        const deletionRequest = new DeletionRequest({ user: user._id, reason });
        await deletionRequest.save();

        res.status(200).json({ message: 'Deletion request submitted' });
    } catch (error) {
        console.error("Error occurred:", error.message); // Debugging line
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
