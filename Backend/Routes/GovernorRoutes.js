const express = require("express");
const router = express.Router();

const {
    addTourismGovernorAccount,
    getAllGovernors,
    createMuseum,
    getAllMuseums,
    getMuseumById,
    updateMuseum,
    deleteMuseum,
    getTicketPrice, 
    updateMuseumByName,
    getMuseumByName,
    deleteMuseumByName
} = require("../controllers/GovernorController");


router.post("/", addTourismGovernorAccount);
router.get("/", getAllGovernors);
router.post('/museums', createMuseum);
router.get('/museums', getAllMuseums);
router.get('/museums/:name', getMuseumByName);
router.put('/museums/:name', updateMuseumByName);
router.delete('/museums/:name', deleteMuseumByName);
router.get('/museums/ticket-price/:name', getTicketPrice); 

module.exports = router;
