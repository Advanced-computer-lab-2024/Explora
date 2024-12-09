 const mongoose = require('mongoose');

const anotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner's ID
  type: { type: String, default: 'Activity Flagged' }, // Type of notification
  message: { type: String, required: true }, // Notification message
  createdAt: { type: Date, default: Date.now },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }, // Related itinerary
  read: { type: Boolean, default: false } // Track if the notification has been read
});

module.exports = mongoose.model('Anotification', anotificationSchema);
