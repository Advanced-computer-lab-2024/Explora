// routes/user.js

const express = require('express');
const { registerUser } = require('../controllers/userController'); // Import the controller

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Additional user routes can go here...

module.exports = router;
