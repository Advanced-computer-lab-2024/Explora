// controllers/userController.js

const User = require('../models/User');
const Seller = require('../models/Seller');
const TourGuide = require('../models/Tour_Guide_Profile');
const Advertiser = require('../models/Advertiser');
const Tourist = require('../models/touristModel');
const TourismGovernor = require('../models/Governor');
const Admin = require('../models/Admin');

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password, role, companyName, website, hotline , mobile, yearsOfExperience} = req.body;

    try {
        // Check if user already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Create new user
        let newUser;
        if (role == "Seller"){
             newUser = new Seller({ username, email, password, role });
        }
        else if (role == "TourGuide"){
             newUser = new TourGuide({ username, email, password, role, mobile, yearsOfExperience});
        }
        else if (role == "Advertiser"){
             newUser = new Advertiser({ username, email, password, role, companyName, website, hotline });
        }
        else{
             newUser = new User({ username, email, password, role });
        }
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' , user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// view all users 
const viewUsers = async (req, res) => {
        try {
            const user = await User.find({});
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({msg: err.message});
        }
}

const getUserid = async (req, res) => {
    try {
        const username = req.params.username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send({ msg: 'User not found' });
      }
      res.send({ _id: user._id }); // Send back the user's ObjectId
    } catch (error) {
      res.status(500).send({ msg: 'Error fetching user', error });
    }
}

const getuserbyusername = async (req, res) => {
    try {
        const username = req.params.username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Login a user

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        res.json({
            _id: user._id,
            username: user.username,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Change user password
const bcrypt = require('bcryptjs'); // Assuming bcryptjs is used for hashing

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const userId = req.user._id; // assuming req.user is set in AuthMiddleware, which should contain the authenticated user's info

  try {
    // Find the user by ID
    const user = await User.findById(userId);  // Assuming 'Profile' is the model for the user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the current password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10); // Increase the salt rounds if needed
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Additional user controller functions can be defined here...

module.exports = {
    registerUser,
    viewUsers,
    getUserid,
    getuserbyusername,
    loginUser,
    changePassword,
    // Add other controller methods like loginUser, getUserProfile, etc.
};
