// backend/routes/notification.js
const express = require('express');
const Notification = require('../models/Notification');

const router = express.Router();

// Fetch notifications directly by passing userId (from the frontend)
router.get('/notifications', async (req, res) => {
    try {
      const { userId } = req.query; // Assuming the userId is passed as a query string
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
      }
  
      // Fetch notifications for the given userId
      const notifications = await Notification.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10);
  
      // Ensure the response is always an array
      res.status(200).json(Array.isArray(notifications) ? notifications : []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      res.status(500).json({ message: 'Error fetching notifications.' });
    }
  });
  

// Mark notification as read
// Mark notification as read
router.patch('/:id/read', async (req, res) => {
  try {
    const { id } = req.params; // Get the notification ID from the URL parameter

    // Find the notification by ID and update its 'read' field to true
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true }, // Set the 'read' field to true
      { new: true } // Return the updated notification
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.status(200).json({ message: 'Notification marked as read.', notification });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ message: 'Error marking notification as read.' });
  }
});

module.exports = router;
