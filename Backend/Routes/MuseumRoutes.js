const express = require("express");
const router = express.Router();

const {
    createMuseum,
    getAllMuseums,
    getTicketPrice, 
    updateMuseumById,
    getMuseumByName,
    filterMuseums,
    deleteMuseumById
} = require("../controllers/MuseumController");


router.get('/museums/filter', filterMuseums);
router.post('/', createMuseum);
router.get('/museums', getAllMuseums);
router.get('/:name', getMuseumByName);
router.put('/:id', updateMuseumById);  // Use '_id' instead of 'name'
router.delete('/:id', deleteMuseumById); // Use the correct route here
router.get('/museums/ticket-price/:name', getTicketPrice); 
module.exports = router;