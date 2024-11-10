const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
    historicAreas: { type: Boolean, required: true },
    beaches: { type: Boolean, required: true },
    familyFriendly: { type: Boolean, required: true },
    shopping: { type: Boolean, required: true },
    budget: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    email: { type: String, required: true },  // assuming you want to store the email
});

const Preferences = mongoose.model('Preferences', preferencesSchema);
module.exports = Preferences;
