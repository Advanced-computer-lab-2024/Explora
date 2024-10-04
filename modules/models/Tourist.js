const mongoose = require('mongoose');
const moment = require('moment');

const touristSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    nationality: { type: String, required: true },
    dob: { type: Date, required: true },
    occupation: { type: String, enum: ['job', 'student'], required: true }
});

// Virtual field to calculate age
touristSchema.virtual('age').get(function() {
    const currentDate = moment();
    const birthDate = moment(this.dob);
    return currentDate.diff(birthDate, 'years');
});

module.exports = mongoose.model('Tourist', touristSchema);
