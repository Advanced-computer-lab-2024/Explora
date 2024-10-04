const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
    },
    location: {
        type: String,
        required: true, 
    },
    tags: {
        type: [String],
    },
    specialDiscounts: {
        type: String,
    },
    bookingOpen:{
        type: Boolean,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

module.exports = mongoose.model('Activity', activitySchema);

