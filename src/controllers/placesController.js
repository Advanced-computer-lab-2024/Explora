// controllers/placesController.js

const Place = require('../models/placesModel');

// Create a new place
const createPlace = async (req, res) => {
  try {
    const { name, category, tags } = req.body;
    const newPlace = new Place({ name, category, tags });
    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/placesController.js


// Controller to search for places by name, category, or tag
const searchPlaces = async (req, res) => {
  try {
    const { query } = req.query; // The search term

    // Define a search filter
    const filter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },        // Search by name (case-insensitive)
        { category: { $regex: query, $options: 'i' } },    // Search by category (case-insensitive)
        { tags: { $regex: query, $options: 'i' } }         // Search by tags (case-insensitive)
      ]
    };

    const places = await Place.find(filter);

    // If no places are found
    if (places.length === 0) {
      return res.status(404).json({ message: "No places found for the given search criteria." });
    }

    // Return found places
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchPlaces };


// Get all places
const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a place by ID
const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a place by ID
const updatePlace = async (req, res) => {
  try {
    const { name, category, tags } = req.body;
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      { name, category, tags },
      { new: true, runValidators: true }
    );

    if (!updatedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a place by ID
const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  searchPlaces,
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace
};
