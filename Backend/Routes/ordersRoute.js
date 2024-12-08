const express = require("express");
const router = express.Router();

const {
    checkoutOrder,
    processPayment,
    checkoutAndPay,
    viewOrders,
    cancelOrder,
    filterByStatus,
    viewAllOrders
} = require("../controllers/ordersController");


// GET - Get all orders for a specific tourist

router.get("/:touristId", viewOrders);

// POST - Checkout an order

router.post("/checkout/:touristId", checkoutOrder);
// POST - process payment request
router.post('/payment', processPayment);

// POST - Checkout and pay for an order

router.post("/checkoutAndPay", checkoutAndPay);



// PUT - Cancel an order

router.put("/cancel/:orderId", cancelOrder);

// GET - Filter orders by status

router.get("/filterByStatus/:touristId", filterByStatus);

// GET - View all orders for a specific tourist

router.get("/", viewAllOrders);


module.exports = router;