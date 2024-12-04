const express = require('express');
const router = express.Router();
const AdminPromoCode = require('../models/adminPromoCode');
const TouristPromoCode = require('../models/touristPromoCode');
const Tourist = require('../models/touristModel');
const moment = require('moment');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'explora.donotreply@gmail.com', // Replace with your email
        pass: 'goiz pldj kpjy clsh',         // Use an app-specific password
    },
});

//http://localhost:4000/promoCode/testpromocode
router.post('/testpromocode', async (req, res) => {
    const { touristId, promoCode, discount } = req.body; // Extract inputs from req.body

    // Validate inputs
    if (!touristId || !promoCode || !discount) {
        return res.status(400).json({ error: 'All fields are required: touristId, promoCode, discount' });
    }

    try {
        // Set expiry date to December 30, 2024
        const expiryDate = new Date('2024-12-30');

        // Create the promo code
        const newPromoCode = await TouristPromoCode.create({
            code: promoCode,
            discount: discount,
            expiryDate: expiryDate,
            tourist: touristId,
        });

        // Return success response
        res.status(201).json({ 
            message: 'Promo code created successfully', 
            promoCode: newPromoCode 
        });
    } catch (error) {
        console.error('Error creating promo code:', error);
        res.status(500).json({ error: 'Failed to create promo code' });
    }
});

// Endpoint to create a new admin promo code
//http://localhost:4000/promoCode/admin/create
router.post('/admin/create', async (req, res) => {
    try {
        const { code, discount } = req.body;

        // Validate discount range
        if (discount < 0 || discount > 1) {
            return res.status(400).json({ message: 'Discount must be between 0 and 1' });
        }

        // Create and save the admin promo code
        const newPromoCode = new AdminPromoCode({ code, discount });
        await newPromoCode.save();

        res.status(201).json({
            message: 'Promo code created successfully',
            newPromoCode,
        });
    } catch (error) {
        console.error('Error creating promo code:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const createTouristPromoCodesAutomatically = async () => {
    try {
        const tourists = await Tourist.find();
        const today = moment().utc().startOf('day'); // Force today to be in UTC
        console.log(`Today's date (UTC): ${today.format('YYYY-MM-DD HH:mm:ss')}`); // Debugging: log full today's date in UTC

        for (const tourist of tourists) {
            // Ensure birthday is parsed correctly in UTC and debug log
            const birthday = moment(tourist.dateOfBirth).utc().startOf('day'); // Force birthday to be in UTC
            console.log(`Checking ${tourist.username}'s birthday (UTC): ${birthday.format('YYYY-MM-DD HH:mm:ss')}`); // Debugging: log full birthday

            // Check if today is the tourist's birthday by comparing only the day and month
            if (birthday.month() === today.month() && birthday.date() === today.date()) {
                console.log(`It's ${tourist.username}'s birthday! Assigning a promo code.`);

                // Select a random admin promo code
                const adminPromoCodes = await AdminPromoCode.find();
                if (adminPromoCodes.length === 0) {
                    console.log('No promo codes available in the system.');
                    continue; // Skip if no promo codes are available
                }

                const randomPromoCode = adminPromoCodes[
                    Math.floor(Math.random() * adminPromoCodes.length)
                ];

                // Create expiry date for promo code
                const expiryDate = today.clone().add(10, 'days');
                const touristPromoCode = new TouristPromoCode({
                    code: randomPromoCode.code,
                    discount: randomPromoCode.discount,
                    expiryDate,
                    tourist: tourist._id,
                });

                await touristPromoCode.save();

                // Send email notification
                const mailOptions = {
                    from: 'explora.donotreply@gmail.com',
                    to: tourist.email,
                    subject: 'Happy Birthday! Here’s Your Promo Code 🎉',
                    text: `Dear ${tourist.username},\n\nHappy Birthday! 🎂 Here's a special promo code for you: ${randomPromoCode.code}.
                    Enjoy a ${randomPromoCode.discount * 100}% discount, valid until ${expiryDate.format('MMMM Do YYYY')}.\n\nBest regards,\nExplora Team`,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });

                console.log(`Promo code ${randomPromoCode.code} assigned to ${tourist.username}`);
            } else {
                console.log(`Skipping ${tourist.username} - Not their birthday today.`);
            }
        }
    } catch (error) {
        console.error('Error in automatic promo code creation:', error);
    }
};





// Endpoint to retrieve a tourist's promo codes by their ID
router.get('/:touristId', async (req, res) => {
    try {
        const touristId = req.params.touristId;
        const touristPromoCodes = await TouristPromoCode.find({ tourist: touristId });

        if (!touristPromoCodes || touristPromoCodes.length === 0) {
            return res.status(404).json({ message: 'No promo codes found for this tourist' });
        }

        res.status(200).json({ touristPromoCodes });
    } catch (error) {
        console.error('Error fetching promo codes:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to retrieve all admin promo codes
router.get('/', async (req, res) => {
    try {
        const adminPromoCodes = await AdminPromoCode.find();

        if (!adminPromoCodes || adminPromoCodes.length === 0) {
            return res.status(404).json({ message: 'No promo codes found' });
        }

        res.status(200).json({ adminPromoCodes });
    } catch (error) {
        console.error('Error fetching admin promo codes:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Cron job to check for birthdays daily at midnight
cron.schedule('44 21 * * *', () => {
    console.log('Running scheduled task to check for birthdays...');
    createTouristPromoCodesAutomatically(); // No need to pass `io` anymore
});


// Export the router
module.exports = router;
