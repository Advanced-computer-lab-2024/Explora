const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt here
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    password: {
        type: String,
        required: true
    },
    loyaltyPoints: {
        type: Number,
        default: 0, // Initializes loyalty points to 0
      },
      loyaltyLevel: {
        type: Number,
        default: 0, // Initializes level to 0
      },
    role: { 
        type: String,
        enum: ['Tourist','Seller','TourGuide','Advertiser','Governor', 'Admin'],
        required: true 
    }
}, 
{ 
    discriminatorKey: 'role', 
    timestamps: true 
});

// Password hashing and comparison methods
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
