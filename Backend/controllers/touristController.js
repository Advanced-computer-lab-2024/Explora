const touristModel = require('../models/touristModel');
const Itinerary = require('../Routes/tour_guide_itinerary');
const Activity = require('../Routes/activity');
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
    const { username, email, password, mobileNumber, nationality, dateOfBirth, job } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await touristModel.create({ username: username, email: email, password: hashedPassword, mobileNumber: mobileNumber, nationality: nationality, dateOfBirth: dateOfBirth, job: job});
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
            const user = await touristModel.findOne({ username });
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

// Get a tourist by email
const getTourist = async (req, res) => {
    try {
        const { email } = req.params;
        const tourist = await touristModel.findOne({ email });

        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        res.status(200).json(tourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const allTourists = async (req, res) => {
    try {
        const tourist = await touristModel.find({ });

        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        res.status(200).json(tourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new tourist
const createTourist = async (req, res) => {
    try {
        const { email, username, password, mobileNumber, nationality, dateOfBirth, job } = req.body;

        const existingTourist = await touristModel.findOne({ email });
        if (existingTourist) {
            return res.status(400).json({ message: "Tourist with the same email already exists" });
        }
        const existingUsername = await touristModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Tourist with the same username already exists" });
        }
        const newTourist = await touristModel.create({
            email,
            username,
            password,
            mobileNumber,
            nationality,
            dateOfBirth,
            job,
           
            role: 'Tourist'
        });

        res.status(201).json(newTourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a tourist by email
const updateTourist = async (req, res) => {
    try {
        const { password, mobileNumber, nationality, dateOfBirth, job, wallet } = req.body;

        const updatedTourist = await touristModel.findByIdAndUpdate(
            req.params.id,
            { password, mobileNumber, nationality, dateOfBirth, job, wallet },
            { new: true, runValidators: true }
        );

        if (!updatedTourist) {
            return res.status(404).json({ message: `No tourist found with ID ${req.params.id}` });
        }

        res.status(200).json(updatedTourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTourist = async (req, res) => {
    try {
        const touristId = req.params.id;

        // Check for any upcoming itineraries with paid bookings
            const upcomingItineraries = await Itinerary.find({
            tourGuideId: touristId,
            availableDates: { $gte: new Date() },  // Only upcoming dates
            hasBookings: true // Assuming 'hasBookings' implies paid bookings
        });

        if (upcomingItineraries.length > 0) {
            return res.status(400).json({
                message: "Cannot delete profile; there are upcoming itineraries with paid bookings associated with it."
            });
        }

        // Corrected variable name from 'advirtiserId' to 'advertiserId'
        const getUpcomingActivities = await Activity.find({
            advertiserId: touristId, // Ensure this matches your schema
            availableDates: { $gte: new Date() },  // Only upcoming dates
            hasBookings: true // Assuming 'hasBookings' implies paid bookings
        });

        if (getUpcomingActivities.length > 0) {
            return res.status(400).json({
                message: "Cannot delete profile; there are upcoming activities with paid bookings associated with it."
            });
        }

        // If no upcoming itineraries with bookings, proceed with deletion
        const deletedTourist = await Tourist.findByIdAndDelete(touristId);

        if (!deleteTourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        res.status(200).json({ message: "Tourist deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
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

module.exports = {getTourist, updateTourist, createTourist, allTourists, deleteTourist, login, signUp, logout, changePassword};
