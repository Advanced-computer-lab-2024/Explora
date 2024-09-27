const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');


// Create profile
router.post('/', async (req, res) => {
  const { name, mobile, yearsOfExperience, previousWork, isAccepted} = req.body;
  try {
    const newProfile = new Profile({
      name,
      mobile,
      yearsOfExperience,
      previousWork,
      isAccepted,
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

// Update profile
router.put('/:id', async (req, res) => {
  const { name, mobile, yearsOfExperience, previousWork, isAccepted} = req.body;
  try {
    let profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

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
