const express = require('express');
const router = express.Router();
const Book = require('../models/Book2'); // Updated Book model for activities
const Sales = require('../models/Advertiser_Sales'); // Import the Activity Sales model
const User = require('../models/User'); // User model (Tourists)
const Activity = require('../models/Activity'); // Activity model

// POST route to book tickets for activities
router.post('/bookact', async (req, res) => {
  const { userId, activityId, numberOfTickets } = req.body;

  try {
    // Find the tourist by the userId passed from the request body
    const tourist = await User.findById(userId);
    if (!tourist || tourist.role !== 'Tourist') {
      return res.status(403).json({ message: 'Only tourists can book activities.' });
    }

    // Find the activity by the passed activityId
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found.' });
    }

    // Calculate total price
    const totalPrice = activity.price * numberOfTickets;
    let loyaltyPoints;

    // Calculate loyalty points based on tourist's loyalty level
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
      activity: activity._id,
      numberOfTickets,
      totalPrice,
      advertiserId: activity.advertiserId, // Set the advertiserId from the activity
    });

    await booking.save();

    // Create a new sales entry
    const sale = new Sales({
      advertiserId: activity.advertiserId, // Get the advertiser from the activity
      activityId: activity._id,
      touristId: tourist._id,
      amount: totalPrice,
    });
    console.log('Sales entry created:', sale);
    await sale.save(); // Save the sales record

    // Optionally, you can update the activity's sales count or booking status
    activity.bookingOpen = true;
    await activity.save();

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
    console.log("Activity updated:", activity);

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

// DELETE route to cancel booking for activities
router.delete('/cancel2/:bookingId', async (req, res) => {
  try {
    const booking = await Book.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Get itinerary date to check cancellation period
    const activity = await Activity.findById(booking.activity);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found.' });
    }

    const now = new Date();
    const activityDate = new Date(activity.date); // Assuming availableDates field in itinerary
    const hoursBeforeStart = (activityDate - now) / (1000 * 60 * 60);

    // Check if cancellation is within 48 hours
    if (hoursBeforeStart < 48) {
      return res.status(400).json({ message: 'Cannot cancel within 48 hours of the itinerary.' });
    }

    // Delete the booking
    await Book.findByIdAndDelete(req.params.bookingId);

    // If no other bookings exist for this itinerary, update `hasBookings`
    const remainingBookings = await Book.find({ activity: booking.activity._id });
    if (remainingBookings.length === 0) {
      activity.bookingOpen = false;
      await activity.save();
    }

    return res.status(200).json({ message: 'Booking successfully canceled.' });
  } catch (error) {
    console.error("Cancellation Error:", error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;
