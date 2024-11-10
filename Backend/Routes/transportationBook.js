const express = require('express');
const router = express.Router();
const transportBook = require('../models/transportBook'); // Ensure the path is correct
const Transportation = require('../models/transportation');
const User = require('../models/User');


//http://localhost:4000/transportationBook/book
//book a transportation method
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

        // Calculate the total price (seats booked * price of the transportation)
        const totalPrice = transportation.price * seats;

        // Create a new booking
        const booking = new transportBook({
            tourist: tourist._id,
            transportation: transportation._id,
            seatsBooked: seats,
            totalPrice: totalPrice, // Include totalPrice here
        });

        // Save the booking
        const savedBooking = await booking.save();

        // Process payment (call the method on the booking instance)
        await savedBooking.processPayment();

        res.status(201).json(savedBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
});


//http://localhost:4000/transportationBook/:touristId
//gets all bookings for a tourist
router.get('/:touristId', async (req, res) => {
    const { touristId } = req.params;

    try {
        // Find the tourist user
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(400).json({ message: 'Invalid tourist user' });
        }

        // Find all bookings for this tourist ID
        const bookings = await transportBook.find({ tourist: touristId }).populate('transportation');

        // Check if the tourist has any bookings
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this tourist' });
        }

        // Return the bookings and populated transportation details
        res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching bookings', error: err.message });
    }
});

module.exports = router;
