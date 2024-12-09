// THIS FILE HAS THE ROUTE IN THE CONTROLLER
const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const ActivityCategory = require('../models/ActivityCategory'); // Import your ActivityCategory model
const PrefrenceTag = require('../models/PrefrenceTag');
const mongoose = require('mongoose');
const User = require('../models/User');
const TouristPromoCode = require('../models/touristPromoCode');
const BookedActivity = require('../models/bookedActivities');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const cron = require('node-cron');
const moment = require('moment');
const Notification = require('../models/notification');
const Sales = require('../models/Advertiser_Sales');
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or another email service
    auth: {
      user: 'explora.donotreply@gmail.com', // Replace with your email
      pass: 'goiz pldj kpjy clsh'  // Use app-specific password if necessary
    }
  });

// http://localhost:4000/api/activity/create/Adventure
// Create an activity
router.post('/create/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    const { advertiserId, name, date, time, rating, location, price, tags, specialDiscounts, bookingOpen } = req.body;

    if (!advertiserId) {
        return res.status(400).json({ message: 'Advertiser ID is required.' });
    }

    try {
        const activityExists = await Activity.findOne({ name, date, time, location });
        if (activityExists) {
            return res.status(400).json({ message: 'Activity already exists.' });
        }

        const category = await ActivityCategory.findOne({ activityType: categoryName });
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        const prefTags = await PrefrenceTag.find({ tag: { $in: tags } });
        if (prefTags.length !== tags.length) {
            return res.status(400).json({ message: 'One or more tags are invalid.' });
        }

        const newActivity = new Activity({
            advertiserId, // Set the advertiser ID from request body
            name,
            date,
            time,
            rating,
            location,
            price,
            category: category._id,
            tags: prefTags.map(tag => tag._id),
            specialDiscounts,
            bookingOpen,
        });

        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//http://localhost:4000/api/activity/cancelActivity
router.delete('/cancelActivity', async (req, res) => {
    const { activityId, touristId } = req.body;

    try {
      const bookedActivity = await BookedActivity.findById(activityId).populate('tourist');
  
      if (!bookedActivity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
  
      if (bookedActivity.tourist._id.toString() !== touristId) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }
  
      const currentDate = new Date();
      const activityDate = new Date(bookedActivity.date);
  
      const hoursDifference = (activityDate - currentDate) / (1000 * 60 * 60);
  
      if (hoursDifference <= 48) {
        return res.status(400).json({ message: 'The event is in less than 2 days' });
      }
  
      // Add the money back to the tourist's wallet
      bookedActivity.tourist.wallet += bookedActivity.price;
      await bookedActivity.tourist.save();
  
      // Remove the booked activity
      await BookedActivity.findByIdAndDelete(activityId);
      return res.status(200).json({ message: 'Activity canceled and money refunded' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error canceling activity', error: error.message });
    }})
    
//http://localhost:4000/api/activity/testdelete
router.delete('/testdelete', async (req, res) => {
    const { touristId } = req.body;

    if (!touristId) {
        return res.status(400).json({ error: 'Tourist ID is required' });
    }

    try {
        const result = await BookedActivity.deleteMany({ tourist: touristId });
        return res.status(200).json({
            message: `Deleted ${result.deletedCount} activities for tourist.`,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'An error occurred while deleting activities.' });
    }
});
const sendUpcomingActivityReminders = async () => {
    try {
        const today = moment().utc().startOf('day'); // Ensure UTC for today's date
        const tomorrow = today.clone().add(1, 'days'); // Define the next day's start

        console.log(`Checking for activities between ${today.format('YYYY-MM-DD')} and ${tomorrow.format('YYYY-MM-DD')}`);

        // Find all booked activities that are scheduled for tomorrow
        const upcomingActivities = await BookedActivity.find({
            date: { $gte: tomorrow, $lt: tomorrow.clone().add(1, 'days') }
        }).populate('tourist'); // Populate tourist data

        if (upcomingActivities.length === 0) {
            console.log('No upcoming activities found for tomorrow.');
            return;
        }

        for (const activity of upcomingActivities) {
            const { tourist, name, date, time, location } = activity;

            // Ensure the tourist has opted for email notifications
            if (tourist) {
                console.log(`Sending reminder email to ${tourist.username} (${tourist.email}) for activity: ${name}`);

                // Create email content
                const mailOptions = {
                    from: 'explora.donotreply@gmail.com',
                    to: tourist.email,
                    subject: 'Reminder: Upcoming Activity Tomorrow! 📅',
                    text: `Dear ${tourist.username},\n\nThis is a friendly reminder about your upcoming activity:\n\n` +
                        `- Activity: ${name}\n` +
                        `- Date: ${moment(date).format('MMMM Do YYYY')}\n` +
                        `- Time: ${time}\n` +
                        `- Location: ${location}\n\n` +
                        `We hope you have a great time!\n\nBest regards,\nExplora Team`
                };

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });

                // Create a notification for the tourist
                const notification = new Notification({
                    tourist: tourist._id,
                    event: 'activity',
                    date: date,
                    message: `Reminder: Your activity '${name}' is scheduled for tomorrow at ${time} in ${location}.`
                });

                // Save the notification to the database
                await notification.save();
                console.log('Notification created for tourist:', tourist.username);
            }
        }
    } catch (error) {
        console.error('Error in sending activity reminders:', error);
    }
};

// Schedule the task to run every day at 19:12
cron.schedule('28 22 * * *', () => {
    console.log('Running scheduled task to send activity reminders and create notifications...');
    sendUpcomingActivityReminders();
});


//http://localhost:4000/api/activity/pastBookedActivities/60f3b3b3b3b3b3b3b3b3b3
router.get('/pastBookedActivities/:id', async (req, res) => {
    const { id: touristId } = req.params;

    try {
        // Validate the user exists and is a tourist
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(400).json({ message: 'Invalid tourist ID' });
        }

        // Find past booked activities for the user
        const pastBookedActivities = await BookedActivity.find({
            tourist: touristId,
            date: { $lt: new Date() } // Ensure the activity date is in the past
        })
            .populate('activity') // Populate details from the Activity model
            .populate('activity.category') // Optionally populate the category field
            .populate('activity.tags'); // Optionally populate the tags field

        // Respond with the past booked activities
        res.status(200).json(pastBookedActivities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving past booked activities', error: err.message });
    }
});

//http://localhost:4000/api/activity/upcomingBookedActivities/60f3b3b3b3b3b3b3b3b3b3
router.get('/upcomingBookedActivities/:id', async (req, res) => {
    const { id: touristId } = req.params;

    try {
        // Validate the user exists and is a tourist
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(400).json({ message: 'Invalid tourist ID' });
        }

        // Find upcoming booked activities for the user
        const upcomingBookedActivities = await BookedActivity.find({
            tourist: touristId,
            date: { $gte: new Date() } // Ensure the activity date is today or in the future
        })
            .populate('activity') // Populate details from the Activity model
            .populate('activity.category') // Optionally populate the category field
            .populate('activity.tags'); // Optionally populate the tags field

        // Respond with the upcoming booked activities
        res.status(200).json(upcomingBookedActivities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving upcoming booked activities', error: err.message });
    }
});


//http://localhost:4000/api/activity/bookedActivities/60f3b3b3b3b3b3b3b3b3b3b3
router.get('/bookedActivities/:id', async (req, res) => {
    const { id: touristId } = req.params;

    try {
        // Validate the user exists and is a tourist
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(400).json({ message: 'Invalid tourist ID' });
        }

        // Find booked activities for the user
        const bookedActivities = await BookedActivity.find({ tourist: touristId })
            .populate('activity') // Populate details from the Activity model
            .populate('activity.category') // Optionally populate the category field
            .populate('activity.tags'); // Optionally populate the tags field

        // Respond with the booked activities
        res.status(200).json(bookedActivities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving booked activities', error: err.message });
    }
});

//http://localhost:4000/api/activity/bookWallet
// http://localhost:4000/api/activity/bookWallet
router.post('/bookWallet', async (req, res) => {
    const { touristId, activityId, promoCode } = req.body;

    try {
        // Find the tourist user
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(400).json({ message: 'Invalid tourist user' });
        }
        const touristEmail = tourist.email; // Get the tourist's email dynamically

        // Find the activity
        const activity = await Activity.findById(activityId);
        if (!activity || activity.isDeleted || !activity.bookingOpen) {
            return res.status(404).json({ message: 'Activity not found or not open for booking' });
        }

        // Check if the tourist already booked the activity (optional logic)
        const existingBooking = await BookedActivity.findOne({ tourist: touristId, activity: activityId });
        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked this activity' });
        }

        // Calculate the total price
        let totalPrice = activity.price;

        // Check for promo code and apply discount if valid
        if (promoCode) {
            const promoCodeRecord = await TouristPromoCode.findOne({ tourist: touristId, code: promoCode });

            if (!promoCodeRecord) {
                return res.status(400).json({ message: 'Invalid or expired promo code' });
            }

            // Apply the discount
            const discountAmount = promoCodeRecord.discount * totalPrice;
            totalPrice -= discountAmount;

            // Ensure discounted price is valid
            if (totalPrice < 0) {
                return res.status(400).json({ message: 'Discounted price is invalid' });
            }

            // Delete the promo code since it's used
            await TouristPromoCode.deleteOne({ tourist: touristId, code: promoCode });
        }

        if (tourist.wallet < totalPrice) {
            return res.status(400).json({ message: 'Insufficient funds in wallet' });
        }

        let loyaltyPoints;
        if (tourist.loyaltyLevel === 1) {
            loyaltyPoints = totalPrice * 0.5;
        } else if (tourist.loyaltyLevel === 2) {
            loyaltyPoints = totalPrice * 1;
        } else {
            loyaltyPoints = totalPrice * 1.5;
        }

        // Create a new booked activity
        const bookedActivity = new BookedActivity({
            tourist: tourist._id,
            activity: activity._id,
            name: activity.name,
            date: activity.date,
            time: activity.time,
            rating: activity.rating,
            location: activity.location,
            price: totalPrice,
            category: activity.category,
            tags: activity.tags,
            advertiserId: activity.advertiserId, // Set the advertiserId from the activity
        });

        const sale = new Sales({
            advertiserId: activity.advertiserId, // Get the advertiser from the activity
            activityId: activity._id,
            touristId: tourist._id,
            amount: totalPrice,
        });

        console.log('Sales entry created:', sale);
        console.log('loyaltyPoints:', tourist.loyaltyPoints);
        await sale.save(); // Save the sales record

        // Save the booked activity
        const savedBooking = await bookedActivity.save();

        // Update the tourist's wallet and loyalty points
        tourist.wallet -= totalPrice;
        tourist.loyaltyPoints += loyaltyPoints;
        tourist.loyaltyLevel =
            tourist.loyaltyPoints > 500000
                ? 3
                : tourist.loyaltyPoints > 100000
                ? 2
                : 1;

        await tourist.save();

        // Send a booking receipt email to the tourist
        const mailOptions = {
            from: 'explora.donotreply@gmail.com', // Sender address
            to: touristEmail, // Dynamic email based on the tourist's record
            subject: 'Activity Booking Receipt',
            text: `Dear ${tourist.username},\n\nYour activity has been successfully booked!\n\nDetails:\n- Activity Name: ${activity.name}\n- Date: ${activity.date}\n- Time: ${activity.time}\n- Location: ${activity.location}\n- Price: ${totalPrice} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({
            savedBooking,
            message: 'Booking and sale recorded successfully',
            bookedActivity,
            sale,
            loyaltyPoints: tourist.loyaltyPoints,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
});


// Filter activities by tag, name, or category
router.get('/filter', async (req, res) => {
    const { tag, name, category } = req.query;

    // Build the filter object based on available query parameters
    let filter = {};

    // Check if tag is provided and add it to the filter
    if (tag) {
        const prefTag = await PrefrenceTag.findOne({ tag });
        if (prefTag) {
            filter.tags = prefTag._id; // Filter by tag ObjectId
        } else {
            return res.status(404).json({ message: 'Tag not found.' });
        }    }

    // Check if name is provided and add it to the filter
    if (name) {
        filter.name = { $regex: name, $options: 'i' };  // Case-insensitive partial match
    }

    // Check if category is provided and add it to the filter
    if (category) {
        const foundCategory = await ActivityCategory.findOne({ activityType: category });
        if (!foundCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        } 
        filter.category = foundCategory._id;
    }
    try {
        // Query the database with the filter object
        const activities = await Activity.find(filter).populate('tags');

        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found with the specified criteria.' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Read all activities
//http://localhost:4000/api/activity
router.get('/', async (req, res) => {
    try {
    const activities = await Activity.find().populate('category', 'activityType').populate('tags', 'tag').select('-createdAt -updatedAt');
    res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all upcoming activities
//http://localhost:4000/api/activity/upcoming
router.get('/upcoming', async (req, res) => {
    const today = new Date(); // Get today's date

    try {
        // Find activities where the date is greater than or equal to today
        const upcomingActivities = await Activity.find({ date: { $gte: today } });

        if (upcomingActivities.length === 0) {
            return res.status(404).json({ message: 'No upcoming activities found.' });
        }

        return res.status(200).json(upcomingActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//http://localhost:4000/api/activity/previous-activities
router.get('/previous-activities', async (req, res) => {
    const today = new Date(); // Get today's date

    try {
        // Find activities where the date is less than today (past activities)
        const previousActivities = await Activity.find({ date: { $lt: today } });

        if (previousActivities.length === 0) {
            return res.status(404).json({ message: 'No previous activities found.' });
        }

        return res.status(200).json(previousActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;  // Extract the activity ID from the request parameters

    try {
        // Find the activity by ID, populate the category and tags fields
        const activity = await Activity.findById(id)
            .populate('category', 'activityType')  // Populate category with only 'activityType'
            .populate('tags', 'tag')               // Populate tags with only 'tag'
            .select('-createdAt -updatedAt');       // Exclude createdAt and updatedAt fields

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found.' });  // If no activity is found
        }

        return res.status(200).json(activity);  // Return the activity if found
    } catch (err) {
        return res.status(500).json({ error: err.message });  // Return a server error message if something goes wrong
    }
});

// Route to get activities by advertiser ID
router.get('/act/:advertiserId', async (req, res) => {
  try {
    const advertiserId = req.params.advertiserId;

    // Find all activities associated with the advertiser
    const activities = await Activity.find({ 
      advertiserId,
      isDeleted: false, // Exclude deleted activities
    }).populate('category tags');

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching activities.' });
  }
});

// Update an activity
router.put('/:id', async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
    try {
        await Activity.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get activities by tag
router.get('/tag/:tag', async (req, res) => {
    const { tag } = req.params;

    try {
        const activities = await Activity.find({ tags: tag });

        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found with the specified tag.' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Filter activities by price, date, category, and rating
router.get('/search', async (req, res) => {
    const { price, date, category, rating } = req.query;

    // Build the filter object based on available query parameters
    let filter = {};

    // Check if price is provided and add it to the filter
    if (price) {
        filter.price = { $lte: price };  // Less than or equal to the provided price
    }

    // Check if date is provided and add it to the filter
    if (date) {
        filter.date = { $gte: new Date(date) };  // Greater than or equal to the provided date
    }

    // Check if category is provided and add it to the filter
    if (category) {
        filter.category = category;  // Direct match for the category
    }

    // Check if rating is provided and add it to the filter
    if (rating) {
        filter.rating = { $gte: rating };  // Greater than or equal to the provided rating
    }

    try {
        // Query the database with the filter object
        const activities = await Activity.find(filter);

        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found with the specified criteria.' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// Sort activities by price (low to high or high to low)
router.get('/sortprice', async (req, res) => {
    const { order } = req.query;  // Get the order (either 'low' or 'high')
    
    let sortOption = {};
    
    // Set the sorting order based on the query parameter
    if (order === 'low') {
        sortOption.price = 1; // Ascending order
    } else if (order === 'high') {
        sortOption.price = -1; // Descending order
    } else {
        return res.status(400).json({ message: 'Invalid sort order. Use "low" or "high".' });
    }

    try {
        // Query the database and sort the activities by price
        const sortedActivities = await Activity.find().sort(sortOption);
        res.status(200).json(sortedActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Sort activities by rating (low to high or high to low)
router.get('/sortrate', async (req, res) => {
    const { order } = req.query;  // Get the order (either 'low' or 'high')

    let sortOption = {};

    // Set the sorting order based on the query parameter
    if (order === 'low') {
        sortOption.rating = 1; // Ascending order
    } else if (order === 'high') {
        sortOption.rating = -1; // Descending order
    } else {
        return res.status(400).json({ message: 'Invalid sort order. Use "low" or "high".' });
    }

    try {
        // Query the database and sort the activities by rating
        const sortedActivities = await Activity.find().sort(sortOption);
        res.status(200).json(sortedActivities);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//http://localhost:4000/api/activity/
// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find().populate('category').populate('tags');
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Flagging and unflagging the activity
router.patch('/:id/flag', async (req, res) => {
    try {
      const activityId = req.params.id;
      
      // Find the activity first to check existence and current flag status
      const activity = await Activity.findById(activityId);
  
      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
  
      // Toggle flagged status
      const updatedActivity = await Activity.findByIdAndUpdate(
        activityId,
        { flagged: !activity.flagged },
        { new: true, runValidators: false }
      );
  
      res.json({ message: 'Flag status updated successfully', activity: updatedActivity });
    } catch (err) {
      console.error('Error updating flag status:', err);
      res.status(500).json({ message: 'Failed to update flag status' });
    }
  });
  
// Example: Fetch activities for tourists/guests
router.get('/', async (req, res) => {
    try {
      // Get itineraries excluding flagged ones
      const activity = await Activity.find({ flagged: false });
      
      res.status(200).json(activity);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });  

//http://localhost:4000/api/activity/bookStripe
router.post('/bookStripe', async (req, res) => {
    const { touristId, activityId, frontendUrl, promoCode } = req.body;

    try {
        // Find the tourist user
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(400).json({ message: 'Invalid tourist user' });
        }
        const touristEmail = tourist.email; // Get the tourist's email dynamically

        // Find the activity
        const activity = await Activity.findById(activityId);
        if (!activity || activity.isDeleted || !activity.bookingOpen) {
            return res.status(404).json({ message: 'Activity not found or not open for booking' });
        }

        // Check if the tourist already booked the activity (optional logic)
        const existingBooking = await BookedActivity.findOne({ tourist: touristId, activity: activityId });
        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked this activity' });
        }

        // Calculate the total price
        let totalPrice = activity.price;

        // Check for promo code and apply discount if valid
        if (promoCode) {
            const promoCodeRecord = await TouristPromoCode.findOne({ tourist: touristId, code: promoCode });

            if (!promoCodeRecord) {
                return res.status(400).json({ message: 'Invalid or expired promo code' });
            }

            // Apply the discount
            const discountAmount = promoCodeRecord.discount * totalPrice;
            totalPrice -= discountAmount;

            // Ensure discounted price is valid
            if (totalPrice < 0) {
                return res.status(400).json({ message: 'Discounted price is invalid' });
            }

            // Delete the promo code since it's used
            await TouristPromoCode.deleteOne({ tourist: touristId, code: promoCode });
        }

        // Calculate loyalty points based on the tourist's loyalty level
        let loyaltyPoints;
        if (tourist.loyaltyLevel === 1) {
            loyaltyPoints = totalPrice * 0.5;
        } else if (tourist.loyaltyLevel === 2) {
            loyaltyPoints = totalPrice * 1;
        } else {
            loyaltyPoints = totalPrice * 1.5;
        }

        // Create a payment intent with Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${activity.name}`,
                            description: `${activity.location}`,
                        },
                        unit_amount: Math.round(totalPrice * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${frontendUrl}/UpcomingBookedEvents?session_id={CHECKOUT_SESSION_ID}&touristId=${touristId}&activityId=${activityId}`, // Including session ID and other details in URL
            cancel_url: `${frontendUrl}/UpcomingBookedEvents`, // Redirect to the same URL for cancellation
            metadata: {
                touristId,
                activityId,
                activityName: activity.name,
                location: activity.location,
            },
        });

        // Send the session URL back to frontend to redirect user
        res.status(200).json({ url: session.url });

        // Immediately book the activity without verifying the payment
        const bookedActivity = new BookedActivity({
            tourist: tourist._id,
            activity: activity._id,
            name: activity.name,
            date: activity.date,
            time: activity.time,
            rating: activity.rating,
            location: activity.location,
            price: totalPrice,
            category: activity.category,
            tags: activity.tags,
            paymentIntentId: session.id,
            advertiserId: activity.advertiserId, // Set the advertiserId from the activity
        });

        const sale = new Sales({
            advertiserId: activity.advertiserId, // Get the advertiser from the activity
            activityId: activity._id,
            touristId: tourist._id,
            amount: totalPrice,
        });
        await sale.save(); // Save the sales record
        tourist.loyaltyPoints += loyaltyPoints;
        tourist.loyaltyLevel =
          tourist.loyaltyPoints > 500000
            ? 3
            : tourist.loyaltyPoints > 100000
            ? 2
            : 1;
        await tourist.save();
    
        console.log('Sales entry created:', sale);
        console.log('loyaltyPoints:', loyaltyPoints);
        await sale.save(); // Save the sales record

        // Save the booked activity
        const savedBooking = await bookedActivity.save();
        
        // Update tourist's wallet and loyalty points
        tourist.wallet -= totalPrice;
        tourist.loyaltyPoints += loyaltyPoints;
        tourist.loyaltyLevel =
            tourist.loyaltyPoints > 500000
                ? 3
                : tourist.loyaltyPoints > 100000
                ? 2
                : 1;

        await tourist.save();

        // Send a booking receipt email to the tourist
        const mailOptions = {
            from: 'explora.donotreply@gmail.com', // Sender address
            to: touristEmail, // Dynamic email based on the tourist's record
            subject: 'Activity Booking Receipt',
            text: `Dear ${tourist.username},\n\nYour activity has been successfully booked!\n\nDetails:\n- Activity Name: ${activity.name}\n- Date: ${activity.date}\n- Time: ${activity.time}\n- Location: ${activity.location}\n- Price: ${totalPrice} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
});

module.exports = router;