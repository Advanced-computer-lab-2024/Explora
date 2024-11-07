const express = require("express");
const router = express.Router();
const { authenticateUser } = require('../middleware/AuthMiddleware'); // Adjust the path as necessary

const {
    addTourismGovernorAccount,
    getAllGovernors,
    changePassword
} = require("../controllers/GovernorController");

router.post("/", addTourismGovernorAccount);
router.get("/", getAllGovernors);
router.put("/change-password", changePassword);

module.exports = router;
