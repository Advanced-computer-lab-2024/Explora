const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner's ID
  type: { type: String, default: 'Itinerary Flagged' }, // Type of notification
  message: { type: String, required: true }, // Notification message
  createdAt: { type: Date, default: Date.now },
  itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }, // Related itinerary
  read: { type: Boolean, default: false } // Track if the notification has been read
});

module.exports = mongoose.model('Notification', notificationSchema);
