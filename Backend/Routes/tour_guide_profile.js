const express = require('express');
const { authenticateUser } = require('../middleware/AuthMiddleware'); // Adjust the path as necessary
const router = express.Router();
const Profile = require('../models/Tour_Guide_Profile');
const Itinerary = require('../models/Tour_Guide_Itinerary'); // Adjust the path as needed
const multer = require('multer');
const path = require('path');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const {generateToken} = require('../middleware/AuthMiddleware');
const jwt = require('jsonwebtoken');
const { profile } = require('console');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jwt.sign({ username }, 'supersecret', {
        expiresIn: maxAge
    });
};


const login = async (req, res) => {
        try {
            const { username, password } = req.body;
    
            // Check if user exists
            const user = await Profile.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Compare provided password with the stored hashed password
            // Compare the provided password with the stored password directly
            if (password !== user.password) {  // Direct comparison
            return res.status(400).json({ msg: 'Wrong username or password' });
            }
            const token = createToken(user.username);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

const logout = async (req, res) => {
        // Clear the JWT cookie by setting it to an empty value and setting maxAge to 0
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ message: "Successfully logged out" });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where files should be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
  }
});
const upload = multer({ storage });

// Create profile
const createProfile = async (req, res) => {
  const { username, email, password, name, mobile, yearsOfExperience, previousWork, termsAccepted } = req.body;

  // Check if terms and conditions are accepted
  if (!termsAccepted) {
      return res.status(400).json({ msg: 'You must accept the terms and conditions to register.' });
  }

  try {
    const picturePath = req.file ? `uploads/${req.file.filename}` : null;

    // Create profile
    const newProfile = new Profile({
      name,
      mobile,
      yearsOfExperience,
      previousWork,
      image: picturePath,
      termsAccepted: true
    });

    await newProfile.save();

    // Generate token
    const token = createToken(newProfile.username);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: error.message });
  }
};

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
// Controller or route handler
if (req.body.newPassword) {
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
  profile.password = hashedPassword; // Update password with hashed version
}
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

// DELETE /tour-guide/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      // Check for upcoming itineraries associated with this tour guide
      const upcomingItineraries = await Itinerary.find({ tourGuideId: id, hasBookings: true });
      
      if (upcomingItineraries.length > 0) {
          return res.status(400).json({ message: 'Cannot delete profile; there are upcoming itineraries associated with it.' });
      }

      // If no upcoming itineraries, proceed to delete
      const result = await User.findByIdAndDelete(id); // Assuming your User model is set up properly
      
      if (!result) {
          return res.status(404).json({ message: 'Tour guide not found' });
      }
      
      res.status(200).json({ message: 'Tour guide profile deleted successfully' });
  } catch (error) {
      console.error('Error deleting tour guide profile:', error);
      res.status(500).send('Server delete error');
  }
});

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  //const userId = req.user._id; // assuming req.user is set in AuthMiddleware

  try {
      // // Find the user by ID
      // const user = await Profile.findById(userId);
      // if (!user) {
      //     return res.status(404).json({ message: "User not found" });
      // }

      // Verify the current password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Current password is incorrect" });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt();
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      // Update the password in the database
      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

router.put('/rate/:id', async (req, res) => {
  try {
    const tourGuideId = req.params.id;
    const { rating } = req.body; // Expect rating to be between 1 and 5

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const profile = await profile.findByIdAndUpdate(
      tourGuideId, 
      { $set: { rating } },
      { new: true } // Return the updated itinerary
    );

    if (!profile) {
      return res.status(404).json({ message: 'tour guide not found' });
    }

    res.json(profile); // Return updated itinerary
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add or update a comment for an itinerary
router.put('/comment/:id', async (req, res) => {
  try {
    const tourGuideId = req.params.id;
    const { comment } = req.body; // Comment can be a string

    const profile = await profile.findByIdAndUpdate(
      tourGuideId, 
      { $set: { comment } },
      { new: true } // Return the updated itinerary
    );

    if (!profile) {
      return res.status(404).json({ message: 'profile not found' });
    }

    res.json(profile); // Return updated itinerary
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put("/me/:id/change-password", changePassword);
router.post("/login", login);
router.get("/logout", logout);
router.post('/register', upload.single('image'), createProfile);

module.exports = router;