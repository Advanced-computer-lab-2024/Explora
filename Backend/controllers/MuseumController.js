const Museum = require("../models/Museum");

// Method to create a new museum
const createMuseum = async (req, res) => {
    try {
        const museum = new Museum(req.body);  // Create a new Museum instance from request body
        await museum.save();  // Save the new museum to the database
        res.status(201).json(museum);  // Return the created museum
    } catch (error) {
        res.status(400).json({ message: error.message });  // Handle errors
    }
};

// Method to get all museums
const getAllMuseums = async (req, res) => {
    try {
        const museums = await Museum.find();  // Fetch all museums from the database
        res.status(200).json(museums);  // Return the list of museums
    } catch (error) {
        res.status(500).json({ message: error.message });  // Handle server errors
    }
};

// Method to filter museums by name and tags
const filterMuseums = async (req, res) => {
    const { name, tags } = req.query;  // Extract query parameters

    let filter = {};

    // Add name filtering with case-insensitive regex
    if (name) {
        filter.name = { $regex: name, $options: 'i' }; 
    }

    // Add tags filtering
    if (tags) {
        filter.tags = { $in: tags.split(',') }; 
    }

    try {
        const museums = await Museum.find(filter);  // Fetch filtered museums
        if (museums.length === 0) {
            return res.status(404).json({ message: 'No museums found with the specified criteria.' });
        }
        return res.status(200).json(museums);  // Return the filtered list of museums
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });  // Handle server errors
    }
};

// Method to get a museum by name
const getMuseumByName = async (req, res) => {
    try {
        const { name } = req.params;  // Extract name from request parameters
        const museum = await Museum.findOne({ name });  // Fetch museum by name
        if (!museum) {
            return res.status(404).json({ message: 'Museum not found' });
        }
        res.status(200).json(museum);  // Return the museum details
    } catch (error) {
        res.status(500).json({ message: error.message });  // Handle server errors
    }
};

// Method to update a museum by name
const updateMuseumByName = async (req, res) => {
    try {
        const { name } = req.params;  // Extract name from request parameters
        const museum = await Museum.findOneAndUpdate({ name }, req.body, { new: true });  // Update museum details
        if (!museum) {
            return res.status(404).json({ message: 'Museum not found' });
        }
        res.status(200).json(museum);  // Return the updated museum
    } catch (error) {
        res.status(400).json({ message: error.message });  // Handle validation or other errors
    }
};

// Method to delete a museum by name
const deleteMuseumByName = async (req, res) => {
    try {
        const { name } = req.params;  // Extract name from request parameters
        const museum = await Museum.findOneAndDelete({ name });  // Delete the museum
        if (!museum) {
            return res.status(404).json({ message: 'Museum not found' });
        }
        res.status(204).send();  // Return no content
    } catch (error) {
        res.status(500).json({ message: error.message });  // Handle server errors
    }
};

// Method to get the ticket price for a museum by visitor type
const getTicketPrice = async (req, res) => {
    try {
        const { name } = req.params;  // Extract museum name from request parameters
        const { visitorType } = req.query;  // Extract visitor type from query parameters

        const museum = await Museum.findOne({ name });  // Fetch the museum by name
        if (!museum) return res.status(404).json({ msg: "Museum not found" });

        const price = museum.ticketPrices[visitorType];  // Get the price based on visitor type
        if (price === undefined) return res.status(400).json({ msg: "Invalid visitor type" });

        res.status(200).json({ price });  // Return the ticket price
    } catch (err) {
        res.status(500).json({ msg: err.message });  // Handle server errors
    }
};

// Export all the methods
module.exports = {
    createMuseum,
    getAllMuseums,
    filterMuseums,
    getMuseumByName,
    updateMuseumByName,
    deleteMuseumByName,
    getTicketPrice
};
