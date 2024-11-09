// Load environment variables
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Amadeus = require('amadeus');
const FlightTicket = require('../models/flightTicket');
const User = require('../models/User');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
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


router.get(`/flight-search`, (req, res) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture;

  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: originCode,
    destinationLocationCode: destinationCode,
    departureDate: dateOfDeparture,
    adults: '1',
    max: '7'
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


 
router.post('/book', async (req, res) => {
  const { touristId, searchId, flightId, cardNumber, cvv, cardExpiryDate } = req.body;

  try {
    // Find the tourist user
    const tourist = await User.findById(touristId);
    if (!tourist || tourist.role !== 'Tourist') {
      return res.status(400).json({ message: 'Invalid tourist user' });
    }

    // Validate payment details
    if (!/^\d{16}$/.test(cardNumber) || !/^\d{3}$/.test(cvv) || !/^\d{2}\/\d{2}$/.test(cardExpiryDate)) {
      return res.status(400).json({ message: 'Invalid payment details' });
    }

    // Check if the flight is in the cache using the searchId and flightId
    const cachedFlights = flightCache[searchId];  // Get flights based on searchId

    if (!cachedFlights) {
      return res.status(404).json({ message: 'No flights found for this searchId' });
    }

    const selectedFlight = cachedFlights.find(flight => flight.id === flightId);

    if (!selectedFlight) {
      return res.status(404).json({ message: 'Flight not found in this search results' });
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

    // Create a new flight booking
    const flightTicket = new FlightTicket({
      tourist: touristId,
      origin,
      destination,
      date,
      flightNumber,
      time,
      duration,
      arrivalTime,
      price: selectedFlight.price.total,
      cardNumber,
      cvv,
      cardExpiryDate
    });

    // Save the booking
    const savedFlightTicket = await flightTicket.save();

    // Respond with the booking confirmation
    res.status(201).json({
      message: 'Flight booked successfully',
      bookingDetails: savedFlightTicket
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error booking flight', error: err.message });
  }
});

// Route to get all flights booked by a specific user (tourist)
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


//   router.post(`/flight-confirmation`, (req, res) => {
//     const flight = req.body.flight
//     // Confirm availability and price
//     amadeus.shopping.flightOffers.pricing.post(
//         JSON.stringify({
//             'data': {
//                 'type': 'flight-offers-pricing',
//                 'flightOffers': [flight],
//             }
//         })
//     ).then(function (response) {
//             res.send(response.result);
//         }).catch(function (response) {
//             res.send(response)
//         })
// })

// router.post(`/flight-booking`, (req, res) => {
//   // Book a flight
//   const flight = req.body.flight;
//   const travelers = req.body.travelers; // Get travelers info from the request body

//   // Ensure the flight and travelers data are provided
//   if (!flight || !Array.isArray(travelers) || travelers.length === 0) {
//     return res.status(400).send({ error: 'Missing flight or travelers information' });
//   }

//   amadeus.booking.flightOrders.post(
//     JSON.stringify({
//       'data': {
//         'type': 'flight-order',
//         'flightOffers': [flight],
//         'travelers': travelers // Use the travelers data from the request body
//       }
//     })
//   ).then(function (response) {
//     res.send(response.result);
//   }).catch(function (error) {
//     res.status(500).send(error);
//   });
// });



module.exports = router; // Export the router
