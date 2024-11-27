const Cart = require('../models/cart');
const Orders = require('../models/orders');
const Product = require('../models/Products'); // To fetch product details
const Address = require('../models/Address'); // To fetch address details

const checkoutOrder = async (req, res) => {
    try {
        const { touristId } = req.params; // Tourist ID from request parameters
        const { addressId } = req.body; // Address ID (reference to the Address model)

        // Fetch the cart to get all items and the total price
        const cart = await Cart.findOne({ user: touristId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        // Fetch the products' details and calculate the total price
        const products = cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        const totalPrice = cart.totalPrice; // Or calculate the price manually if needed

        // Fetch the address details using the addressId
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Create the order with the address reference
        const order = new Orders({
            userId: touristId,
            products: products,
            totalPrice: totalPrice,
            orderStatus: 'pending',
            deliveryAddress: addressId, // Store the address ID reference
        });

        // Save the order
        await order.save();

        // Optionally, clear the cart after checkout
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order });

    } catch (error) {
        console.error('Error during checkout:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {checkoutOrder, };