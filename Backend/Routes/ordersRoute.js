const express = require("express");
const router = express.Router();

const {
    checkoutOrder,
    viewOrders,
    viewOrderDetails,   
    cancelOrder,
    viewWallet
} = require("../controllers/ordersController");

// POST - Checkout an order

router.post("/checkout/:touristId", checkoutOrder);
router.get('/:touristId/orders', viewOrders);
router.get('/:touristId/orders/:orderId', viewOrderDetails);
router.patch('/:touristId/orders/:orderId/cancel', cancelOrder);
router.get('/:touristId/wallet', viewWallet);


module.exports = router;