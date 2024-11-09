
const { CgPassword } = require('react-icons/cg');
const Seller = require('../models/Seller');
const Itinerary = require('../models/Tour_Guide_Itinerary'); // Assuming itineraries are stored in this model
const Activity = require('../controllers/activityController')
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
        const user = await Seller.create({ username: username, email: email, password: hashedPassword });
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
            const user = await Seller.findOne({ username });
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

const createSeller = async (req, res) => {
    try {
        const { username, email,password, description, products, isAccepted } = req.body;

        const seller = new Seller({
            username,
            email,
            password,
            description,
            products,
            isAccepted
        });

        await seller.save();
        res.status(201).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSellerById = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) return res.status(404).json({ message: "Seller not found" });
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSeller = async (req, res) => {
    try {
        const { username, email, description, products, isAccepted } = req.body;
        const seller = await Seller.findById(req.params.id);

        if (!seller) return res.status(404).json({ message: "Seller not found" });

        seller.username = username || seller.username;
        seller.email = email || seller.email;
        seller.description = description || seller.description;
        seller.products = products || seller.products;
        seller.isAccepted = isAccepted;

        await seller.save();
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        // Check for any upcoming itineraries with paid bookings
        const upcomingItineraries = await Itinerary.find({
            tourGuideId: sellerId,
            availableDates: { $gte: new Date() },  // Only upcoming dates
            hasBookings: true // Assuming 'hasBookings' implies paid bookings
        });

        if (upcomingItineraries.length > 0) {
            return res.status(400).json({
                message: "Cannot delete profile; there are upcoming itineraries with paid bookings associated with it."
            });
        }
        const getUpcomingActivities = await Activity.find({
            advirtiserId: sellerId,
            availableDates: { $gte: new Date() },  // Only upcoming dates
            hasBookings: true // Assuming 'hasBookings' implies paid bookings
        });

        if (getUpcomingActivities.length > 0) {
            return res.status(400).json({
                message: "Cannot delete profile; there are upcoming activites with paid bookings associated with it."
            });
        }

        

        // If no upcoming itineraries with bookings, proceed with deletion
        const deletedSeller = await Seller.findByIdAndDelete(sellerId);

        if (!deletedSeller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        res.status(200).json({ message: "Seller deleted successfully" });
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

module.exports = {
    createSeller,
    getAllSellers,
    getSellerById,
    updateSeller,
    deleteSeller,
    login,
    signUp,
    logout,
    changePassword
};
