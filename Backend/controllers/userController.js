// controllers/userController.js

const User = require('../models/User');
const Seller = require('../models/Seller');
const TourGuide = require('../models/Tour_Guide_Profile');
const Advertiser = require('../models/Advertiser');

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

// Additional user controller functions can be defined here...

module.exports = {
    registerUser,
    viewUsers,
    getUserid,
    getuserbyusername,
    loginUser
    // Add other controller methods like loginUser, getUserProfile, etc.
};