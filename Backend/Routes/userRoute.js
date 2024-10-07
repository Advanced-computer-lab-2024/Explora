// routes/user.js

const express = require('express');
const { registerUser, viewUsers } = require('../controllers/userController'); // Import the controller

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);
router.get('/', viewUsers)

// Additional user routes can go here...

module.exports = router;
