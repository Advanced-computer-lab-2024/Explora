const mongoose = require("mongoose");

const allowedTags = ["Monuments", "Museums", "Religious Sites", "Palaces/Castles"];

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
        type: [String],
        enum: allowedTags, // Validates that tags are from the allowed list
        default: []
    }
});

const Museum = mongoose.model('Museum', museumSchema);

module.exports = Museum;
