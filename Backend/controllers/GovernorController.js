const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


// add a new tourism governor account

const addTourismGovernorAccount = async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newGovernor = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'Tourism Governor'
        });
        res.status(200).json(newGovernor);
    }
    catch (err) {
        res.status(400).json({msg: err.message});
    }

}

// get all accounts
// for testing purposes

const getAllGovernors = async (req, res) => {
    try {
        const governor = await User.find({role: 'Tourism Governor'});
        res.status(200).json(governor);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
}


module.exports = {
    addTourismGovernorAccount,
    getAllGovernors
  
};