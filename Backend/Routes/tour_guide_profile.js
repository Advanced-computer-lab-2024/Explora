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
  const { email, password, name, mobile, yearsOfExperience, previousWork, isAccepted } = req.body;

  try {
    let profile;

    // Check if the ID is 'me', and handle it accordingly
    if (req.params.id === 'me') {
      // Assuming req.user is populated after authentication
      profile = await Profile.findById(req.user._id);
      if (!profile) {
        return res.status(404).json({ msg: 'Profile not found' });
      }
    } else {
      profile = await Profile.findById(req.params.id);
      if (!profile) {
        return res.status(404).json({ msg: 'Profile not found' });
      }
    }

    // Update the profile fields
    profile.email = email || profile.email;
    profile.password = password || profile.password;
    profile.name = name || profile.name;
    profile.mobile = mobile || profile.mobile;
    profile.yearsOfExperience = yearsOfExperience || profile.yearsOfExperience;
    profile.previousWork = previousWork || profile.previousWork;
    profile.isAccepted = isAccepted !== undefined ? isAccepted : profile.isAccepted;

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
});




module.exports = router;