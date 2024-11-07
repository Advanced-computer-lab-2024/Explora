// Load environment variables
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Amadeus = require('amadeus');
// Destructure environment variables
//const { AMADEUS_API_KEY, AMADEUS_API_SECRET } = process.env;
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

router.get(`/flight-search`, (req, res) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture
  // Find the cheapest flights
  amadeus.shopping.flightOffersSearch.get({
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate: dateOfDeparture,
      adults: '1',
      max: '7'
  }).then(function (response) {
      res.send(response.result);
  }).catch(function (response) {
      res.send(response);
  });
  });
 

  router.post(`/flight-confirmation`, (req, res) => {
    const flight = req.body.flight
    // Confirm availability and price
    amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
            'data': {
                'type': 'flight-offers-pricing',
                'flightOffers': [flight],
            }
        })
    ).then(function (response) {
            res.send(response.result);
        }).catch(function (response) {
            res.send(response)
        })
})

router.post(`/flight-booking`, (req, res) => {
  // Book a flight
  const flight = req.body.flight;
  const travelers = req.body.travelers; // Get travelers info from the request body

  // Ensure the flight and travelers data are provided
  if (!flight || !Array.isArray(travelers) || travelers.length === 0) {
    return res.status(400).send({ error: 'Missing flight or travelers information' });
  }

  amadeus.booking.flightOrders.post(
    JSON.stringify({
      'data': {
        'type': 'flight-order',
        'flightOffers': [flight],
        'travelers': travelers // Use the travelers data from the request body
      }
    })
  ).then(function (response) {
    res.send(response.result);
  }).catch(function (error) {
    res.status(500).send(error);
  });
});



module.exports = router; // Export the router
