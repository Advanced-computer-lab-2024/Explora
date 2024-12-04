// Load environment variables
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Amadeus = require('amadeus');
const bodyParser = require('body-parser');
const FlightTicket = require('../models/flighTicket');
const TouristPromoCode = require('../models/touristPromoCode');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const endpointSecret = 'whsec_52b23ec75522e398292677638442b21811b913f1dc3feab78a121021bd3e2ce6';
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or another email service
  auth: {
    user: 'explora.donotreply@gmail.com', // Replace with your email
    pass: 'goiz pldj kpjy clsh'  // Use app-specific password if necessary
  }
});

router.get(`/city-and-airport-search/:parameter`, (req, res) => {
  const parameter = req.params.parameter;
  // Which cities or airports start with the parameter variable
  amadeus.referenceData.locations
      .get({
          keyword: parameter,
          subType: Amadeus.location.any,
      })
      .then(function (response) {
          res.send(response.result);
      })
      .catch(function (response) {
          res.send(response);
      });
});

const flightCache = {}; // Temporary in-memory storage

//http:'localhost:4000/flights/flight-search?originCode=JFK&destinationCode=LAX&dateOfDeparture=2022-12-01
router.get(`/flight-search`, (req, res) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture;

  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: originCode,
    destinationLocationCode: destinationCode,
    departureDate: dateOfDeparture,
    adults: '1',
    max: '10'
  })
    .then(function (response) {
      // Store results in cache with a unique key (e.g., based on timestamp or session ID)
      const searchId = Date.now().toString(); // Unique identifier for the current search
      flightCache[searchId] = response.result.data;

      // Send the search results along with the searchId
      res.status(200).json({ searchId, flights: response.result.data });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});


//===================================

// http://localhost:4000/flights/bookStripe
// router.post('/bookStripe', async (req, res) => {
//     const { touristId, searchId, flightId, paymentMethodId } = req.body;
  
//     try {
//       // Find the tourist user
//       const tourist = await User.findById(touristId);
//       if (!tourist || tourist.role !== 'Tourist') {
//         return res.status(400).json({ message: 'Invalid tourist user' });
//       }

//       const touristEmail = tourist.email; // Get the tourist's email dynamically
  
//       // Check if the flight is in the cache using the searchId and flightId
//       const cachedFlights = flightCache[searchId];  // Get flights based on searchId
  
//       if (!cachedFlights) {
//         return res.status(404).json({ message: 'No flights found for this searchId' });
//       }
  
//       const selectedFlight = cachedFlights.find(flight => flight.id === flightId);
  
//       if (!selectedFlight) {
//         return res.status(404).json({ message: 'Flight not found in this search results' });
//       }
  
//       // Check if the user has already booked the selected flight
//       const existingBooking = await FlightTicket.findOne({
//         tourist: touristId,
//         flightNumber: `${selectedFlight.itineraries[0].segments[0].departure.iataCode}${selectedFlight.itineraries[0].segments[0].arrival.iataCode}${flightId}`
//       });
  
//       if (existingBooking) {
//         return res.status(400).json({ message: 'You have already booked this flight' });
//       }
//       if (!paymentMethodId) {
//         return res.status(400).json({ message: 'Payment method ID is required' });
//     }
  
//       // Extract flight details
//       const flightSegment = selectedFlight.itineraries[0].segments[0];
//       const origin = flightSegment.departure.iataCode;
//       const destination = flightSegment.arrival.iataCode;
//       const date = flightSegment.departure.at;
//       const flightNumber = `${origin}${destination}${flightId}`;  // Generate flight number from origin, destination, and flightId
//       const time = flightSegment.departure.at;  // Assuming this is the departure time
//       const duration = selectedFlight.itineraries[0].duration;  // Duration from itineraries
//       const arrivalTime = flightSegment.arrival.at;  // Arrival time
//       // Calculate the total price in cents (Stripe requires the amount in cents)
//       const price = selectedFlight.price.total; // Ensure this path is correct based on your object structure

