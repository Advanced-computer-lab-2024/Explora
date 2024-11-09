// routes/user.js

const express = require('express');
const { registerUser, viewUsers, getUserid, getuserbyusername, loginUser} = require('../controllers/userController'); // Import the controller

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);
router.get('/', viewUsers)

router.get('/:username', getUserid)
router.get ('/login', loginUser)
// Additional user routes can go here...

module.exports = router;