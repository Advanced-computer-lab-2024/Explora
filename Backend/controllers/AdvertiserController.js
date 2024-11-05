// controllers/advertiserController.js
const Advertiser = require('../models/Advertiser');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const {generateToken} = require('../middleware/AuthMiddleware');
const jwt = require('jsonwebtoken');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jwt.sign({ username }, 'supersecret', {
        expiresIn: maxAge
    });
};

const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await Advertiser.create({ username: username, email: email, password: hashedPassword });
        const token = createToken(user.username);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
        try {
            const { username, password } = req.body;
    
            // Check if user exists
            const user = await Advertiser.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Compare provided password with the stored hashed password
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid password" });
            }
            const token = createToken(user.username);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

const logout = async (req, res) => {
        // Clear the JWT cookie by setting it to an empty value and setting maxAge to 0
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ message: "Successfully logged out" });
}

// Create a new advertiser profile
const createAdvertiserProfile = async (req, res) => {
    const { companyName, website, hotline, profile, username, email, password } = req.body;

    try {
        // Check if the username already exists
        const existingUsername = await Advertiser.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists. Please choose another.' });
        }   
        // Check if the email already exists
        const existingEmail = await Advertiser.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists. Please choose another.' });
        }
        // Create a new user and assign role as Advertiser
        const newAdvertiser = new Advertiser({
            username,
            email,
            password,
            role: 'Advertiser',
            companyName,
            website,
            hotline,
            profile
        });

        await newAdvertiser.save();
        res.status(201).json({ message: 'Advertiser profile created successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an advertiser profile
const updateAdvertiserProfile = async (req, res) => {
    const { companyName, website, hotline, profile } = req.body;

    try {
        const updatedAdvertiser = await Advertiser.findByIdAndUpdate(
            req.params.id,
            { companyName, website, hotline, profile },
            { new: true } // Return the updated document
        );

        if (!updatedAdvertiser) {
            return res.status(404).json({ error: 'Advertiser not found.' });
        }

        res.status(200).json(updatedAdvertiser); // Return the updated advertiser
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all advertisers
const getAllAdvertisers = async (req, res) => {
    try {
        const advertisers = await Advertiser.find();
        res.status(200).json(advertisers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get advertiser by ID
const getAdvertiserById = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.params.id);
        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found.' });
        }
        res.status(200).json(advertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an advertiser profile

const deleteAdvertiserProfile = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        
        // Check for upcoming activities associated with the advertiser that have bookings
        const upcomingActivities = await Activity.find({
            advertiserId: id, // Assuming there is an advertiserId field in your Activity schema
            hasBookings: true, // Check if there are bookings
            // Check for upcoming dates (this can vary based on your schema, assuming 'date' field)
            date: { $gte: new Date() } // Example: Activities that are on or after the current date
        });

        // If there are any upcoming activities with bookings, prevent deletion
        if (upcomingActivities.length > 0) {
            return res.status(400).json({ error: 'Cannot delete profile; there are upcoming activities with bookings.' });
        }

        const deletedAdvertiser = await Advertiser.findByIdAndDelete(id); // Delete the advertiser

        if (!deletedAdvertiser) {
            return res.status(404).json({ error: 'Advertiser not found.' });
        }

        res.status(200).json({ message: 'Advertiser profile deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const changePassword = async (req, res) => {
    const { password, newPassword } = req.body;
    const userId = req.user._id; // assuming req.user is set in AuthMiddleware
  
    try {
        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
  
        // Verify the current password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
  
        // Hash the new password
        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  
        // Update the password in the database
        user.password = hashedNewPassword;
        await user.save();
  
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    createAdvertiserProfile,
    getAllAdvertisers,
    getAdvertiserById,
    updateAdvertiserProfile,
    deleteAdvertiserProfile,
    login,
    signUp,
    logout,
    changePassword
};