//       const amountInCents = Math.round(price * 100);
      
//    // Create a payment intent with Stripe
//    try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amountInCents,
//       currency: 'usd',
//       payment_method: paymentMethodId,
//       confirm: true,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: 'Payment failed', error: error.raw.message });
//   }
//       // Check if payment succeeded
//     if (paymentIntent.status !== 'succeeded') {
//       return res.status(400).json({ message: 'Payment failed', paymentIntent });
//     }
//       // Create a new flight booking
//       const flightTicket = new FlightTicket({
//         tourist: touristId,
//         origin,
//         destination,
//         date,
//         flightNumber,
//         time,
//         duration,
//         arrivalTime,
//         price: selectedFlight.price.total,
//         paymentIntentId: paymentIntent.id // Store the Stripe payment intent ID for reference
//       });
  
//       // Save the booking
//       const savedFlightTicket = await flightTicket.save();
//            // Send a payment receipt email to the tourist's email
//     const mailOptions = {
//       from: 'explora.donotreply@gmail.com', // Sender address
//       to: touristEmail,            // Dynamic email based on the tourist's record
//       subject: 'Flight Booking Receipt',
//       text: `Dear ${tourist.username},\n\nYour flight has been successfully booked!\n\nDetails:\n- Flight Number: ${flightNumber}\n- Origin: ${origin}\n- Destination: ${destination}\n- Date: ${date}\n- Time: ${time}\n- Duration: ${duration}\n- Price: ${selectedFlight.price.total} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora`
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });
//       // Respond with the booking confirmation
//       res.status(201).json({
//         message: 'Flight booked successfully',
//         bookingDetails: savedFlightTicket,
//         paymentDetails: paymentIntent
//       });
  
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Error booking flight', error: err.message });
//     }
//   }); 
//===================================
//http://localhost:4000/flights/bookStripe
router.post('/bookStripe', async (req, res) => {
  const { touristId, searchId, flightId, frontendUrl } = req.body;

  try {
    console.log("Received frontend URL:", frontendUrl); // Log the frontend URL for debugging

    if (!frontendUrl) {
      return res.status(400).json({ message: 'Frontend URL is required' });
    }

    // Find the tourist user
    const tourist = await User.findById(touristId);
    if (!tourist || tourist.role !== 'Tourist') {
      return res.status(400).json({ message: 'Invalid tourist user' });
    }

    const touristEmail = tourist.email; // Get the tourist's email dynamically

    // Check if the flight is in the cache using the searchId and flightId
    const cachedFlights = flightCache[searchId];  // Get flights based on searchId

    if (!cachedFlights) {
      return res.status(404).json({ message: 'No flights found for this searchId' });
    }

    const selectedFlight = cachedFlights.find(flight => flight.id === flightId);

    if (!selectedFlight) {
      return res.status(404).json({ message: 'Flight not found in this search results' });
    }

    // Check if the user has already booked the selected flight
    const existingBooking = await FlightTicket.findOne({
      tourist: touristId,
      flightNumber: `${selectedFlight.itineraries[0].segments[0].departure.iataCode}${selectedFlight.itineraries[0].segments[0].arrival.iataCode}${flightId}`
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this flight' });
    }

    // Extract flight details
    const flightSegment = selectedFlight.itineraries[0].segments[0];
    const origin = flightSegment.departure.iataCode;
    const destination = flightSegment.arrival.iataCode;
    const date = flightSegment.departure.at;
    const flightNumber = `${origin}${destination}${flightId}`;  // Generate flight number from origin, destination, and flightId
    const time = flightSegment.departure.at;  // Assuming this is the departure time
    const duration = selectedFlight.itineraries[0].duration;  // Duration from itineraries
    const arrivalTime = flightSegment.arrival.at;  // Arrival time

    // Calculate the total price in cents (Stripe requires the amount in cents)
    const price = selectedFlight.price.total; // Ensure this path is correct based on your object structure
    const amountInCents = Math.round(price * 100);

    // Create a payment intent with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Flight from ${origin} to ${destination}`,
              description: `${flightNumber}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/book-flight?session_id={CHECKOUT_SESSION_ID}`, // Including session ID in URL
      cancel_url: `${frontendUrl}/cancel`,
      metadata: {
        touristId,
        flightId,
        searchId,
        origin,
        destination,
        flightNumber,
      },
    });

    // Send the session URL back to frontend to redirect user
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ message: 'Error creating checkout session', error: err.message });
  }
});

