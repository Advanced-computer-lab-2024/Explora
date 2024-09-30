const Seller = require('../models/Seller');

// Create a new seller profile
const createSellerProfile = async (req, res) => {
    try {
        const { name, description } = req.body;
        const seller = new Seller({ name, description });
        await seller.save();
        res.status(201).json(seller);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read seller profile by ID
const getSellerProfile = async (req, res) => {
    try {
        const sellerId = req.params.id;
        const seller = await Seller.findById(sellerId);
        
        if (!seller) return res.status(404).json({ message: "Seller not found" });
        if (!seller.acceptedAsSeller) return res.status(403).json({ message: "Seller not accepted" });

        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update seller profile by ID
const updateSellerProfile = async (req, res) => {
    try {
        const sellerId = req.params.id;
        const seller = await Seller.findById(sellerId);

        if (!seller) return res.status(404).json({ message: "Seller not found" });
        if (!seller.acceptedAsSeller) return res.status(403).json({ message: "Seller not accepted" });

        const { name, description } = req.body;
        seller.name = name || seller.name;
        seller.description = description || seller.description;

        await seller.save();
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const Seller = require('../models/Seller');

// Accept or reject a seller
const updateSellerStatus = async (req, res) => {
    try {
        const sellerId = req.params.id;
        const { status } = req.body; // 'accept' or 'reject'

        const seller = await Seller.findById(sellerId);
        if (!seller) return res.status(404).json({ message: "Seller not found" });

        if (status === 'accept') {
            seller.acceptedAsSeller = true;
        } else if (status === 'reject') {
            seller.acceptedAsSeller = false;
        } else {
            return res.status(400).json({ message: "Invalid status, use 'accept' or 'reject'" });
        }

        await seller.save();
        res.status(200).json({ message: `Seller has been ${status}ed`, seller });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = {
    createSellerProfile,
    getSellerProfile,
    updateSellerProfile,
    updateSellerStatus
};
