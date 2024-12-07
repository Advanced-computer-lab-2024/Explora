const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Product = require('../models/Products'); // Import Product model to fetch product price

//get my cart 

const getMyCart = async (req, res) => {
    const { touristId } = req.params; // Tourist ID from request parameters

    try {
        // Fetch the cart for the given tourist
        const cart = await Cart.findOne({ user: touristId }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Calculate the total price of the cart
        const totalPrice = cart.items.reduce((acc, item) => acc + item.itemPrice, 0);

        // Return the cart items and total price
        res.json({ cartItems: cart.items, totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const addToCart = async (req, res) => {
    try {
        const { touristId } = req.params; // Tourist ID from request parameters
        const { productId } = req.body; // Product ID from request body
        console.log('Received request:', req.body); // Log the incoming request body to see the data sent from the frontend
        const quantity = 1; // Default quantity to add (can be changed if needed)

        // Fetch the product to get its price
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productPrice = product.price;

        // Check if the tourist has a cart
        let cart = await Cart.findOne({ user: touristId });

        // If the cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ user: touristId, items: [], totalPrice: 0 });
        }

        // Check if the product is already in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId.toString());

        if (existingItem) {
            // If the product is already in the cart, update the quantity and itemPrice
            existingItem.quantity += quantity;
            existingItem.itemPrice = existingItem.quantity * productPrice;
        } else {
            // Otherwise, add the new product to the cart
            cart.items.push({
                productId,
                quantity,
                itemPrice: quantity * productPrice, // Calculate itemPrice
            });
        }

        // Update the totalPrice for the cart
        cart.totalPrice = cart.items.reduce((total, item) => total + item.itemPrice, 0);

        // Save the updated cart
        await cart.save();

        res.status(201).json({ message: 'Product added to cart', cart });

    } catch (error) {
        console.error('Error adding to cart:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// remove the item from the cart

const removeItem = async (req, res) => {
    try {
        const { touristId } = req.params; // Tourist ID from request parameters
        const { productId } = req.body; // Product ID from request body

        // Fetch the product by its ID to get its price
        const product = await Product.findById(productId); // Use findById to get a single product
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the cart of the tourist
        const cart = await Cart.findOne({ user: touristId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Calculate the price of the item to be removed
        const itemToRemove = cart.items.find(item => item.productId.toString() === productId.toString());
        if (!itemToRemove) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Subtract the price of the item to be removed from the total price
        cart.totalPrice -= itemToRemove.itemPrice;

        // Remove the product from the cart
        cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Product removed from cart', cart });
        
    } catch (error) {
        console.error('Error removing item from cart:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// update the quantity of the item in the cart

const updateQuantity = async (req, res) => {
    try {
        const { touristId } = req.params; // Tourist ID from request parameters
        const { productId, quantity } = req.body; // Product ID and new quantity from request body

        // Fetch the product details to get the price
        const product = await Product.findById(productId); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the cart of the tourist
        const cart = await Cart.findOne({ user: touristId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the item in the cart that needs updating
        const itemToUpdate = cart.items.find(item => item.productId.toString() === productId.toString());
        if (!itemToUpdate) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // If quantity is zero, remove the product from the cart
        if (quantity == 0) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());
        } else if (quantity > 0) {
            // If the quantity is positive, update the item's quantity and item price
            itemToUpdate.quantity = quantity;
            itemToUpdate.itemPrice = quantity * product.price;
        } else {
            // If quantity is less than 0, prevent the update
            return res.status(400).json({ message: 'Quantity cannot be less than 0' });
        }

        // If the cart has no items left, reset totalPrice to 0
        if (cart.items.length === 0) {
            cart.totalPrice = 0;
        } else {
            // Recalculate the total price of the cart if there are still items
            cart.totalPrice = cart.items.reduce((total, item) => total + item.itemPrice, 0);
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Product quantity updated', cart });

    } catch (error) {
        console.error('Error updating product quantity:', error.message);
        res.status(500).json({ error: error.message });
    }
};



module.exports = { getMyCart, addToCart, removeItem, updateQuantity};

