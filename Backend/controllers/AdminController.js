const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const {generateToken} = require('../middleware/AuthMiddleware');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// delete admin account 
const deleteAdminAccount = async (req, res) => {
    try{
    const {username} = req.params
    const admin = await User.findOneAndDelete({username: username});
    if(!admin){
        return res.status(404).json({msg: 'User not found'});
    }
    res.json({msg: 'User deleted successfully' , admin});
}
catch(err){
    res.status(500).json({msg: err.message});
}
}
//delete admin account using id 
/* const deleteAdminAccount = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg: 'Invalid ID'});
    }
    const admin = await User.findOneAndDelete({_id: id});
    if(!admin){
        return res.status(404).json({msg: 'Admin not found'});
    }
    res.json({msg: 'Admin deleted successfully' , admin});
}  
*/

// create admin account

const createAdminAccount = async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const newAdmin = await User.create({
            username,
            email,
            password,
            role: 'Admin'
        });
        res.status(200).json({
            _id: newAdmin.id,
            username: newAdmin.username,
            email: newAdmin.email,
            role: newAdmin.role,
        });
    }
    catch (err) {
        res.status(400).json({msg: err.message});
    }
}

// get all admin accounts
// for testing purposes
const getAllAdminAccounts = async (req, res) => {
    try {
        const admin = await User.find({role: 'Admin'});
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
}

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
    createAdminAccount,
    deleteAdminAccount,
    getAllAdminAccounts,
    changePassword
};