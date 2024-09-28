const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


// delete admin account 
const deleteAdminAccount = async (req, res) => {
    const {username} = req.params
    const admin = await User.findOneAndDelete({Username: username, role: 'Admin' });
    if(!admin){
        return res.status(404).json({msg: 'Admin not found'});
    }
    res.json({msg: 'Admin deleted successfully' , admin});
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'Admin'
        });
        res.status(200).json(newAdmin);
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


module.exports = {
    createAdminAccount,
    deleteAdminAccount,
    getAllAdminAccounts
    
};