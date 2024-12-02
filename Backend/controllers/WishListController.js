const mongoose = require("mongoose");
const WishList = require("../models/wishList");

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
        const { id } = req.params;
        const wishlist = await WishList.findOne({ touristId: id }).populate('items.productId');
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
        const wishlist = await WishList.findOneAndUpdate(
            { touristId: id },
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

module.exports = { addToWishlist, getWishlist, deleteFromWishlist };
