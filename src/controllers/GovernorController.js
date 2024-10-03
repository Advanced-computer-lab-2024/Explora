const Museum = require("../models/Governor");

const createMuseum = async (req, res) => {
    try {
        const museum = new Museum(req.body); 
        await museum.save();
        res.status(201).json(museum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//this is the method in requirement 37


const getByTag = async (req, res) => {
    const { tagType, tagValue } = req.params;

    try {
        const museums = await Museum.find({
            'tags.type': tagType, // Matches the type of the tag
            'tags.historicalPeriod': tagValue // Matches the historical period
        });

        if (museums.length === 0) {
            return res.status(404).json({ message: 'No museums found with the specified tag.' });
        }

        return res.status(200).json(museums);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllMuseums = async (req, res) => {
    try {
        const museums = await Museum.find();
        res.status(200).json(museums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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


const updateMuseumByName = async (req, res) => {
    try {
        const { name } = req.params;
        const museum = await Museum.findOneAndUpdate({ name }, req.body, { new: true });
        if (!museum) {
            return res.status(404).json({ message: 'Museum not found' });
        }
        res.status(200).json(museum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteMuseumByName = async (req, res) => {
    try {
        const { name } = req.params;
        const museum = await Museum.findOneAndDelete({ name });
        if (!museum) {
            return res.status(404).json({ message: 'Museum not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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









module.exports = {
    getByTag,
    createMuseum,
    getAllMuseums, 
    getMuseumByName, 
    updateMuseumByName, 
    deleteMuseumByName, 
    getTicketPrice 
};