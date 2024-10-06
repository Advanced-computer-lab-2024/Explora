const express = require('express');
const router = express.Router();
const Profile = require('../models/Tour_Guide_Profile');


// Create profile
router.post('/', async (req, res) => {
  const { username, email, password, name, mobile, yearsOfExperience, previousWork} = req.body;
  try {
    const newProfile = new Profile({
      username,
      email,
      password,
      name,
      mobile,
      yearsOfExperience,
      previousWork
    });
    await newProfile.save();
    res.json(newProfile);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get profile by ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find(); // Fetch all profiles
    res.json(profiles);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
});

// Update profile
router.put('/me/:id', async (req, res) => {
  const { email, password, name, mobile, yearsOfExperience, previousWork } = req.body;
  const userId = req.params.id; // Get userId from the URL

  try {
    const profile = await Profile.findById(userId);
    if (!profile) {
      console.log('Profile not found with ID:', userId); // Debug log
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Update fields as needed
    if (email) profile.email = email;
    if (password) profile.password = await hashPassword(password);
    if (name) profile.name = name;
    if (mobile) profile.mobile = mobile;
    if (yearsOfExperience) profile.yearsOfExperience = yearsOfExperience;
    if (previousWork) profile.previousWork = previousWork;

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});




module.exports = router;