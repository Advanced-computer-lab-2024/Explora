const mongoose = require('mongoose');
const { ImMagicWand } = require('react-icons/im');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        enum: ['Tourist','Seller','TourGuide','Advertiser','TourismGovernor', 'Admin'],
        required: true 
    }
}, 
       { discriminatorKey: 'role', timestamps: true });

module.exports = mongoose.model('User', userSchema);
