const mongoose = require("mongoose");
const WishList = require("../models/wishList");

// ADD product to wishlist

const addToWishlist = async (req, res) => {
    const { touristId } = req.params;
    const { productId} = req.body;
  
    try {
      // Find the wishlist for the given tourist
      let wishlist = await WishList.findOne({ touristId });
  
      // If the wishlist doesn't exist, create a new one
      if (!wishlist) {
        wishlist = new WishList({ touristId, items: [] });
      }
  
      // Add the new product to the items list
      wishlist.items.push({ productId });
  
      // Save the updated wishlist
      await wishlist.save();
  
      res.status(201).json({ message: 'Product added to wishlist', wishlist });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
      };
// GET wishlist by user 

const getWishlist = async (req, res) => {
    try {
        const id = req.params;
        const wishlist = await WishList.findOne({ userId: id });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// DELETE product from wishlist

const deleteFromWishlist = async (req, res) => {
    const { productId, id } = req.params;
    try {
        const wishlist = await WishList.findOneAndDelete({ userId: id , productId: productId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addToWishlist, getWishlist, deleteFromWishlist };
