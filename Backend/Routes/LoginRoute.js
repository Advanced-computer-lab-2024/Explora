const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const router = express.Router();

// Login Route
router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid username or password' });
      }
  
      // Compare the provided password with the stored password directly
      if (password !== user.password) {  // Direct comparison
        return res.status(400).json({ msg: 'Wrong username or password' });
      }
  
      // If the user is authenticated, create a JWT token
      const payload = {
        user: {
          id: user._id, // Include any relevant user information in the payload
          role: user.role, // Include the role, if relevant
        },
      };
  
      // Sign the JWT token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,  // Correctly accessing the secret from the .env file
        { expiresIn: '100h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, role: user.role });
        }
      );
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  module.exports = router;
  