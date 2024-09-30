const express = require('express');
const Advertiser = require('../models/Advertiser');

const router = express.Router();

// Create a new advertiser profile
router.post('/create', async (req, res) => {
    const { userId, companyName, website, hotline, profile } = req.body;

    const newAdvertiser = new Advertiser({
        userId,
        companyName,
        website,
        hotline,
        profile
    });

    try {
        await newAdvertiser.save();
        res.status(201).json({ message: 'Advertiser profile created successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read advertiser profile
router.get('/:userId', async (req, res) => {
    try {
        const advertiser = await Advertiser.findOne({ userId: req.params.userId });
        if (!advertiser) return res.status(404).json({ error: 'Advertiser not found' });
        res.status(200).json(advertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update advertiser profile
router.put('/:userId', async (req, res) => {
    const { companyName, website, hotline, profile } = req.body;

    try {
        const updatedAdvertiser = await Advertiser.findOneAndUpdate(
            { userId: req.params.userId },
            { companyName, website, hotline, profile },
            { new: true }
        );

        if (!updatedAdvertiser) return res.status(404).json({ error: 'Advertiser not found' });

        res.status(200).json(updatedAdvertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
