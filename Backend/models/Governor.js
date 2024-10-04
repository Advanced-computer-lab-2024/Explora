const mongoose = require("mongoose");

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

module.exports = Museum;