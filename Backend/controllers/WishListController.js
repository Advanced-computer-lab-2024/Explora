const mongoose = require("mongoose");
const WishList = require("../models/wishList");
const jwt = require('jsonwebtoken');

// ADD product to wishlist

const addToWishlist = async (req, res) => {
    const { touristId } = req.params;
    const { productId} = req.body;
  
    try {
      let wishlist = await WishList.findOne({ touristId });
      if (!wishlist) {
        wishlist = new WishList({ touristId, items: [] });
      }
  
      wishlist.items.push({ productId });
      await wishlist.save();
  
      res.status(201).json({ message: 'Product added to wishlist', wishlist });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
      };

// GET wishlist by user 
const getWishlist = async (req, res) => {
    try {
        // Get the token from cookies
        const { touristId } = req.params; // Assuming the token is stored as 'token' in the cookies

        if (!touristId) {
            return res.status(401).json({ message: "No token found, please login" });
        }
        // Find the wishlist by userId
        const wishlist = await WishList.findOne({ touristId: touristId }).populate('items.productId');
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
    const { productId, touristId } = req.body;

    try {
        const wishlist = await WishList.findOneAndUpdate(
            { touristId: touristId },
            { $pull: { items: { productId: productId } } },
            { new: true } 
        );

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        res.status(200).json({
            message: "Product removed from wishlist",
            wishlist,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const toggleWishlist = async (req, res) => {
    const { productId, touristId } = req.body;

    try {
        // Find the user's wishlist
        const wishlist = await WishList.findOne({ touristId });

        if (!wishlist) {
            // If no wishlist exists, create a new one and add the product
            wishlist = new WishList({ touristId, items: [{ productId }] });
            await wishlist.save();

            return res.status(201).json({
                message: "Product added to wishlist",
                wishlist,
            });
        }

        // Check if the product already exists in the wishlist
        const productIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex === -1) {
            // Product is not in the wishlist, add it
            wishlist.items.push({ productId });
            await wishlist.save();

            return res.status(201).json({
                message: "Product added to wishlist",
                wishlist
            });
        } else {
            wishlist.items.splice(productIndex, 1);
            await wishlist.save();

            return res.status(200).json({
                message: "Product removed from wishlist",
                wishlist,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  

module.exports = { addToWishlist, getWishlist, deleteFromWishlist, toggleWishlist };
