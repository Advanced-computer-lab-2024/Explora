// sellerController.js

const User = require('../models/User'); // assuming this is the User model

const createSellerProfile = async (req, res) => {
    // Simulate userId for now
    const { userId, sellerName, sellerDescription } = req.body;

    try {
        const seller = await User.findById(userId);

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        seller.sellerName = sellerName;
        seller.sellerDescription = sellerDescription;
        await seller.save();

        res.status(201).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSellerProfile = async (req, res) => {
    const { userId } = req.body; // simulate userId for now

    try {
        const seller = await User.findById(userId);

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        res.status(200).json({
            sellerName: seller.sellerName,
            sellerDescription: seller.sellerDescription,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSellerProfile = async (req, res) => {
    const { userId, sellerName, sellerDescription } = req.body;

    try {
        const seller = await User.findById(userId);

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        seller.sellerName = sellerName || seller.sellerName;
        seller.sellerDescription = sellerDescription || seller.sellerDescription;
        await seller.save();

        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSellerProfile,
    getSellerProfile,
    updateSellerProfile
};
