// routes/profileRouter.js

const express = require('express');
const {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require('../controllers/profileController');

const router = express.Router();

// Route to create a new profile
router.post('/', createProfile);

// Route to get all profiles
router.get('/', getAllProfiles);

// Route to get a profile by ID
router.get('/:id', getProfileById);

// Route to update a profile by ID
router.put('/:id', updateProfile);

// Route to delete a profile by ID
router.delete('/:id', deleteProfile);

module.exports = router;
