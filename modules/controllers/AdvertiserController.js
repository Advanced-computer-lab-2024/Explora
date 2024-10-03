// controllers/advertiserController.js

const Advertiser = require('../models/Advertiser');

// Create a new advertiser profile
const createAdvertiserProfile = async (req, res) => {
    const { userId, companyName, website, hotline, profile } = req.body;

    try {
        const newAdvertiser = new Advertiser({ userId, companyName, website, hotline, profile });
        await newAdvertiser.save();
        res.status(201).json({ message: 'Advertiser profile created successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Additional advertiser controller functions can be defined here...

module.exports = {
    createAdvertiserProfile,
};
