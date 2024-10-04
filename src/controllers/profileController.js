// controllers/profileController.js

const Profile = require('../models/Profile');

// Create profile
const createProfile = async (req, res) => {
  const { name, mobile, yearsOfExperience, previousWork, isAccepted } = req.body;
  try {
    const newProfile = new Profile({
      name,
      mobile,
      yearsOfExperience,
      previousWork,
      isAccepted,
    });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
};

// Get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
};

// Get profile by ID
const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
};

// Update profile
const updateProfile = async (req, res) => {
  const { name, mobile, yearsOfExperience, previousWork, isAccepted } = req.body;
  try {
    let profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Update profile fields only if new values are provided
    profile.name = name || profile.name;
    profile.mobile = mobile || profile.mobile;
    profile.yearsOfExperience = yearsOfExperience || profile.yearsOfExperience;
    profile.previousWork = previousWork || profile.previousWork;
    profile.isAccepted = isAccepted !== undefined ? isAccepted : profile.isAccepted;

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
};

// Delete profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(200).json({ msg: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
};
