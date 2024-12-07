const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    street: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    },
    apartment: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: false
    },
    googleMaps: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Address', AddressSchema);
