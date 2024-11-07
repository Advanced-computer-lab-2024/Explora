const express = require('express');
const router = express.Router();
const transportBook = require('../models/transportBook'); // Ensure the path is correct
const Transportation = require('../models/transportation');
const User = require('../models/User');

router.post('/book', async (req, res) => {
    const { touristId, transportationId, seats } = req.body;

    try {
        // Find the tourist user
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(400).json({ message: 'Invalid tourist user' });
        }

        // Find the transportation method
        const transportation = await Transportation.findById(transportationId);
        if (!transportation) {
            return res.status(404).json({ message: 'Transportation not found' });
        }

        // Create a new booking
        const booking = new transportBook({
            tourist: tourist._id,
            transportation: transportation._id,
            seatsBooked: seats,
        });

        // Save the booking
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
});

module.exports = router;
