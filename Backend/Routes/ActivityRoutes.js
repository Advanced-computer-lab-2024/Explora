const express = require("express");
const router = express.Router();
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


// Create an activity
router.post('/create/:id', createActivity);

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

const nodemailer = require('nodemailer');
const Activity = require('../models/Activity'); // Assuming the Activity model path is correct
const Notification = require('../models/Anotification'); // Assuming you have a Notification model
const jwt = require('jsonwebtoken');
// Create a transporter for sending emails (ensure you use app-specific passwords if required)


// Flagging and unflagging the activity
router.patch('/:activityId/flag2', async (req, res) => {
  const { activityId } = req.params;
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Using Gmail as the email service
    auth: {
      user: 'explora.donotreply@gmail.com',
      pass: 'goiz pldj kpjy clsh' // Use app-specific password if required
    },
    tls: {
      rejectUnauthorized: false, // This will allow self-signed certificates
    }
  });
  try {
    // Find activity by ID and populate the advertiserId field
    const activity = await Activity.findById(activityId).populate('advertiserId');
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Toggle the flagged status
    activity.flagged = !activity.flagged;
    await activity.save();

    // If the activity has been flagged, notify the advertiser
    if (activity.flagged) {
      // Create a notification for the activity owner (advertiser)
      await Notification.create({
        userId: activity.advertiserId._id, // Assuming 'advertiserId' points to a User
        message: `Your activity "${activity.name}" has been flagged.`,
        activityId: activityId,
      });

      // Send email notification to the activity owner
      const mailOptions = {
        from: 'explora.donotreply@gmail.com',
        to: activity.advertiserId.email, // Use the populated email from the advertiser
        subject: 'Activity has been Flagged',
        text: `Dear ${activity.advertiserId.name},\n\nYour activity titled "${activity.name}" has been flagged.\nPlease review it.`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    // Respond with a success message
    res.status(200).json({ message: `Activity ${activity.flagged ? 'flagged' : 'unflagged'} successfully `});

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;