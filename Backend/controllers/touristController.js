const touristModel = require('../models/touristModel');

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
        const { email, username, password, mobileNumber, nationality, dateOfBirth, job, wallet } = req.body;

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
            wallet,
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

        const updatedTourist = await touristModel.findOneAndUpdate(
            { email: req.params.email },
            { password, mobileNumber, nationality, dateOfBirth, job, wallet },
            { new: true, runValidators: true }
        );

        if (!updatedTourist) {
            return res.status(404).json({ message: `No tourist found with email ${req.params.email}` });
        }

        res.status(200).json(updatedTourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTourist, updateTourist, createTourist, allTourists };
