const express = require('express');
const router = express.Router();
const Profile = require('../models/Tour_Guide_Profile');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Filename with timestamp
  }
});

const upload = multer({ storage });

// Create profile
router.post('/', upload.single('profilePicture'), async (req, res) => {
  const { username, email, password, name, mobile, yearsOfExperience, previousWork, termsAccepted} = req.body;
  
  // Check if terms were accepted
  if (termsAccepted !== 'true' && termsAccepted !== true) {
    return res.status(400).json({ msg: 'You must accept the terms and conditions to register.' });
  }
  try {
    const newProfile = new Profile({
      username,
      email,
      password,
      name,
      mobile,
      yearsOfExperience,
      previousWork,
      profilePicture: req.file ? req.file.path : '', // Save the path of the uploaded file
      termsAccepted: termsAccepted === 'true' || termsAccepted === true // Ensure correct boolean assignment
     });
    await newProfile.save();
    res.json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);  // Log the error
    res.status(500).send('Server error');  }
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
router.put('/me/:id', upload.single('profilePicture'), async (req, res) => {
  const { email, password, name, mobile, yearsOfExperience, previousWork, isAccepted  } = req.body;

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

    if (req.file) {
      profile.profilePicture = req.file.path; // Update the profile picture if a new one is uploaded
    }

    if (password) {
      profile.password = password;
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
});

router.put('/accept-terms/:id', async (req, res) => {
  try {
    const tourGuide = await TourGuide.findById(req.params.id);
    if (!tourGuide) {
      return res.status(404).json({ msg: 'Tour Guide not found' });
    }

    tourGuide.termsAccepted = true;
    await tourGuide.save();

    res.json({ msg: 'Terms accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});




module.exports = router;