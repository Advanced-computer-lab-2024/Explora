
const { CgPassword } = require('react-icons/cg');
const Seller = require('../models/Seller');


const createSeller = async (req, res) => {
    try {
        const { username, email,password, description, products, isAccepted } = req.body;

        const seller = new Seller({
            username,
            email,
            password,
            description,
            products,
            isAccepted
        });

        await seller.save();
        res.status(201).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getSellerById = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) return res.status(404).json({ message: "Seller not found" });
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateSeller = async (req, res) => {
    try {
        const { username, email, description, products, isAccepted } = req.body;
        const seller = await Seller.findById(req.params.id);

        if (!seller) return res.status(404).json({ message: "Seller not found" });

        seller.username = username || seller.username;
        seller.email = email || seller.email;
        seller.description = description || seller.description;
        seller.products = products || seller.products;
        seller.isAccepted = isAccepted;

        await seller.save();
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSeller,
    getAllSellers,
    getSellerById,
    updateSeller
};
