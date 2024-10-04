const mongoose = require('mongoose');
const { ImMagicWand } = require('react-icons/im');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        Immutable: true
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
        enum: ['Tourist','Seller','Tour Guide','Advertiser','Tourism Governor', 'Admin'],
        required: true 
    }
}, 
       { discriminatorKey: 'role', timestamps: true });

module.exports = mongoose.model('User', userSchema);
