const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Tour_Guide_Itinerary');
const jwt = require('jsonwebtoken');
const { checkAdmin } = require('../middleware/AuthMiddleware');
const socket = require('socket.io-client');
let io; // The Socket.IO instance
const nodemailer = require('nodemailer');
const Notifications = require('../models/Notifications'); // Import Notification model
const TourGuide = require('../models/Tour_Guide_Profile');
const Book = require('../models/Book');
const Sales = require('../models/Tour_Guide_Sales');
// Set the socket.io instance after a successful connection
const setIo = (_io) => {
  io = _io;
};
const User = require('../models/User');
const TouristPromoCode = require('../models/touristPromoCode');
const BookedItinerary = require('../models/bookedItineraries');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const cron = require('node-cron');
const moment = require('moment');
const Notification = require('../models/notification');
const Activity = require('../models/Activity');
const Tourist = require('../models/touristModel');
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or another email service
    auth: {
      user: 'explora.donotreply@gmail.com', // Replace with your email
      pass: 'goiz pldj kpjy clsh'  // Use app-specific password if necessary
    }
  });

// Middleware to verify JWT and get the user from token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // assuming your payload contains user info
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

//http://localhost:4000/api/tour_guide_itinerary/return
router.delete('/return', async (req, res) => {
  const { itineraryId, touristId } = req.body;

  try {
    const bookedItinerary = await BookedItinerary.findById(itineraryId).populate('tourist');

    if (!bookedItinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    if (bookedItinerary.tourist._id.toString() !== touristId) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    const currentDate = new Date();
    const firstAvailableDate = new Date(bookedItinerary.availableDates[0]);

    const hoursDifference = (firstAvailableDate - currentDate) / (1000 * 60 * 60);

    if (hoursDifference <= 48) {
      return res.status(400).json({ message: 'The event is in less than 2 days' });
    }

    // Add the money back to the tourist's wallet
    bookedItinerary.tourist.wallet += bookedItinerary.price;
    await bookedItinerary.tourist.save();

    // Remove the booked itinerary
    await BookedItinerary.findByIdAndDelete(itineraryId);

    return res.status(200).json({ message: 'Itinerary canceled and money refunded' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error canceling itinerary', error: error.message });
  }
});

//http://localhost:4000/api/tour_guide_itinerary/notification/5f9b1b3b7b3b3b3b3b3b3b3b
router.delete('/notification/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to delete the notification by ID
    const notification = await Notification.findByIdAndDelete(id);

    // Check if the notification exists
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    // Return success message if deleted
    res.status(200).json({ message: 'Notification deleted successfully.' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'An error occurred while deleting the notification.' });
  }
});
//http://localhost:4000/api/tour_guide_itinerary/bookmark/5f9b1b3b7b3b3b3b3b3b3b3b/5f9b1b3b7b3b3b3b3b3b3b3b
router.delete('/bookmark/:touristId/:eventId', async (req, res) => {
  try {
    const { touristId, eventId } = req.params;

    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Check if the event ID belongs to an itinerary or activity
    const activityExists = tourist.bookmarksActivity.includes(eventId);
    const itineraryExists = tourist.bookmarksItinerary.includes(eventId);

    // If the event is found in bookmarksActivity, remove it
    if (activityExists) {
      tourist.bookmarksActivity = tourist.bookmarksActivity.filter(
        (activityId) => !activityId.equals(eventId)
      );
    }

    // If the event is found in bookmarksItinerary, remove it
    if (itineraryExists) {
      tourist.bookmarksItinerary = tourist.bookmarksItinerary.filter(
        (itineraryId) => !itineraryId.equals(eventId)
      );
    }

    // If the event is not found in either array
    if (!activityExists && !itineraryExists) {
      return res.status(400).json({ message: 'Event not found in bookmarks' });
    }

    // Save the updated tourist document
    await tourist.save();

    res.status(200).json({ message: 'Bookmarked event removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// /http://localhost:4000/api/tour_guide_itinerary/bookmark/5f9b1b3b7b3b3b3b3b3b3b3b
router.post('/bookmark/:touristId', async (req, res) => {
  try {
    const { touristId } = req.params;
    const { eventId } = req.body; // Assumes eventId is passed in the request body
    const tourist = await Tourist.findById(touristId);
    
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Check if the eventId corresponds to an Activity or an Itinerary
    const activity = await Activity.findById(eventId);
    const itinerary = await Itinerary.findById(eventId);

    if (activity) {
      if (tourist.bookmarksActivity.includes(eventId)) {
        return res.status(400).json({ message: 'Activity is already bookmarked' });
      }
      // It's an Activity, so push it to bookmarksActivity
      tourist.bookmarksActivity.push(eventId);
      await tourist.save();
      
      // Create notification if the event has started taking bookings
      if (activity.bookingOpen) {
        setTimeout(async () => {
          try {
            const notificationMessage = "The event that you bookmarked has started taking bookings!";
            const notification = new Notification({
              tourist: tourist._id,
              event: 'activity',
              date: activity.date,
              message: notificationMessage
            });
            await notification.save();
          } catch (error) {
            console.error("Error creating notification:", error);
          }
        }, 3 * 60 * 1000); // 3 minutes in milliseconds
      }

      return res.status(200).json({ message: 'Activity bookmarked successfully' });

    } else if (itinerary) {
      if (tourist.bookmarksItinerary.includes(eventId)) {
        return res.status(400).json({ message: 'Itinerary is already bookmarked' });
      }
      // It's an Itinerary, so push it to bookmarksItinerary
      tourist.bookmarksItinerary.push(eventId);
      await tourist.save();
      
      // Create notification if the event has started taking bookings
      if (itinerary.bookingOpen) {
        setTimeout(async () => {
          try {
        const notificationMessage = `The event that you bookmarked has started taking bookings!`;
        const notification = new Notification({
          tourist: tourist._id, // Use the tourist's ID
          event: 'itinerary',
          date: itinerary.date, // Use the itinerary's date for the notification
          message: notificationMessage
        });

        // Save the notification
        await notification.save();
      }
      catch (error) {
        console.error("Error creating notification:", error);
      }
    }, 3 * 60 * 1000); // 3 minutes in milliseconds
  }

      return res.status(200).json({ message: 'Itinerary bookmarked successfully' });

    } else {
      return res.status(400).json({ message: 'Invalid event ID' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// /http://localhost:4000/api/tour_guide_itinerary/bookmark/5f9b1b3b7b3b3b3b3b3b3b3b
router.get('/bookmark/:touristId', async (req, res) => {
  try {
    const { touristId } = req.params;
    const tourist = await Tourist.findById(touristId)
      .populate('bookmarksActivity')
      .populate('bookmarksItinerary'); // Populate the arrays with actual Activity and Itinerary documents
    
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Check if both bookmark arrays are empty
    if (tourist.bookmarksActivity.length === 0 && tourist.bookmarksItinerary.length === 0) {
      return res.status(200).json({ message: 'You currently have no bookmarked events' });
    }

    // Combine both arrays of bookmarked events
    const allBookmarks = {
      activities: tourist.bookmarksActivity,
      itineraries: tourist.bookmarksItinerary,
    };

    res.status(200).json(allBookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/bookWallet', async (req, res) => {
  const { touristId, itineraryId, promoCode } = req.body;

  try {
      // Validate the tourist
      const tourist = await User.findById(touristId);
      if (!tourist || tourist.role !== 'Tourist') {
          return res.status(400).json({ message: 'Invalid tourist user' });
      }
      const touristEmail = tourist.email;

      // Validate the itinerary
      const itinerary = await Itinerary.findById(itineraryId);
      if (!itinerary || itinerary.isDeleted || !itinerary.isActive) {
          return res.status(404).json({ message: 'Itinerary not found or not available for booking' });
      }

      // Promo code logic
      let totalPrice = itinerary.price;
      if (promoCode) {
        const promoCodeRecord = await TouristPromoCode.findOne({ tourist: touristId, code: promoCode });
        if (!promoCodeRecord) {
            return res.status(400).json({ message: 'Invalid or expired promo code' });
        }
        const discountAmount = promoCodeRecord.discount * totalPrice;
        totalPrice -= discountAmount;

        if (totalPrice < 0) {
            return res.status(400).json({ message: 'Discounted price is invalid' });
        }
        await TouristPromoCode.deleteOne({ tourist: touristId, code: promoCode });
      }

      // Loyalty points calculation
      let loyaltyPoints;
      if (tourist.loyaltyLevel === 1) {
          loyaltyPoints = totalPrice * 0.5;
      } else if (tourist.loyaltyLevel === 2) {
          loyaltyPoints = totalPrice * 1;
      } else {
          loyaltyPoints = totalPrice * 1.5;
      }

      // Check if the tourist has enough funds
      if (tourist.wallet < totalPrice) {
          return res.status(400).json({ message: 'Insufficient funds in wallet' });
      }

      // Deduct from wallet and update loyalty points
      tourist.wallet -= totalPrice;
      tourist.loyaltyPoints += loyaltyPoints;
      tourist.loyaltyLevel = tourist.loyaltyLevel; // Use the already set loyaltyLevel from the tourist instance

      // Save the tourist data
      await tourist.save();

      // Create the booking
      const bookedItinerary = new BookedItinerary({
          tourGuideId: itinerary.tourGuideId,
          itinerary: itinerary._id,
          tourist: tourist._id,
          tourGuideName: itinerary.tourGuideName,
          activities: itinerary.activities,
          locations: itinerary.locations,
          timeline: itinerary.timeline,
          duration: itinerary.duration,
          language: itinerary.language,
          price: totalPrice,
          availableDates: itinerary.availableDates[0], // Use the first available date
          pickupLocation: itinerary.pickupLocation,
          dropoffLocation: itinerary.dropoffLocation,
          tags: itinerary.tags,
          rating: itinerary.rating,
      });

      // Save the booking
      const savedBooking = await bookedItinerary.save();

      // Create sales record
      const sale = new Sales({
          tourGuideId: itinerary.tourGuideId,
          itineraryId: itinerary._id,
          touristId: tourist._id,
          amount: totalPrice,
      });

      await sale.save();

      // Update itinerary status
      itinerary.hasBookings = true;
      await itinerary.save();

      // Send booking receipt email
      const mailOptions = {
          from: 'explora.donotreply@gmail.com',
          to: touristEmail,
          subject: 'Itinerary Booking Receipt',
          text: `Dear ${tourist.username},\n\nYour itinerary has been successfully booked!\n\nDetails:\n- Itinerary Name: ${itinerary.tourGuideName}'s Tour\n- Locations: ${itinerary.locations}\n- Duration: ${itinerary.duration} days\n- Price: ${totalPrice} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora`
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
          } else {
              console.log('Email sent:', info.response);
          }
      });

      // Return success response
      res.status(201).json({
          savedBooking, 
          message: 'Booking and sale recorded successfully',
          sale,
          loyaltyPoints: tourist.loyaltyPoints,
      });

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
});

//http://localhost:4000/api/tour_guide_itinerary/testdelete
router.delete('/testdelete', async (req, res) => {
  const { touristId } = req.body;

  if (!touristId) {
    return res.status(400).json({ error: 'Tourist ID is required' });
  }

  try {
    // Use the model to delete all booked itineraries for the given tourist
    const result = await BookedItinerary.deleteMany({ tourist: touristId });

    return res.status(200).json({
      message: `Deleted ${result.deletedCount} booked itineraries for tourist.`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'An error occurred while deleting itineraries.' });
  }
});
//http://localhost:4000/api/tour_guide_itinerary/pastBookedItineraries/5f9b1b3b7b3b3b3b3b3b3b3b
router.get('/pastBookedItineraries/:touristId', async (req, res) => {
  const { touristId } = req.params;

  try {
      // Validate the tourist
      const tourist = await User.findById(touristId);
      if (!tourist || tourist.role !== 'Tourist') {
          return res.status(400).json({ message: 'Invalid tourist user' });
      }

      // Fetch all booked itineraries for the tourist
      const bookedItineraries = await BookedItinerary.find({ tourist: touristId })
          .populate('itinerary', 'tourGuideName locations duration price availableDates') // Populate itinerary fields
          .select('-__v -createdAt -updatedAt'); // Exclude unnecessary fields

      // Filter itineraries based on the first date in the availableDates array
      const currentDate = new Date();
      const pastItineraries = bookedItineraries.filter(itinerary => {
          const firstAvailableDate = itinerary.availableDates[0]; // Use the first value in availableDates
          return firstAvailableDate < currentDate; // Compare the first available date with the current date
      });

      const futureItineraries = bookedItineraries.filter(itinerary => {
          const firstAvailableDate = itinerary.availableDates[0]; // Use the first value in availableDates
          return firstAvailableDate >= currentDate; // Compare the first available date with the current date
      });

      // Return past and future itineraries
      res.status(200).json({ 
          pastItineraries
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching itineraries', error: err.message });
  }
});


//http://localhost:4000/api/tour_guide_itinerary/upcomingBookedItineraries/5f9b1b3b7b3b3b3b3b3b3b3b
router.get('/upcomingBookedItineraries/:touristId', async (req, res) => {
  const { touristId } = req.params;

  try {
      // Validate the tourist
      const tourist = await User.findById(touristId);
      if (!tourist || tourist.role !== 'Tourist') {
          return res.status(400).json({ message: 'Invalid tourist user' });
      }

      // Fetch all booked itineraries for the tourist
      const bookedItineraries = await BookedItinerary.find({ tourist: touristId })
          .populate('itinerary', 'tourGuideName locations duration price availableDates') // Populate itinerary fields
          .select('-__v -createdAt -updatedAt'); // Exclude unnecessary fields

      // Filter itineraries based on the first date in the availableDates array
      const currentDate = new Date();
      const futureItineraries = bookedItineraries.filter(itinerary => {
          const firstAvailableDate = itinerary.availableDates[0]; // Use the first value in availableDates
          return firstAvailableDate >= currentDate; // Compare the first available date with the current date
      });

      // Return past and future itineraries
      res.status(200).json({ 
          futureItineraries
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching itineraries', error: err.message });
  }
});


// http://localhost:4000/api/tour_guide_itinerary/booked
router.get('/booked/:touristId', async (req, res) => {
  const { touristId } = req.params;

  try {
      // Validate the tourist
      const tourist = await User.findById(touristId);
      if (!tourist || tourist.role !== 'Tourist') {
          return res.status(400).json({ message: 'Invalid tourist user' });
      }

      // Fetch all booked itineraries for the tourist
      const bookedItineraries = await BookedItinerary.find({ tourist: touristId })
          .populate('itinerary', 'tourGuideName locations duration price') // Populate referenced itinerary fields
          .select('-__v -createdAt -updatedAt'); // Exclude unnecessary fields

      // Check if no bookings were found
      if (bookedItineraries.length === 0) {
          return res.status(404).json({ message: 'No booked itineraries found for this tourist' });
      }

      // Return the booked itineraries
      res.status(200).json(bookedItineraries);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching booked itineraries', error: err.message });
  }
});

const sendUpcomingItineraryReminders = async () => {
    try {
        const today = moment().utc().startOf('day'); // Ensure UTC for today's date
        const tomorrow = today.clone().add(2, 'days'); // Define the next day's start

        console.log(`Checking for itineraries between ${today.format('YYYY-MM-DD')} and ${tomorrow.format('YYYY-MM-DD')}`);

        // Find all booked itineraries that are scheduled for tomorrow
        const upcomingItineraries = await BookedItinerary.find({
            'activities.date': { $gte: today, $lt: tomorrow }
        }).populate('tourist'); // Populate tourist data

        if (upcomingItineraries.length === 0) {
            console.log('No upcoming itineraries found for tomorrow.');
            return;
        }

        for (const itinerary of upcomingItineraries) {
            const { tourist, tourGuideName, activities, locations, duration, language } = itinerary;

            // Ensure the tourist data is present
            if (tourist) {
                console.log(`Sending reminder email to ${tourist.username} (${tourist.email}) for itinerary: ${tourGuideName}`);

                // Extract the first activity date and time
                const firstActivity = activities.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
                const { date, time } = firstActivity;

                // Create email content
                const mailOptions = {
                    from: 'explora.donotreply@gmail.com',
                    to: tourist.email,
                    subject: 'Reminder: Upcoming Itinerary Tomorrow! 📅',
                    text: `Dear ${tourist.username},\n\nThis is a friendly reminder about your upcoming itinerary:\n\n` +
                        `- Itinerary by: ${tourGuideName}\n` +
                        `- Location: ${locations}\n` +
                        `- Start Date: ${moment(date).format('MMMM Do YYYY')}\n` +
                        `- Start Time: ${time}\n` +
                        `- Duration: ${duration} days\n` +
                        `- Language: ${language}\n\n` +
                        `We hope you have a wonderful experience!\n\nBest regards,\nExplora Team`
                };

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });

                // Create a notification
                const notificationMessage = `Reminder: Your itinerary is scheduled for tomorrow at ${time}. Don't miss it!`;
                const notification = new Notification({
                    tourist: tourist._id, // Use the tourist's ID
                    event: 'itinerary',
                    date: date, // Date of the first activity
                    message: notificationMessage
                });

                // Save the notification
                await notification.save();
                console.log(`Notification created for tourist ${tourist.username} (${tourist.email}): ${notificationMessage}`);
            } else {
                console.warn('Tourist information is missing for a booked itinerary.');
            }
        }
    } catch (error) {
        console.error('Error in sending itinerary reminders:', error);
    }
};

// Schedule the task to run every day at 20:36
cron.schedule('21 22 * * *', () => {
    console.log('Running scheduled task to send itinerary reminders...');
    sendUpcomingItineraryReminders();
});
//http://localhost:4000/api/tour_guide_itinerary/notification/5f9b1b3b7b3b3b3b3b3b3b3b
router.get('/notification/:id', async (req, res) => {
  const { id: touristId } = req.params;

  try {
      // Validate that the touristId is provided
      if (!touristId) {
          return res.status(400).json({ error: 'Tourist ID is required.' });
      }

      // Fetch all notifications for the given tourist ID
      const notifications = await Notification.find({ tourist: touristId })
          .sort({ createdAt: -1 }) // Sort by the newest notifications first
          .exec();

      // If no notifications are found
      if (notifications.length === 0) {
          return res.status(404).json({ message: 'No notifications found for this tourist.' });
      }

      // Return the notifications
      res.status(200).json({ notifications });
  } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'An error occurred while fetching notifications.' });
  }
});

// Sort itineraries by price (high to low or low to high)
router.get('/sortprice', async (req, res) => {
  const { order } = req.query; // 'high' for descending, 'low' for ascending
  
  // Set sort order based on the 'order' query parameter
  let sortOrder = order === 'high' ? -1 : 1; // -1 for descending, 1 for ascending

  try {
    const sortedItineraries = await Itinerary.find().sort({ price: sortOrder });

    if (sortedItineraries.length === 0) {
      return res.status(404).json({ message: 'No itineraries found for sorting by price.' });
    }

    res.status(200).json(sortedItineraries);
  } catch (error) {
    console.error('Error sorting itineraries by price:', error);
    res.status(500).json({ message: 'Server error while sorting by price', error: error.message });
  }
});

// Sort itineraries by rating (high to low or low to high)
router.get('/sortrate', async (req, res) => {
  const { order } = req.query; // 'high' for descending, 'low' for ascending
  
  // Set sort order based on the 'order' query parameter
  let sortOrder = order === 'high' ? -1 : 1; // -1 for descending, 1 for ascending

  try {
    const sortedItineraries = await Itinerary.find().sort({ rating: sortOrder });

    if (sortedItineraries.length === 0) {
      return res.status(404).json({ message: 'No itineraries found for sorting by rating.' });
    }

    res.status(200).json(sortedItineraries);
  } catch (error) {
    console.error('Error sorting itineraries by rating:', error);
    res.status(500).json({ message: 'Server error while sorting by rating', error: error.message });
  }
});

// get all upcoming itineraries
//http://localhost:4000/api/tour_guide_itinerary/upcoming
router.get('/upcoming', async (req, res) => {
  try {
    // Get today's date and remove the time component for accurate comparisons
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Query the database for itineraries with availableDates equal to or later than today
    const upcomingItineraries = await Itinerary.find({
      availableDates: { $gte: today }
    });

    // If no itineraries are found
    if (upcomingItineraries.length === 0) {
      return res.status(404).json({ message: 'No upcoming itineraries found.' });
    }

    // Return the list of upcoming itineraries
    res.status(200).json(upcomingItineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// get all Previous itineraries
router.get('/previous', async (req, res) => {
  try {
    // Get today's date and remove the time component for accurate comparisons
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Query the database for itineraries with availableDates earlier than today
    const previousItineraries = await Itinerary.find({
      availableDates: { $lt: today }
    });

    // If no itineraries are found
    if (previousItineraries.length === 0) {
      return res.status(404).json({ message: 'No previous itineraries found.' });
    }

    // Return the list of previous itineraries
    res.status(200).json(previousItineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search itineraries by name and tag
router.get('/search', async (req, res) => {
  const { name, tags } = req.query;

  // Build the filter object based on query parameters
  let filter = {};

  // If name is provided, use a case-insensitive partial match for the name field
  if (name) {
    filter.name = { $regex: name, $options: 'i' }; // 'i' for case-insensitive
  }

  // If tags are provided, search for itineraries containing any of the provided tags
  if (tags) {
    filter.tags = { $in: tags.split(',') }; // Split comma-separated tags into an array
  }

  try {
    const itineraries = await Itinerary.find(filter);

    // If no itineraries are found
    if (itineraries.length === 0) {
      return res.status(404).json({ message: 'No itineraries found with the specified name or tags.' });
    }

    // Return the filtered itineraries
    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while searching itineraries.' });
  }
});

// GET all itineraries
router.get('/all', async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// Example: Fetch itineraries for tourists/guests
router.get('/flag', async (req, res) => {
  try {
    // Get itineraries excluding flagged ones
    const itineraries = await Itinerary.find({ flagged: false });
    
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/tag/:tag', async (req, res) => {
  const { tag } = req.params;

  try {
      const itineraries = await Itinerary.find({ tags: tag });

      if (itineraries.length === 0) {
          return res.status(404).json({ message: 'No itineraries found with the specified tag.' });
      }

      return res.status(200).json(itineraries);
  } catch (error) {
      return res.status(500).json({ message: 'Server tag error', error: error.message });
  }
});

// Create a new itinerary
router.post('/', async (req, res) => {
  const {
    tourGuideName,
    tourGuideId, // Received from the frontend
    activities,
    locations,
    timeline,
    duration,
    language,
    price,
    availableDates,
    availableTimes,
    accessibility,
    pickupLocation,
    dropoffLocation,
    hasBookings,
    tags,
  } = req.body;

  try {
    const newItinerary = new Itinerary({
      tourGuideName,
      tourGuideId,
      activities,
      locations,
      timeline,
      duration,
      language,
      price,
      availableDates,
      availableTimes,
      accessibility,
      pickupLocation,
      dropoffLocation,
      hasBookings,
      tags,
    });

    await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).send('Server create error');
  }
});

router.get('/filter', async (req, res) => {
  const { price, date, tags, language } = req.query;
  
  // Build the filter object based on available query parameters
  let filter = {};
if (price) {
  filter.price = { $lte: price }; // Price less than or equal to the provided value
}

// Check if the date is provided and filter accordingly
if (date) {
  filter.availableDates = { $in: [new Date(date)] };  // Filter by specific date
}

// Check if tags are provided and filter accordingly
if (tags) {
  filter.tags = { $in: tags.split(',') };  // Filter by tags (e.g., "museum,historical")
}

// Check if language is provided and filter accordingly
if (language) {
  filter.language = language;  // Filter by language
}

try {
  // Query the database with the filter object
  const itineraries = await Itinerary.find(filter);
  
  // Return the filtered itineraries
  res.json(itineraries);  
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Error occurred while filtering itineraries." });
}
});


// Get an itinerary by ID
router.get('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ msg: 'Itinerary not found' });
    }
    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  // Get tourGuideId from query parameters
  const { tourGuideId } = req.query;

  // Check if tourGuideId exists in the query
  if (!tourGuideId) {
    return res.status(400).json({ msg: 'Tour guide ID is required' });
  }

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(tourGuideId)) {
    return res.status(400).json({ msg: 'Invalid tour guide ID format' });
  }

  try {
    // Query the itineraries created by the specified tour guide using 'tourGuideId'
    const itineraries = await Itinerary.find({ tourGuideId: tourGuideId });

    // Check if any itineraries were found
    if (!itineraries || itineraries.length === 0) {
      return res.status(404).json({ msg: 'No itineraries found for this tour guide' });
    }

    // Return the itineraries
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching itineraries', error: error.message });
  }
});

// Update an itinerary
router.put('/:id', async (req, res) => {
  const {
    tourGuideName,
    activities,
    locations,
    timeline,
    duration,
    language,
    price,
    availableDates,
    availableTimes,
    accessibility,
    pickupLocation,
    dropoffLocation,
    hasBookings, 
    tags
  } = req.body;

  try {
    let itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ msg: 'Itinerary not found' });
    }

    itinerary.tourGuideName = tourGuideName || itinerary.tourGuideName;
    itinerary.activities = activities || itinerary.activities;
    itinerary.locations = locations || itinerary.locations;
    itinerary.timeline = timeline || itinerary.timeline;
    itinerary.duration = duration || itinerary.duration;
    itinerary.language = language || itinerary.language;
    itinerary.price = price || itinerary.price;
    itinerary.availableDates = availableDates || itinerary.availableDates;
    itinerary.availableTimes = availableTimes || itinerary.availableTimes;
    itinerary.accessibility = accessibility !== undefined ? accessibility : itinerary.accessibility;
    itinerary.pickupLocation = pickupLocation || itinerary.pickupLocation;
    itinerary.dropoffLocation = dropoffLocation || itinerary.dropoffLocation;
    itinerary.hasBookings = hasBookings || itinerary.hasBookings;
    itinerary.tags = tags || itinerary.tags;
    await itinerary.save();
    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server updatebyid error');
  }
});

// Delete an itinerary
router.delete('/:id', async (req, res) => {
  try {
    // Find the itinerary by ID
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ msg: 'Itinerary not found' });
    }

    // Check if the itinerary has bookings using the 'hasBookings' field
    if (itinerary.hasBookings) {
      return res.status(400).json({ msg: 'Cannot delete itinerary with existing bookings' });
    }

    // If no bookings, delete the itinerary
    await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Itinerary removed successfully' });
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(500).send('Server delete error');
  }
});


// GET itineraries containing "museum" activities
router.get('/museums', async (req, res) => {
  try {
      const itineraries = await Itinerary.find({ tags: 'museum' });
      res.json(itineraries);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// GET itineraries containing "historical" activities
router.get('/historical', async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ tags: 'historical' });
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Filter itineraries based on price, date, tags, and language

router.put('/:id/deactivate', async (req, res) => {
  const itineraryId = req.params.id;
  console.log('Deactivation request received for itinerary ID:', itineraryId);

  try {
    // Find the itinerary by its ID
    const itinerary = await Itinerary.findById(itineraryId);
    console.log('Itinerary found:', itinerary);

    // Check if the itinerary exists
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }

    // Only allow deactivation if itinerary has bookings
    if (!itinerary.hasBookings) {
      console.log('Itinerary has no bookings, cannot deactivate.');
      return res.status(400).json({ error: 'Only itineraries with bookings can be deactivated' });
    }

    // Set isActive to false to deactivate
    itinerary.isActive = false;
    await itinerary.save();

    console.log('Itinerary deactivated successfully.');
    res.status(200).json({ message: 'Itinerary deactivated successfully.' });
  } catch (error) {
    console.error('Error occurred while deactivating itinerary:', error);
    res.status(500).json({ error: 'Failed to deactivate itinerary' });
  }
});

router.put('/rate/:id', async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const { rating } = req.body; // Expect rating to be between 1 and 5

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const itinerary = await Itinerary.findByIdAndUpdate(
      itineraryId, 
      { $set: { rating } },
      { new: true } // Return the updated itinerary
    );

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.json(itinerary); // Return updated itinerary
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add or update a comment for an itinerary
router.put('/comment/:id', async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const { comment } = req.body; // Comment can be a string

    const itinerary = await Itinerary.findByIdAndUpdate(
      itineraryId, 
      { $set: { comment } },
      { new: true } // Return the updated itinerary
    );

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.json(itinerary); // Return updated itinerary
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Flagging and unflagging the itinerary
router.patch('/:id/flag', async (req, res) => {
  const { id } = req.params;

  try {
    // Find itinerary by ID and populate the tourGuideId field
    const itinerary = await Itinerary.findById(id).populate('tourGuideId');
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    // Toggle the flagged status
    itinerary.flagged = !itinerary.flagged;
    await itinerary.save();

    // If the itinerary has been flagged, notify the tour guide
    if (itinerary.flagged) {
      // Create a notification for the itinerary owner (tour guide)
      await Notifications.create({
        userId: itinerary.tourGuideId._id, // Assuming 'tourGuideId' points to a User
        message: `Your itinerary "${itinerary.locations}" has been flagged.`,
        itineraryId: id,
      });

      // Send email notification to the itinerary owner
      const mailOptions = {
        from: 'explora.donotreply@gmail.com',
        to: itinerary.tourGuideId.email, // Use the populated email from the tour guide
        subject: 'Itinerary has been Flagged',
        text: `Dear ${itinerary.tourGuideName},\n\nYour itinerary titled "${itinerary.locations}" has been flagged.\nPlease review it.`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    // Respond with a success message
    res.status(200).json({ message: `Itinerary ${itinerary.flagged ? 'flagged' : 'unflagged'} successfully` });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;