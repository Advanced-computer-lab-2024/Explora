const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist', // Reference to the Tourist model
    required: true,
  },
  event: {
    type: String,
    required: true,
    enum: ['activity', 'itinerary'], // Example event types
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true, // Content of the notification
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the timestamp of creation
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
