require('dotenv').config();
const express = require('express');
const router = express.Router();
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

// City search suggestions
router.get(`/search`, async (req, res) => {
  const { keyword } = req.query;
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.city,
    });
    console.log("Search response:", response.body); // Debug log
    res.json(JSON.parse(response.body));
  } catch (err) {
    console.error("Error in /search route:", err);
    res.status(500).json({ error: "Failed to fetch city suggestions." });
  }
});

// Hotel search
router.get(`/hotels`, async (req, res) => {
    const {cityCode} = req.query; // Get query parameters
    try {
        const response = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode: cityCode  // Use the cityCode from the request or default to 'PAR'
        });

        // Log the response to the console (for debugging purposes)
        console.log(response.data); // Use response.data to access the response body

        // Send the response data back to the client
        res.json(response.data); // Return the data to the client
    } catch (err) {
        console.error(err); // Log the error to the console
        res.status(err.status || 500).json({ error: err.message }); // Return error response
    }
});

// Define the route
router.get(`/offers`, async (req, res) => {
  try {
    const { hotelIds, adults, checkInDate, checkOutDate } = req.query;

    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: hotelIds ,  // default value if not provided
      adults: adults ,
      checkInDate: checkInDate ,
      checkOutDate: checkOutDate 
    });
    
    res.json(response);  // Send the response to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching hotel offers' });
  }
});


// Assuming you're using Express.js
router.post('/book', async (req, res) => {
  try {
    // 1. Get the input from the request body
    const {
      cityCode,
      checkInDate,
      checkOutDate,
      guests,
      paymentMethod,
      cardDetails,
    } = req.body;

    // 2. Hotel List API to get the list of hotels
    const hotelsList = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: cityCode, // e.g., 'DEL' for Delhi
    });

    // 3. Hotel Search API to get the price and offer id
    const pricingResponse = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: hotelsList.data[0].hotelId,
      adults: guests.length,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });

    // 4. Hotel Booking API to book the offer
    const bookingResponse = await amadeus.booking.hotelBookings.post(
      JSON.stringify({
        data: {
          offerId: pricingResponse.data[0].offers[0].id,
          guests: guests.map((guest, index) => ({
            id: index + 1,
            name: {
              title: guest.title,
              firstName: guest.firstName,
              lastName: guest.lastName,
            },
            contact: {
              phone: guest.contact.phone,
              email: guest.contact.email,
            },
          })),
          payments: [
            {
              id: 1,
              method: paymentMethod,
              card: {
                vendorCode: cardDetails.vendorCode,
                cardNumber: cardDetails.cardNumber,
                expiryDate: cardDetails.expiryDate,
              },
            },
          ],
        },
      })
    );

    // 5. Send the response back to the client
    res.status(200).json(bookingResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while booking the hotel.' });
  }
});

module.exports = router;
