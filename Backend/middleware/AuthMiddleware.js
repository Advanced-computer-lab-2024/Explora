// middleware/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Use your actual secret key from an environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have this in your .env file
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user._id; // Store the user ID in the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12,(err, salt) => {
      if (err) reject(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    })
  })
})
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { authenticateUser, hashPassword, comparePassword};
