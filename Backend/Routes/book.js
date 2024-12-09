const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Sales = require('../models/Tour_Guide_Sales'); // Import the Sales model
const User = require('../models/User');
const Tour_Guide_Itinerary = require('../models/Tour_Guide_Itinerary');

// POST route to book tickets
router.post('/book', async (req, res) => {
  const { userId, itineraryId, numberOfTickets } = req.body;

  try {
    // Find the tourist by the userId passed from the request body
    const tourist = await User.findById(userId);
    if (!tourist || tourist.role !== 'Tourist') {
      return res.status(403).json({ message: 'Only tourists can book tickets.' });
    }

    // Find the itinerary by the passed itineraryId
    const itinerary = await Tour_Guide_Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found.' });
    }

    // Calculate total price
    const totalPrice = itinerary.price * numberOfTickets;
    let loyaltyPoints;

    if (tourist.loyaltyLevel === 1) {
      loyaltyPoints = totalPrice * 0.5;
    } else if (tourist.loyaltyLevel === 2) {
      loyaltyPoints = totalPrice * 1;
    } else {
      loyaltyPoints = totalPrice * 1.5;
    }

// Create a new booking
const booking = new Book({
  tourist: tourist._id,
  itinerary: itinerary._id,
  numberOfTickets,
  totalPrice,
  tourGuideId: itinerary.tourGuideId,  // Set the tourGuideId from the itinerary
});

    await booking.save();

    // Create a new sales entry
    const sale = new Sales({
      tourGuideId: itinerary.tourGuideId, // Get the tour guide from the itinerary
      itineraryId: itinerary._id,
      touristId: tourist._id,
      amount: totalPrice,
    });

    await sale.save(); // Save the sales record

    // Optionally, you can update the itinerary's sales count or booking status
    itinerary.hasBookings = true;
    await itinerary.save();

    // Update the tourist's loyalty points and level
    tourist.loyaltyPoints += loyaltyPoints;
    tourist.loyaltyLevel =
      tourist.loyaltyPoints > 500000
        ? 3
        : tourist.loyaltyPoints > 100000
        ? 2
        : 1;
    await tourist.save();

    console.log("Booking details:", booking);
    console.log("Sale details:", sale);
    console.log("Itinerary updated:", itinerary);
    
    // Return the booking and sales info in the response
    return res.status(201).json({
      message: 'Booking and sale recorded successfully',
      booking,
      sale,
      loyaltyPoints: tourist.loyaltyPoints,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// DELETE route to cancel booking
router.delete('/cancel/:bookingId', async (req, res) => {
  try {
    const booking = await Book.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Get itinerary date to check cancellation period
    const itinerary = await Tour_Guide_Itinerary.findById(booking.itinerary);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found.' });
    }

    const now = new Date();
    const itineraryDate = new Date(itinerary.availableDates); // Assuming availableDates field in itinerary
    const hoursBeforeStart = (itineraryDate - now) / (1000 * 60 * 60);

    // Check if cancellation is within 48 hours
    if (hoursBeforeStart < 48) {
      return res.status(400).json({ message: 'Cannot cancel within 48 hours of the itinerary.' });
    }

    // Delete the booking
    await Book.findByIdAndDelete(req.params.bookingId);

    // If no other bookings exist for this itinerary, update `hasBookings`
    const remainingBookings = await Book.find({ itinerary: booking.itinerary._id });
    if (remainingBookings.length === 0) {
      itinerary.hasBookings = false;
      await itinerary.save();
    }

    return res.status(200).json({ message: 'Booking successfully canceled.' });
  } catch (error) {
    console.error("Cancellation Error:", error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;