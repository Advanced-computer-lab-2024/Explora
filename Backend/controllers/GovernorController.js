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
    addTourismGovernorAccount,
    getAllGovernors,
    changePassword
};
