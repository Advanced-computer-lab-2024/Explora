const Governor = require("../models/Governor");
const bcrypt = require('bcrypt');
const User = require("../models/User");
// Add a new governor account
const addTourismGovernorAccount = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newGovernor = await User.create({
            username,
            password: hashedPassword,
            role: 'Governor'
        });
        res.status(200).json(newGovernor);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

// Get all governor accounts
const getAllGovernors = async (req, res) => {
    try {
        const governors = await Governor.find();
        res.status(200).json(governors);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

module.exports = {
    addTourismGovernorAccount,
    getAllGovernors
};
