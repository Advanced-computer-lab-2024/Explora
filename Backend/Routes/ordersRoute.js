const express = require("express");
const router = express.Router();

const {
    checkoutOrder,
    processPayment,
    checkoutAndPay
} = require("../controllers/ordersController");

// POST - Checkout an order

router.post("/checkout/:touristId", checkoutOrder);
// POST - process payment request
router.post('/payment', processPayment);

// POST - Checkout and pay for an order

router.post("/checkoutAndPay", checkoutAndPay);

module.exports = router;