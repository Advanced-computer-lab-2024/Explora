require('dotenv').config();
const express = require('express');
const router = express.Router();
const TouristPromoCode = require('../models/touristPromoCode');
const Amadeus = require('amadeus');
const User = require('../models/User'); // Adjust the path based on your project structure
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const HotelReservation = require('../models/hotelReservation');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or another email service
  auth: {
    user: 'explora.donotreply@gmail.com', // Replace with your email
    pass: 'goiz pldj kpjy clsh'  // Use app-specific password if necessary
  }
});
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});
const hotelCache = {}; // Temporary in-memory storage
const hotelOffersCache = {}; // Temporary in-memory storage


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

router.get('/A1', async (req, res) => {
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


// Hotel search METHOD A with simplified response
//http://localhost:4000/hotels/hotels?cityCode=NYC&checkInDate=2024-12-10&checkOutDate=2024-12-15
router.get(`/hotels`, async (req, res) => {
  const { cityCode, checkInDate, checkOutDate } = req.query;

  try {
    // Get hotel data from Amadeus API
    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: cityCode
    });

    const searchId = Date.now().toString(); // Unique identifier for the current search

    // Calculate the number of nights
    const checkin = new Date(checkInDate);
    const checkout = new Date(checkOutDate);
    if (checkin >= checkout) {
      return res.status(400).json({ error: "Check-in date must be before check-out date." });
    }
    const nights = Math.max(1, (checkout - checkin) / (1000 * 60 * 60 * 24)); // Minimum 1 night

    // Map the response to include only name, hotelId, checkinDate, checkOutDate, and calculated price
    const simplifiedHotels = response.data.map(hotel => {
      const pricePerNight = Math.floor(Math.random() * (190 - 40 + 1)) + 40;
      const totalPrice = pricePerNight * nights;
      return {
        name: hotel.name,
        hotelId: hotel.hotelId,
        checkInDate,
        checkOutDate,
        cityCode,
        price: `${totalPrice} $`,  // Use backticks for string interpolation
    };
    });

    // Slice the array to return only the first 7 results
    const limitedHotels = simplifiedHotels.slice(0, 7);

    hotelCache[searchId] = limitedHotels; // Store results with searchId

    // Send simplified results along with searchId to the client
    res.json({ searchId, hotels: limitedHotels });
  } catch (err) {
    console.error("Error in /hotels route:", err);
    res.status(err.status || 500).json({ error: err.message });
  }
});