// Handle Stripe Webhook (to confirm payment)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  console.log('Raw body type:', typeof req.body); // Should be "object" or "string"
    console.log('Raw body content:', req.body);    // Should be a Buffer or string
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Use the raw body and verify the signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log(`✅ Verified event: ${event.type}`);
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle specific event types
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log('💳 Checkout Session Completed:', session);

    if (session.payment_status === 'paid') {
      const { touristId, flightId, searchId } = session.metadata;

      try {
        // Your existing booking processing logic
        const tourist = await User.findById(touristId);
        if (!tourist || tourist.role !== 'Tourist') {
          throw new Error('Invalid tourist data');
        }

        const cachedFlights = flightCache[searchId];
        if (!cachedFlights) {
          throw new Error('No flights found for the provided searchId');
        }

        const selectedFlight = cachedFlights.find(flight => flight.id === flightId);
        if (!selectedFlight) {
          throw new Error('Flight not found in cache');
        }

        const flightSegment = selectedFlight.itineraries[0].segments[0];
        const { departure, arrival } = flightSegment;
        const flightDetails = {
          origin: departure.iataCode,
          destination: arrival.iataCode,
          date: departure.at,
          flightNumber: `${departure.iataCode}${arrival.iataCode}${flightId}`,
          time: departure.at,
          duration: selectedFlight.itineraries[0].duration,
          arrivalTime: arrival.at,
          price: selectedFlight.price.total,
          paymentIntentId: session.payment_intent,
        };

        const flightTicket = new FlightTicket({
          ...flightDetails,
          tourist: touristId,
        });
        await flightTicket.save();

        console.log('🎟️ Flight ticket saved successfully:', flightTicket);

        await transporter.sendMail({
          from: 'explora.donotreply@gmail.com',
          to: tourist.email,
          subject: 'Flight Booking Confirmation',
          text: `Dear ${tourist.username},\n\nYour flight ${flightDetails.flightNumber} from ${flightDetails.origin} to ${flightDetails.destination} has been successfully booked!\n\nThank you for booking with us.`,
        });

        console.log('📧 Confirmation email sent to:', tourist.email);
        res.status(200).send('Booking confirmed!');
      } catch (err) {
        console.error(`❌ Error processing booking: ${err.message}`);
        res.status(500).send(`Error processing booking: ${err.message}`);
      }
    } else {
      console.warn('⚠️ Payment not successful');
      res.status(400).send('Payment not successful');
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
    res.status(400).send(`Unhandled event type: ${event.type}`);
  }
});


