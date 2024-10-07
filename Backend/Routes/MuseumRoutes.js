const express = require("express");
const router = express.Router();

const {
    createMuseum,
    getAllMuseums,
    getTicketPrice, 
    updateMuseumByName,
    getMuseumByName,
    filterMuseums,
    deleteMuseumByName
} = require("../controllers/MuseumController");

// Define routes for museum operations

// GET route to filter museums by name and/or tags
router.get('/filter', filterMuseums);

// POST route to create a new museum
router.post('/', createMuseum);

// GET route to retrieve all museums
router.get('/', getAllMuseums);

// GET route to retrieve a museum by name
router.get('/:name', getMuseumByName);

// PUT route to update a museum by name
router.put('/:name', updateMuseumByName);

// DELETE route to delete a museum by name
router.delete('/:name', deleteMuseumByName);

// GET route to retrieve ticket price for a specific visitor type
router.get('/ticket-price/:name', getTicketPrice);

module.exports = router;
