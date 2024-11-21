const mongoose = require("mongoose");
const WishList = require("../models/wishList");

// ADD product to wishlist

const addToWishlist = async (req, res) => {
    const { productId, id } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const wishlist = await WishList.findOne({ userId: id });
        if (!wishlist) {
            wishlist = new WishList({ userId: req.user._id });
        }

        wishlist.products.push(product);

        await wishlist.save();

        res.status(201).json(wishlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
