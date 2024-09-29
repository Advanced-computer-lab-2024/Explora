const mongoose = require('mongoose');

const Schema = mongoose.Schema

const prefrenceTagSchema = new Schema({
    tag: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('PrefrenceTag', prefrenceTagSchema);
