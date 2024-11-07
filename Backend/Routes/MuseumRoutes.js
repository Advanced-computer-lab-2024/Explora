const express = require("express");
const router = express.Router();

const {
    createMuseum,
    getAllMuseums,
    getTicketPrice, 
    updateMuseumByName,
    getMuseumByName,
    filterMuseums,
    getMuseumById,
    deleteMuseumByName
} = require("../controllers/MuseumController");


router.get('/museums/filter', filterMuseums);
router.post('/museums', createMuseum);
router.get('/museums', getAllMuseums);
router.get('/museums/:name', getMuseumByName);
router.put('/museums/:name', updateMuseumByName);
router.delete('/museums/:name', deleteMuseumByName);
router.get('/museums/id/:id', getMuseumById); // New route for getting by ID
router.get('/museums/ticket-price/:name', getTicketPrice); 
module.exports = router;