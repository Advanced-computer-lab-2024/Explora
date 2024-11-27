const Address = require('../models/Address');

// Create a new address

const createAddress = async (req, res) => {
    const {user} = req.params; 
    const { street, city, state, zipCode, neighborhood, apartment, building, floor } = req.body;

    try {
        const newAddress = await Address.create({ user, street, city, state, zipCode, zipCode, neighborhood, apartment, building, floor  });
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all addresses

const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.find();

        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// Delete address by ID

const deleteAddressById = async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);

        if (!address) return res.status(404).json({ message: 'Address not found' });

        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// view my addresses list

const viewAddresses = async (req, res) => {
    try {
        const {userId} = req.params;
        const addresses = await Address.find({ user: userId });

        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAddress,
    getAllAddresses,
    deleteAddressById,
    viewAddresses,
};