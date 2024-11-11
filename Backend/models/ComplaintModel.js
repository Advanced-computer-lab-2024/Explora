const mongoose = require('mongoose');
const User = require('./User');

const ComplaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Resolved']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now

    },
    reply:{
        type: String,
        default: "no reply yet"
    }

});

module.exports = mongoose.model('Complaint', ComplaintSchema);
