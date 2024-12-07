const express = require("express");
const router = express.Router();

const 
{
    addToCart,
    removeItem,
    updateQuantity,
    getMyCart


} = require('../controllers/cartController');

// GET - Get the cart of a specific tourist


// POST - Add an item to the cart

router.post("/add/:touristId", addToCart);

// DELETE - Remove an item from the cart

router.delete("/remove/:touristId", removeItem);

// PUT - Update the quantity of an item in the cart

router.put("/update/:touristId", updateQuantity);

// GET - Get the cart of a specific tourist
router.get("/:touristId", getMyCart);


module.exports = router;