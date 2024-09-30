
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


// delete advertiser account 
const deleteadvertiserAccount = async (req, res) => {
    const {username} = req.params
    const advertiser = await User.findOneAndDelete({Username: username, role: 'advertiser' });
    if(!advertiser){
        return res.status(404).json({msg: 'advertiser not found'});
    }
    res.json({msg: 'advertiser deleted successfully' , advertiser});
}
//delete advertiser account using id 
/* const deleteadvertiserAccount = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg: 'Invalid ID'});
    }
    const advertiser = await User.findOneAndDelete({_id: id});
    if(!advertiser){
        return res.status(404).json({msg: 'advertiser not found'});
    }
    res.json({msg: 'advertiser deleted successfully' , advertiser});
}  
*/

// create advertiser account

const createadvertiserAccount = async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newadvertiser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'advertiser'
        });
        res.status(200).json(newadvertiser);
    }
    catch (err) {
        res.status(400).json({msg: err.message});
    }
}

// get all advertiser accounts
// for testing purposes
const getAlladvertiserAccounts = async (req, res) => {
    try {
        const advertiser = await User.find({role: 'advertiser'});
        res.status(200).json(advertiser);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
}


module.exports = {
    createadvertiserAccount,
    deleteadvertiserAccount,
    getAlladvertiserAccounts
    
};