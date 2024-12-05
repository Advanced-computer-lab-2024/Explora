const touristModel = require('../models/touristModel');

// controllers/touristController.js

const getTourist = async (req, res) => {
    try {
        const { email } = req.params;
        const tourist = await touristModel.findOne({ email }).lean(); // `.lean()` to get plain JS object

        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        res.status(200).json({
            ...tourist,
            level: tourist.level,
            badge: tourist.badge
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const allTourists = async (req, res) => {
    try {
        const tourist = await touristModel.find({ });

        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        res.status(200).json(tourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new tourist
const createTourist = async (req, res) => {
    try {
      // Destructure the request body to get the fields
      const { email, username, password, mobileNumber, nationality, dateOfBirth, job, wallet } = req.body;
  
      // Ensure the 'wallet' field is being correctly passed
      const newTourist = new touristModel({
        email,
        username,
        password,  // Make sure to hash the password before saving
        mobileNumber,
        nationality,
        dateOfBirth,
        job,
        wallet,  // This should correctly be set from the request body
      });
  
      // Save the tourist to the database
      const savedTourist = await newTourist.save();
  
      // Respond with the saved tourist object
      res.status(201).json({
        message: 'Tourist created successfully',
        tourist: savedTourist
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating tourist', error: err.message });
    }
  };
  
// Update a tourist by email
const updateTourist = async (req, res) => {
    try {
        const { password, mobileNumber, nationality, dateOfBirth, job, wallet } = req.body;

        const updatedTourist = await touristModel.findByIdAndUpdate(
            req.params.id,
            { password, mobileNumber, nationality, dateOfBirth, job, wallet },
            { new: true, runValidators: true }
        );

        if (!updatedTourist) {
            return res.status(404).json({ message: `No tourist found with ID ${req.params.id}` });
        }

        res.status(200).json(updatedTourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTourist = async (req, res) => {
    try {
        const touristId = req.params.id;

        // Check for any upcoming itineraries with paid bookings
            const upcomingItineraries = await Itinerary.find({
            tourGuideId: touristId,
            availableDates: { $gte: new Date() },  // Only upcoming dates
            hasBookings: true // Assuming 'hasBookings' implies paid bookings
        });

        if (upcomingItineraries.length > 0) {
            return res.status(400).json({
                message: "Cannot delete profile; there are upcoming itineraries with paid bookings associated with it."
            });
        }

        // Corrected variable name from 'advirtiserId' to 'advertiserId'
        const getUpcomingActivities = await Activity.find({
            advertiserId: touristId, // Ensure this matches your schema
            availableDates: { $gte: new Date() },  // Only upcoming dates
            hasBookings: true // Assuming 'hasBookings' implies paid bookings
        });

        if (getUpcomingActivities.length > 0) {
            return res.status(400).json({
                message: "Cannot delete profile; there are upcoming activities with paid bookings associated with it."
            });
        }

        // If no upcoming itineraries with bookings, proceed with deletion
        const deletedTourist = await Tourist.findByIdAndDelete(touristId);

        if (!deleteTourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        res.status(200).json({ message: "Tourist deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// controllers/touristController.js

const calculateLoyaltyPoints = (amountPaid, level) => {
    switch (level) {
        case 1:
            return amountPaid * 0.5;
        case 2:
            return amountPaid * 1;
        case 3:
            return amountPaid * 1.5;
        default:
            return 0;
    }
};

const addLoyaltyPoints = async (req, res) => {
    const { touristId, amountPaid, level } = req.body;

    // Basic validation to ensure required fields are provided
    if (!touristId || !amountPaid || !level) {
        return res.status(400).json({ message: "touristId, amountPaid, and level are required." });
    }

    try {
        // Find the tourist by ID
        const tourist = await Tourist.findById(touristId);
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Calculate the loyalty points earned
        const pointsEarned = calculateLoyaltyPoints(amountPaid, level);

        // Update tourist's loyalty points
        tourist.loyaltyPoints += pointsEarned;

        // Save updated tourist information
        await tourist.save();

        // Send a success response with points details
        res.status(200).json({
            message: 'Points added successfully',
            pointsEarned,
            totalPoints: tourist.loyaltyPoints,
        });
    } catch (error) {
        // Handle errors
        console.error("Error in addLoyaltyPoints:", error);
        res.status(500).json({ error: error.message });
    }
};




// controllers/touristController.js

const redeemPoints = async (req, res) => {
    const { touristId, pointsToRedeem } = req.body;

    try {
        const tourist = await Tourist.findById(touristId);
        if (!tourist) return res.status(404).json({ message: 'Tourist not found' });

        // Check if the tourist has enough points
        if (tourist.loyaltyPoints < pointsToRedeem) {
            return res.status(400).json({ message: 'Insufficient loyalty points for redemption.' });
        }

        // Calculate cash equivalent and apply the conversion rate
        const cashEquivalent = (pointsToRedeem / 10000) * 100; // Conversion rate: 10,000 points = 100 EGP

        // Deduct points and add cash to wallet
        tourist.loyaltyPoints -= pointsToRedeem;
        tourist.wallet += cashEquivalent;

        // Save the updated tourist data
        await tourist.save();

        res.status(200).json({
            message: 'Points redeemed successfully.',
            cashAdded: cashEquivalent,
            remainingPoints: tourist.loyaltyPoints,
            walletBalance: tourist.wallet
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { getTourist, updateTourist, createTourist, allTourists, deleteTourist, addLoyaltyPoints, redeemPoints };
