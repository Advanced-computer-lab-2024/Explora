const mongoose = require('mongoose');

const anotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner's ID
  type: { type: String, default: 'Product out of stock' }, // Type of notification
  message: { type: String, required: true }, // Notification message
  createdAt: { type: Date, default: Date.now },
  prodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' }, // Related itinerary
  read: { type: Boolean, default: false } // Track if the notification has been read
});

module.exports = mongoose.model('Anotification2', anotificationSchema);
