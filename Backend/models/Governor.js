const User = require('./User'); // Ensure this is the correct path to User model
const mongoose = require('mongoose');

// Define any additional fields specific to Governor if necessary
const governorSchema = new mongoose.Schema({});

// Ensure correct spelling of the discriminator
const Governor = User.discriminator('Governor', governorSchema);
module.exports = Governor;
