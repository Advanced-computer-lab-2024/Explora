const express = require("express");
const router = express.Router();

const {
    addTourismGovernorAccount,
    getAllGovernors,
    
} = require("../controllers/GovernorController");


router.post("/", addTourismGovernorAccount);
router.get("/", getAllGovernors);

module.exports = router;
