const mongoose = require('mongoose');

const Schema = mongoose.Schema

const prefrenceTagSchema = new Schema({
    tag: {
        type: String,
        unique: true,
        required: true
    }
})
module.exports = mongoose.model('PrefrenceTag', prefrenceTagSchema);