// controllers/bookingController.js
const Activity = require('../models/Activity');
const Tourist = require('../models/touristModel');
const Booking = require('../models/Booking');

const bookTicket = async (req, res) => {
    const { touristId, activityId, ticketCount } = req.body;

    // Validate input data
    if (!touristId || !activityId || !ticketCount || ticketCount <= 0) {
        return res.status(400).json({ message: 'Tourist ID, activity ID, and a valid ticket count are required.' });
    }

    try {
        // Check if tourist exists
        const tourist = await Tourist.findById(touristId);
        if (!tourist) return res.status(404).json({ message: 'Tourist not found.' });

        // Check if tourist is at least 18
        const currentDate = new Date();
        const birthDate = new Date(tourist.dob);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) return res.status(403).json({ message: 'You must be 18 or older to book.' });

        // Check if activity exists and booking is open
        const activity = await Activity.findById(activityId);
        if (!activity) return res.status(404).json({ message: 'Activity not found.' });
        if (!activity.bookingOpen) return res.status(400).json({ message: 'Booking is closed for this activity.' });

        // Create a booking
        const newBooking = new Booking({
            activityId,
            touristId,
            ticketCount
        });
        await newBooking.save();

        res.status(200).json({ message: 'Booking successful!', booking: newBooking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Find the booking and activity details
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found.' });

        const activity = await Activity.findById(booking.activityId);
        if (!activity) return res.status(404).json({ message: 'Activity not found.' });

        // Calculate the time difference between now and the activity's date
        const currentTime = new Date();
        const eventTime = new Date(activity.date); // Ensure activity has a 'date' field
        const timeDifference = eventTime.getTime() - currentTime.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        // Enforce 48-hour rule
        if (hoursDifference < 48) {
            return res.status(403).json({ message: 'Cancellation is only allowed up to 48 hours before the event.' });
        }

        // Cancel booking
        booking.cancellationDate = new Date(); // Log the cancellation time
        await booking.save();

        res.status(200).json({ message: 'Booking cancelled successfully.', booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { bookTicket , cancelBooking };
