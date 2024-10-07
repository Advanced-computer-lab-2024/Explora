const mongoose = require('mongoose');
const User = require('./User');

const AdminSchema = new mongoose.Schema({
    
});
const Admin = User.discriminator('Admin', AdminSchema);

module.exports = Admin;


