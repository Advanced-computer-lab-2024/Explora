const express = require("express");
const router = express.Router();
const {
    addToWishlist, 
    getWishlist, 
    deleteFromWishlist,
    toggleWishlist
} = require('../controllers/WishListController');

// POST - Add an item to the wishlist

router.post("/add/:touristId", addToWishlist);

// GET - Get the wishlist

router.get("/:touristId", getWishlist);

// DELETE - Delete an item from the wishlist

router.delete("/delete/:touristId/:productId", deleteFromWishlist);

// POST - Toggle the wishlist status

router.post("/toggle", toggleWishlist);



module.exports = router;