//http://localhost:4000/hotels/bookWallet
router.post('/bookWallet', async (req, res) => {
  const { touristId, searchId, hotelId, promoCode } = req.body;

  try {
    // Find the tourist user
    const tourist = await User.findById(touristId);
    if (!tourist || tourist.role !== 'Tourist') {
      return res.status(400).json({ message: 'Invalid tourist user' });
    }
    const touristEmail = tourist.email; // Get the tourist's email dynamically

    // Check if the hotel is in the cache using the searchId and hotelId
    const cachedHotels = hotelCache[searchId]; // Get hotels based on searchId
    if (!cachedHotels) {
      return res.status(404).json({ message: 'No hotels found for this searchId' });
    }

    const selectedHotel = cachedHotels.find(hotel => hotel.hotelId === hotelId);
    if (!selectedHotel) {
      return res.status(404).json({ message: 'Hotel not found in this search results' });
    }

    let price = parseFloat(selectedHotel.price.replace('$', '').trim()); // Assuming price is a string with $ symbol
    console.log("Price:", price); // Debug log

    // Check if promo code exists and is valid
    if (promoCode) {
      const promoCodeRecord = await TouristPromoCode.findOne({ tourist: touristId, code: promoCode });

      if (!promoCodeRecord) {
        return res.status(400).json({ message: 'Invalid or expired promo code' });
      }

      // Apply the promo code discount
      const discountAmount = promoCodeRecord.discount * price;
      price = price - discountAmount;

      // Ensure discounted price is valid
      if (price < 0) {
        return res.status(400).json({ message: 'Discounted price is invalid' });
      }

      // Deduct the discounted price from the tourist's wallet
      tourist.wallet -= price;
      await tourist.save(); // Save the updated tourist

      // Delete the promo code since it's used
      await TouristPromoCode.deleteOne({ tourist: touristId, code: promoCode });
    } else {
      // If no promo code, deduct full price
      if (tourist.wallet < price || !tourist.wallet) {
        return res.status(400).json({ message: 'Insufficient funds in wallet' });
      }
      tourist.wallet -= price;
      await tourist.save();
    }

    // Extract hotel details
    const cityCode = selectedHotel.cityCode;
    const checkInDate = selectedHotel.checkInDate;
    const checkOutDate = selectedHotel.checkOutDate;
    const hotelName = selectedHotel.name;
    const reservationNumber = `${hotelId}-${touristId}-${Date.now()}`; // Unique reservation number

    // Create a new hotel booking
    const hotelReservation = new HotelReservation({
      tourist: touristId,
      cityCode,
      checkInDate,
      checkOutDate,
      hotelName,
      reservationNumber,
      price
    });

    // Save the booking
    const savedHotelReservation = await hotelReservation.save();

    // Send a payment receipt email to the tourist's email
    const mailOptions = {
      from: 'explora.donotreply@gmail.com', // Sender address
      to: touristEmail,            // Dynamic email based on the tourist's record
      subject: 'Hotel Reservation Receipt',
      text: `Dear ${tourist.username},\n\nYour hotel reservation has been successfully booked!\n\nDetails:\n- Reservation Number: ${reservationNumber}\n- City: ${cityCode}\n- Checkin Date: ${checkInDate}\n- Checkout Date: ${checkOutDate}\n- Hotel: ${hotelName}\n- Price: ${price} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Respond with the booking confirmation (omit sensitive fields)
    res.status(201).json({
      message: 'Hotel booked successfully',
      bookingDetails: {
        id: savedHotelReservation._id,
        tourist: savedHotelReservation.tourist,
        cityCode: savedHotelReservation.cityCode,
        checkInDate: savedHotelReservation.checkInDate,
        checkOutDate: savedHotelReservation.checkOutDate,
        hotelName: savedHotelReservation.hotelName,
        reservationNumber: savedHotelReservation.reservationNumber,
        price: `${savedHotelReservation.price} $`
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error booking hotel', error: err.message });
  }
});



//=======================================================
//http://localhost:4000/hotels/bookStripe
router.post('/bookStripe', async (req, res) => {
  const { touristId, searchId, hotelId, paymentMethodId } = req.body; // Include paymentMethodId

  try {
    // Find the tourist user
    const tourist = await User.findById(touristId);
    if (!tourist || tourist.role !== 'Tourist') {
      return res.status(400).json({ message: 'Invalid tourist user' });
    }
    const touristEmail = tourist.email; // Get the tourist's email dynamically

    // Check if the hotel is in the cache using the searchId and hotelId
    const cachedHotels = hotelCache[searchId]; // Get hotels based on searchId
    if (!cachedHotels) {
      return res.status(404).json({ message: 'No hotels found for this searchId' });
    }

    const selectedHotel = cachedHotels.find(hotel => hotel.hotelId === hotelId);
    if (!selectedHotel) {
      return res.status(404).json({ message: 'Hotel not found in this search results' });
    }

    // Extract hotel details
    const cityCode = selectedHotel.cityCode;
    const checkInDate = selectedHotel.checkInDate;
    const checkOutDate = selectedHotel.checkOutDate;
    const hotelName = selectedHotel.name;
    const reservationNumber = `${hotelId}-${touristId}-${Date.now()}`; // Unique reservation number
    const price = parseFloat(selectedHotel.price.replace('$', '')); // Ensure price is a number

    // Check if paymentMethodId exists (for Stripe)
    if (!paymentMethodId) {
      return res.status(400).json({ message: 'Payment method ID is required' });
    }

    // Create a payment intent with Stripe (ensure price is in cents)
    const amountInCents = Math.round(price * 100);  // Stripe accepts the amount in cents

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',  // Adjust based on your preferred currency
        payment_method: paymentMethodId,
        confirm: true,  // Automatically confirm the payment
      });

      // Check if the payment succeeded
      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ message: 'Payment failed', paymentIntent });
      }

    } catch (error) {
      return res.status(500).json({ message: 'Payment failed', error: error.raw.message });
    }

    // Create a new hotel booking
    const hotelReservation = new HotelReservation({
      tourist: touristId,
      cityCode,
      checkInDate,
      checkOutDate,
      hotelName,
      reservationNumber,
      price,
      paymentIntentId: paymentIntent.id  // Store paymentIntentId for reference

    });

    // Save the booking
    const savedHotelReservation = await hotelReservation.save();
     
      // Send a payment receipt email to the tourist's email
      const mailOptions = {
        from: 'explora.donotreply@gmail.com', // Sender address
        to: touristEmail,            // Dynamic email based on the tourist's record
        subject: 'Hotel Reservation Receipt',
        text: `Dear ${tourist.username},\n\nYour hotel reservation has been successfully booked!\n\nDetails:\n- Reservation Number: ${reservationNumber}\n- City: ${cityCode}\n- Checkin Date: ${checkInDate}\n- Checkout Date: ${checkOutDate}\n- Hotel: ${hotelName}\n- Price: ${price} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    // Respond with the booking confirmation (omit sensitive fields)
    res.status(201).json({
      message: 'Hotel booked successfully',
      bookingDetails: {
        id: savedHotelReservation._id,
        tourist: savedHotelReservation.tourist,
        cityCode: savedHotelReservation.cityCode,
        checkInDate: savedHotelReservation.checkInDate,
        checkOutDate: savedHotelReservation.checkOutDate,
        hotelName: savedHotelReservation.hotelName,
        reservationNumber: savedHotelReservation.reservationNumber,
        price: `${savedHotelReservation.price} $`
      },
      paymentDetails: paymentIntent  // Optionally include payment details
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error booking hotel', error: err.message });
  }
}
);

//=======================================================

// GET all hotel reservations for a specific user
//http://localhost:4000/hotels/reservations/:touristId
router.get('/reservations/:touristId', async (req, res) => {
  const { touristId } = req.params;

  try {
    // Find all reservations where the tourist field matches the given touristId
    const reservations = await HotelReservation.find({ tourist: touristId })
      .populate('tourist', 'username email') // Optionally populate tourist details
      .exec();

    if (reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this user' });
    }

    // Send the reservations as the response
    res.status(200).json({ reservations });
  } catch (err) {
    console.error("Error retrieving hotel reservations:", err);
    res.status(500).json({ message: 'Error retrieving reservations', error: err.message });
  }
});


// Hotel offer METHOD B
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
// router.post('/book', async (req, res) => {
//   try {
//     // 1. Get the input from the request body
//     const {
//       cityCode,
//       checkInDate,
//       checkOutDate,
//       guests,
//       paymentMethod,
//       cardDetails,
//     } = req.body;

//     // 2. Hotel List API to get the list of hotels
//     const hotelsList = await amadeus.referenceData.locations.hotels.byCity.get({
//       cityCode: cityCode, // e.g., 'DEL' for Delhi
//     });

//     // 3. Hotel Search API to get the price and offer id
//     const pricingResponse = await amadeus.shopping.hotelOffersSearch.get({
//       hotelIds: hotelsList.data[0].hotelId,
//       adults: guests.length,
//       checkInDate: checkInDate,
//       checkOutDate: checkOutDate,
//     });

//     // 4. Hotel Booking API to book the offer
//     const bookingResponse = await amadeus.booking.hotelBookings.post(
//       JSON.stringify({
//         data: {
//           offerId: pricingResponse.data[0].offers[0].id,
//           guests: guests.map((guest, index) => ({
//             id: index + 1,
//             name: {
//               title: guest.title,
//               firstName: guest.firstName,
//               lastName: guest.lastName,
//             },
//             contact: {
//               phone: guest.contact.phone,
//               email: guest.contact.email,
//             },
//           })),
//           payments: [
//             {
//               id: 1,
//               method: paymentMethod,
//               card: {
//                 vendorCode: cardDetails.vendorCode,
//                 cardNumber: cardDetails.cardNumber,
//                 expiryDate: cardDetails.expiryDate,
//               },
//             },
//           ],
//         },
//       })
//     );

//     // 5. Send the response back to the client
//     res.status(200).json(bookingResponse);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while booking the hotel.' });
//   }
// });

module.exports = router;