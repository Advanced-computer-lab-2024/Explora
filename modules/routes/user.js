const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Register new user (tour guide, advertiser, seller)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        return res.status(400).json({ error: 'Email or username is already in use' });
    }

    const newUser = new User({ username, email, password });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// You can add more routes like login, get user info, etc.

module.exports = router;
