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
    //budget: { type: Number, required: true },
    //ratings: { type: Number, required: true }
    tags: [{ type: String }]
});




const Museum = mongoose.model('Museum', museumSchema);

module.exports = Museum;