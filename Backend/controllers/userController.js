// controllers/userController.js

const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create new user
        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Additional user controller functions can be defined here...

module.exports = {
    registerUser,
    // Add other controller methods like loginUser, getUserProfile, etc.
};
