const Museum = require("../models/Museum");

// Method to create a new museum
const createMuseum = async (req, res) => {
    try {
        const museum = new Museum(req.body);
        await museum.save();
        res.status(201).json(museum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Method to get all museums
const getAllMuseums = async (req, res) => {
    try {
        const museums = await Museum.find();
        res.status(200).json(museums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Method to filter museums by name and tags
const filterMuseums = async (req, res) => {
    const { name, tags } = req.query;

    let filter = {};

    if (name) {
        filter.name = { $regex: name, $options: 'i' }; 
    }

    if (tags) {
        filter.tags = { $in: tags.split(',') }; 
    }

    try {
        const museums = await Museum.find(filter);
        if (museums.length === 0) {
            return res.status(404).json({ message: 'No museums found with the specified criteria.' });
        }
        return res.status(200).json(museums);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Method to get a museum by name
const getMuseumByName = async (req, res) => {
    try {
        const { name } = req.params;
        const museum = await Museum.findOne({ name });
        if (!museum) {
            return res.status(404).json({ message: 'Museum not found' });
        }
        res.status(200).json(museum);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Method to update a museum by name
const updateMuseumById = async (req, res) => {
    try {
        const { id } = req.params;  // Use the ID to find the museum
        const museum = await Museum.findByIdAndUpdate(id, req.body, { new: true });
        if (!museum) {
            return res.status(404).json({ message: 'Museum not found' });
        }
        res.status(200).json(museum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };  

// Method to delete a museum by ID
const deleteMuseumById = async (req, res) => {
    try {
        const { id } = req.params;
        const museum = await Museum.findByIdAndDelete(id);  // Use findByIdAndDelete instead
        if (!museum) {
            return res.status(404).json({ message: 'Museum not found' });
        }
        res.status(204).send(); // Successfully deleted
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Method to get the ticket price for a museum
const getTicketPrice = async (req, res) => {
    try {
        const { name } = req.params;
        const { visitorType } = req.query;

        const museum = await Museum.findOne({ name });
        if (!museum) return res.status(404).json({ msg: "Museum not found" });

        const price = museum.ticketPrices[visitorType];
        if (price === undefined) return res.status(400).json({ msg: "Invalid visitor type" });

        res.status(200).json({ price });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Export all the methods at the bottom, after declaring them
module.exports = {
    createMuseum,
    getAllMuseums,
    filterMuseums,
    getMuseumByName,
    updateMuseumById,
    deleteMuseumById,
    getTicketPrice
};
