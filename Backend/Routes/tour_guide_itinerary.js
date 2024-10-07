const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Tour_Guide_Itinerary');
const jwt = require('jsonwebtoken');


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

// Create a new itinerary
router.post('/', async (req, res) => {
  const {
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
    name,
    hasBookings,
    tags,rating
  } = req.body;

  try {
    // Create a new itinerary instance
    const newItinerary = new Itinerary({
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
      name,
      hasBookings,
      tags,rating
    });

    // Save the new itinerary to the database
    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({ message: 'Server error while creating itinerary', error: error.message });
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

module.exports = router;



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
router.get('/', async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.json(itineraries);
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
// GET all itineraries
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an itinerary
router.put('/:id', async (req, res) => {
  const {
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
    name,
    hasBookings, 
    tags,rating
  } = req.body;

  try {
    let itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ msg: 'Itinerary not found' });
    }

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
    itinerary.name = name || itinerary.name;
    itinerary.dropoffLocation = dropoffLocation || itinerary.dropoffLocation;
    itinerary.hasBookings = hasBookings || itinerary.hasBookings;
    itinerary.tags = tags || itinerary.tags;
    itinerary.rating = rating || itinerary.rating;
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



module.exports = router;