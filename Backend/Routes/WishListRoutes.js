const express = require("express");
const router = express.Router();
const {
    addToWishlist, 
    getWishlist, 
    deleteFromWishlist
} = require('../controllers/WishListController');

// POST - Add an item to the wishlist

router.post("/add/:touristId", addToWishlist);

// GET - Get the wishlist

router.get("/:id", getWishlist);

// DELETE - Delete an item from the wishlist

router.delete("/delete/:id/:productId", deleteFromWishlist);

module.exports = router;