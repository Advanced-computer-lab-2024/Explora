// backend/routes/notification.js
const express = require('express');
const Anotification = require('../models/Anotification2');

const router = express.Router();

// Fetch notifications directly by passing userId (from the frontend)
router.get('/anotifications2', async (req, res) => {
    try {
      const { userId } = req.query; // Assuming the userId is passed as a query string
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
      }
  
      // Fetch notifications for the given userId
      const anotifications = await Anotification.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10);
  
      // Ensure the response is always an array
      res.status(200).json(Array.isArray(anotifications) ? anotifications : []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      res.status(500).json({ message: 'Error fetching notifications.' });
    }
  });
  

// Mark notification as read
// Mark notification as read
router.patch('/:id/aread2', async (req, res) => {
  try {
    const { id } = req.params; // Get the notification ID from the URL parameter

    // Find the notification by ID and update its 'read' field to true
    const anotification = await Anotification.findByIdAndUpdate(
      id,
      { read: true }, // Set the 'read' field to true
      { new: true } // Return the updated notification
    );

    if (!anotification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.status(200).json({ message: 'Notification marked as read.', anotification });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ message: 'Error marking notification as read.' });
  }
});

module.exports = router;
