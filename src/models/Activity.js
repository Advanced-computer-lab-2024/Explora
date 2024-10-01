const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String,
    location: String,  // Save Google Maps location as a string or coordinates
    price: String,     // You can save as String or Number based on range
    category: String,
    tags: [String],
    specialDiscounts: String,
    bookingOpen: Boolean
});

module.exports = mongoose.model('Activity', activitySchema);