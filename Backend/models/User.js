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

// Method to update loyalty points and loyalty level
userSchema.methods.updateLoyaltyPoints = async function(points) {
    this.loyaltyPoints += points; // Increment loyalty points
    this.loyaltyLevel = getLoyaltyLevel(this.loyaltyPoints); // Update loyalty level
    await this.save(); // Save updated user document
};

// Utility function to determine loyalty level based on points
const getLoyaltyLevel = (loyaltyPoints) => {
    if (loyaltyPoints > 500000) return 3; // Level 3
    else if (loyaltyPoints > 100000) return 2; // Level 2
    else if (loyaltyPoints > 0) return 1; // Level 1
    return 0; // Default level 0
};

const User = mongoose.model('User', userSchema);
module.exports = User;