//=======================================================
// http://localhost:4000/flights/bookWallet
router.post('/bookWallet', async (req, res) => {
  const { touristId, searchId, flightId, promoCode } = req.body;

  try {
    // Find the tourist user
    const tourist = await User.findById(touristId);
    if (!tourist || tourist.role !== 'Tourist') {
      return res.status(400).json({ message: 'Invalid tourist user' });
    }

    const touristEmail = tourist.email; // Get the tourist's email dynamically

    // Check if the flight is in the cache using the searchId and flightId
    const cachedFlights = flightCache[searchId];  // Get flights based on searchId

    if (!cachedFlights) {
      return res.status(404).json({ message: 'No flights found for this searchId' });
    }

    const selectedFlight = cachedFlights.find(flight => flight.id === flightId);

    if (!selectedFlight) {
      return res.status(404).json({ message: 'Flight not found in this search results' });
    }

    // Check if the user has already booked the selected flight
    const existingBooking = await FlightTicket.findOne({
      tourist: touristId,
      flightNumber: `${selectedFlight.itineraries[0].segments[0].departure.iataCode}${selectedFlight.itineraries[0].segments[0].arrival.iataCode}${flightId}`
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this flight' });
    }

    // Check if the user has enough wallet balance
    if (!tourist.wallet || tourist.wallet < selectedFlight.price.total) {
      return res.status(400).json({ message: 'You do not have enough credits in your wallet to book this flight' });
    }

    // Initialize price to full price
    let discountedPrice = selectedFlight.price.total;

    // Check if promo code exists and is valid
    if (promoCode) {
      const promoCodeRecord = await TouristPromoCode.findOne({ tourist: touristId, code: promoCode });

      if (!promoCodeRecord) {
        return res.status(400).json({ message: 'Invalid or expired promo code' });
      }

      // Apply the promo code discount
      const discountAmount = promoCodeRecord.discount * discountedPrice;
      discountedPrice = selectedFlight.price.total - discountAmount;

      // Ensure discounted price is valid
      if (discountedPrice < 0) {
        return res.status(400).json({ message: 'Discounted price is invalid' });
      }

      // Deduct the discounted price from the tourist's wallet
      tourist.wallet -= discountedPrice;
      await tourist.save(); // Save the updated tourist

      // Delete the promo code since it's used
      await TouristPromoCode.deleteOne({ tourist: touristId, code: promoCode });
    } else {
      // If no promo code, deduct full price
      tourist.wallet -= selectedFlight.price.total;
      await tourist.save(); // Save the updated tourist
    }

    // Extract flight details
    const flightSegment = selectedFlight.itineraries[0].segments[0];
    const origin = flightSegment.departure.iataCode;
    const destination = flightSegment.arrival.iataCode;
    const date = flightSegment.departure.at;
    const flightNumber = `${origin}${destination}${flightId}`;  // Generate flight number from origin, destination, and flightId
    const time = flightSegment.departure.at;  // Assuming this is the departure time
    const duration = selectedFlight.itineraries[0].duration;  // Duration from itineraries
    const arrivalTime = flightSegment.arrival.at;  // Arrival time

    // Create a new flight booking using the discounted price
    const flightTicket = new FlightTicket({
      tourist: touristId,
      origin,
      destination,
      date,
      flightNumber,
      time,
      duration,
      arrivalTime,
      price: discountedPrice  // Use discounted price here
    });

    // Save the booking
    const savedFlightTicket = await flightTicket.save();

    // Send a payment receipt email to the tourist's email
    const mailOptions = {
      from: 'explora.donotreply@gmail.com', // Sender address
      to: touristEmail,            // Dynamic email based on the tourist's record
      subject: 'Flight Booking Receipt',
      text: `Dear ${tourist.username},\n\nYour flight has been successfully booked!\n\nDetails:\n- Flight Number: ${flightNumber}\n- Origin: ${origin}\n- Destination: ${destination}\n- Date: ${date}\n- Time: ${time}\n- Duration: ${duration}\n- Price: ${discountedPrice} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Respond with the booking confirmation, including discounted price
    res.status(201).json({
      message: 'Flight booked successfully',
      bookingDetails: savedFlightTicket,
      discountedPrice: discountedPrice
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error booking flight', error: err.message });
  }
});



//=======================================================


// Route to get all flights booked by a specific user (tourist)
//http://localhost:4000/flights/user-flights/:touristId
router.get('/user-flights/:touristId', async (req, res) => {
  const { touristId } = req.params;

  try {
    // Find all flights where the 'tourist' field matches the touristId
    const userFlights = await FlightTicket.find({ tourist: touristId });

    if (!userFlights || userFlights.length === 0) {
      return res.status(404).json({ message: 'No flights found for this user.' });
    }

    res.status(200).json({ flights: userFlights });
  } catch (error) {
    console.error('Error fetching user flights:', error);
    res.status(500).json({ message: 'Error retrieving flights', error: error.message });
  }
});

module.exports = router;