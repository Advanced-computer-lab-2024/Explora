const express = require('express');
const router = express.Router();
const Transportation = require('../models/transportation');
const mongoose = require('mongoose');
const axios =require('axios');
const EXCHANGE_RATE_API_KEY = 'bddd7e18d4adf92a570fd135';


router.post('/', async (req, res) => {
    // Destructure fields from the request body
    const { date, time, origin, destination, price, method, duration, capacity } = req.body;

    try {
        // Create a new Transportation document
        const newTransportation = new Transportation({
            date,
            time,
            origin,
            destination,
            price,
            method,
            duration,
            capacity,
        });

        // Save the new transportation record to the database
        const savedTransportation = await newTransportation.save();

        // Respond with the saved record
        res.status(201).json(savedTransportation);
    } catch (error) {
        // Handle any errors
        console.error('Error creating transportation record:', error);
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
  try {
      // Fetch all transportation records from the database
      const transportations = await Transportation.find();

      // Respond with the retrieved records
      res.status(200).json(transportations);
  } catch (error) {
      // Handle any errors
      console.error('Error fetching transportation records:', error);
      res.status(500).json({ message: error.message });
  }
});

router.get('/currency/:currency/:id', async (req, res) => {
    try {
      const { currency, id } = req.params;
  
      // Fetch the specified itinerary by ID
      const transportation = await Transportation.findById(id);
      if (!transportation) {
        return res.status(404).json({ message: 'Transportation not found' });
      }
  
      // Fetch exchange rates from the Exchange Rate API
      const ratesResponse = await axios.get(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`);
      const rates = ratesResponse.data.conversion_rates;
  
      // Check if the requested currency is available
      if (!rates[currency]) {
        return res.status(400).json({ message: 'Currency not supported' });
      }
  
      // Convert the price for the itinerary
      const convertedPrice = transportation.price * rates[currency]; // Convert to requested currency
  
      // Respond with the itinerary data and the converted price
      const response = {
        ...transportation.toObject(), // Spread the existing itinerary data
        price: convertedPrice.toFixed(2), // Round to 2 decimal places
        currency: currency // Add the currency to the response
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error fetching currency data:', error);
      res.status(500).json({ message: 'Server error while converting currency' });
    }
  });
  

 router.get('/currencyall/:currency', async (req, res) => {
    try {
        const { currency } = req.params;

        // Fetch all transportation records from the database
        const transportations = await Transportation.find();
        if (!transportations || transportations.length === 0) {
            return res.status(404).json({ message: 'No transportation records found' });
        }

        // Fetch exchange rates from the Exchange Rate API
        const ratesResponse = await axios.get(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`);
        const rates = ratesResponse.data.conversion_rates;

        // Check if the requested currency is available
        if (!rates[currency]) {
            return res.status(400).json({ message: 'Currency not supported' });
        }

        // Map over all transportations and convert the price for each
        const convertedTransportations = transportations.map(transportation => {
            const convertedPrice = transportation.price * rates[currency]; // Convert to requested currency

            // Return the transportation data with the converted price
            return {
                ...transportation.toObject(), // Spread the existing transportation data
                price: convertedPrice.toFixed(2), // Round to 2 decimal places
                currency: currency // Add the currency to the response
            };
        });

        // Respond with the converted transportation data
        res.json(convertedTransportations);
    } catch (error) {
        console.error('Error fetching currency data:', error);
        res.status(500).json({ message: 'Server error while converting currency' });
    }
});


module.exports = router;