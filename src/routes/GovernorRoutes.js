const express = require("express");
const router = express.Router();

const {
    getByTag,
    createMuseum,
    getAllMuseums,
    getTicketPrice, 
    updateMuseumByName,
    getMuseumByName,
    deleteMuseumByName
} = require("../controllers/GovernorController");


router.post('/museums', createMuseum);
router.get('/museums', getAllMuseums);
router.get('/museums/:name', getMuseumByName);
router.put('/museums/:name', updateMuseumByName);
router.delete('/museums/:name', deleteMuseumByName);
router.get('/museums/ticket-price/:name', getTicketPrice); 
router.get('/museums/tag', getByTag); 

module.exports = router;