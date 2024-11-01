const touristModel = require('../models/touristModel');
const Itinerary = require('../Routes/tour_guide_itinerary');
const Activity = require('../Routes/activity');

// Get a tourist by email
const getTourist = async (req, res) => {
    try {
        const { email } = req.params;
        const tourist = await touristModel.findOne({ email });

        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        res.status(200).json(tourist);
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
        const { email, username, password, mobileNumber, nationality, dateOfBirth, job } = req.body;

        const existingTourist = await touristModel.findOne({ email });
        if (existingTourist) {
            return res.status(400).json({ message: "Tourist with the same email already exists" });
        }
        const existingUsername = await touristModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Tourist with the same username already exists" });
        }
        const newTourist = await touristModel.create({
            email,
            username,
            password,
            mobileNumber,
            nationality,
            dateOfBirth,
            job,
           
            role: 'Tourist'
        });

        res.status(201).json(newTourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

module.exports = { getTourist, updateTourist, createTourist, allTourists, deleteTourist };
