const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');




const museumSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    pictures: [{ type: String }],
    location: { type: String, required: true },
    openingHours: { type: String, required: true },
    ticketPrices: {
        native: { type: Number, required: true },
        foreigner: { type: Number, required: true },
        student: { type: Number, required: true }
    },
    tags: {
        type: { 
            type: String, 
            enum: ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'], 
            required: true 
        },
        historicalPeriod: { 
            type: String, 
            required: true 
        }
    }
});




const Museum = mongoose.model('Museum', museumSchema);


const createMuseum = async (req, res) => {
    try {
        const museum = new Museum(req.body); 
        await museum.save();
        res.status(201).json(museum);
    } catch (error) {
        res.status(400).json({ message: error.message });
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

    createMuseum,
    getAllMuseums, 
    getMuseumByName, 
    updateMuseumByName, 
    deleteMuseumByName, 
    getTicketPrice 
};