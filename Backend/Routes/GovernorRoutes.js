const express = require("express");
const router = express.Router();
const { requireAuth } = require('../middleware/AuthMiddleware'); // Adjust the path as necessary

const {
    addTourismGovernorAccount,
    getAllGovernors,
    changePassword
} = require("../controllers/GovernorController");

router.post("/", addTourismGovernorAccount);
router.get("/", getAllGovernors);
router.put("/change-password", requireAuth, changePassword);

module.exports = router;
