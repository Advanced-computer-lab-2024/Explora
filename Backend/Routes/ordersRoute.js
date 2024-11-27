const express = require("express");
const router = express.Router();

const {
    checkoutOrder,
} = require("../controllers/ordersController");

// POST - Checkout an order

router.post("/checkout/:touristId", checkoutOrder);

module.exports = router;