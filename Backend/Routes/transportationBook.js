const express = require('express');
const router = express.Router();
const transportBook = require('../models/transportBook'); // Ensure the path is correct
const Transportation = require('../models/transportation');
const TouristPromoCode = require('../models/touristPromoCode');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or another email service
    auth: {
      user: 'explora.donotreply@gmail.com', // Replace with your email
      pass: 'goiz pldj kpjy clsh'  // Use app-specific password if necessary
    }
  });
  
//http://localhost:4000/transportationBook/bookWallet
//book a transportation method
router.post('/bookWallet', async (req, res) => {
    const { touristId, transportationId, seats, promoCode } = req.body;

    try {
        // Find the tourist user
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(400).json({ message: 'Invalid tourist user' });
        }
        const touristEmail = tourist.email; // Get the tourist's email dynamically

        // Find the transportation method
        const transportation = await Transportation.findById(transportationId);
        if (!transportation) {
            return res.status(404).json({ message: 'Transportation not found' });
        }

        if (seats > transportation.capacity) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Calculate the total price (seats booked * price of the transportation)
        let totalPrice = transportation.price * seats;

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

        // Check if the tourist has enough balance in their wallet
        if (tourist.wallet < totalPrice) {
            return res.status(400).json({ message: 'Insufficient funds in wallet' });
        }

        // Deduct the price from the tourist's wallet and update the transportation capacity
        tourist.wallet -= totalPrice;
        await tourist.save(); // Save the updated tourist to the database

        transportation.capacity -= seats;
        await transportation.save(); // Save the updated transportation record

        // Create a new booking
        const booking = new transportBook({
            tourist: tourist._id,
            transportation: transportation._id,
            method: transportation.method,
            seatsBooked: seats,
            totalPrice: totalPrice,
        });

        // Save the booking
        const savedBooking = await booking.save();

        // Process payment (call the method on the booking instance)
        // await savedBooking.processPayment();

        // Send a booking receipt email to the tourist
        const mailOptions = {
            from: 'explora.donotreply@gmail.com', // Sender address
            to: touristEmail, // Dynamic email based on the tourist's record
            subject: 'Transportation Booking Receipt',
            text: `Dear ${tourist.username},\n\nYour transportation has been successfully booked!\n\nDetails:\n- Transportation Method: ${transportation.method}\n- Origin: ${transportation.origin}\n- Destination: ${transportation.destination}\n- Date: ${transportation.date}\n- Time: ${transportation.time}\n- Duration: ${transportation.duration}\n- Price: ${totalPrice} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json(savedBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
});


//============================================================
//http://localhost:4000/transportationBook/bookStripe
//book a transportation method
router.post('/bookStripe', async (req, res) => {
    const { touristId, transportationId, seats, paymentMethodId } = req.body;

    try {
        // Find the tourist user
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(400).json({ message: 'Invalid tourist user' });
        }
        const touristEmail = tourist.email; // Get the tourist's email dynamically

        // Find the transportation method
        const transportation = await Transportation.findById(transportationId);
        if (!transportation) {
            return res.status(404).json({ message: 'Transportation not found' });
        }


        if (seats > transportation.capacity) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Calculate the total price in cents (Stripe requires the amount in cents)
        const totalPrice = transportation.price * seats;
        const amountInCents = Math.round(totalPrice * 100);

        // Create a payment intent with Stripe
        let paymentIntent;
        try {
            paymentIntent = await stripe.paymentIntents.create({
                amount: amountInCents,
                currency: 'usd',
                payment_method: paymentMethodId,
                confirm: true,
            });
        } catch (error) {
            return res.status(500).json({ message: 'Payment failed', error: error.raw.message });
        }

        // Check if payment succeeded
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ message: 'Payment failed', paymentIntent });
        }

        // Deduct the number of seats booked from the transportation capacity
        transportation.capacity -= seats;
        await transportation.save();

        // Create a new booking
        const booking = new transportBook({
            tourist: tourist._id,
            transportation: transportation._id,
            method: transportation.method,
            seatsBooked: seats,
            totalPrice,
            paymentIntentId: paymentIntent.id, // Store Stripe payment intent ID
        });

        // Save the booking
        const savedBooking = await booking.save();

        // Send a booking receipt email
        const mailOptions = {
            from: 'explora.donotreply@gmail.com', // Sender address
            to: touristEmail, // Dynamic email based on the tourist's record
            subject: 'Transportation Booking Receipt',
            text: `Dear ${tourist.username},\n\nYour transportation has been successfully booked!\n\nDetails:\n- Transportation Method: ${transportation.method}\n- Origin: ${transportation.origin}\n- Destination: ${transportation.destination}\n- Seats: ${seats}\n- Price: ${totalPrice} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({
            message: 'Transportation booked successfully',
            bookingDetails: savedBooking,
            paymentDetails: paymentIntent,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error booking transportation', error: err.message });
    }
});

//============================================================


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
