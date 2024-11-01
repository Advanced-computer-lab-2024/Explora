// controllers/advertiserController.js

const Advertiser = require('../models/Advertiser');

// Create a new advertiser profile
const createAdvertiserProfile = async (req, res) => {
    const { companyName, website, hotline, profile, username, email, password } = req.body;

    try {
        // Check if the username already exists
        const existingUsername = await Advertiser.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists. Please choose another.' });
        }   
        // Check if the email already exists
        const existingEmail = await Advertiser.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists. Please choose another.' });
        }
        // Create a new user and assign role as Advertiser
        const newAdvertiser = new Advertiser({
            username,
            email,
            password,
            role: 'Advertiser',
            companyName,
            website,
            hotline,
            profile
        });

        await newAdvertiser.save();
        res.status(201).json({ message: 'Advertiser profile created successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an advertiser profile
const updateAdvertiserProfile = async (req, res) => {
    const { companyName, website, hotline, profile } = req.body;

    try {
        const updatedAdvertiser = await Advertiser.findByIdAndUpdate(
            req.params.id,
            { companyName, website, hotline, profile },
            { new: true } // Return the updated document
        );

        if (!updatedAdvertiser) {
            return res.status(404).json({ error: 'Advertiser not found.' });
        }

        res.status(200).json(updatedAdvertiser); // Return the updated advertiser
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all advertisers
const getAllAdvertisers = async (req, res) => {
    try {
        const advertisers = await Advertiser.find();
        res.status(200).json(advertisers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get advertiser by ID
const getAdvertiserById = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.params.id);
        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found.' });
        }
        res.status(200).json(advertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an advertiser profile

const deleteAdvertiserProfile = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        
        // Check for upcoming activities associated with the advertiser that have bookings
        const upcomingActivities = await Activity.find({
            advertiserId: id, // Assuming there is an advertiserId field in your Activity schema
            hasBookings: true, // Check if there are bookings
            // Check for upcoming dates (this can vary based on your schema, assuming 'date' field)
            date: { $gte: new Date() } // Example: Activities that are on or after the current date
        });

        // If there are any upcoming activities with bookings, prevent deletion
        if (upcomingActivities.length > 0) {
            return res.status(400).json({ error: 'Cannot delete profile; there are upcoming activities with bookings.' });
        }

        const deletedAdvertiser = await Advertiser.findByIdAndDelete(id); // Delete the advertiser

        if (!deletedAdvertiser) {
            return res.status(404).json({ error: 'Advertiser not found.' });
        }

        res.status(200).json({ message: 'Advertiser profile deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createAdvertiserProfile,
    getAllAdvertisers,
    getAdvertiserById,
    updateAdvertiserProfile,
    deleteAdvertiserProfile,
};