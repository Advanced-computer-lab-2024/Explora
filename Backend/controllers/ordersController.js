const Cart = require('../models/cart');
const Orders = require('../models/orders');
const Product = require('../models/Products'); // To fetch product details
const Address = require('../models/Address'); // To fetch address details
const Tourist = require('../models/touristModel');


const checkoutOrder = async (req, res) => {
    try {
        const { touristId } = req.params;
        const { addressId, useWallet } = req.body;

        const cart = await Cart.findOne({ user: touristId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        const tourist = await Tourist.findById(touristId);
        let walletDeduction = 0;

        if (useWallet && tourist.wallet > 0) {
            walletDeduction = Math.min(tourist.wallet, cart.totalPrice);
            tourist.wallet -= walletDeduction;
            await tourist.save();
        }

        const remainingAmount = cart.totalPrice - walletDeduction;

        const order = new Orders({
            userId: touristId,
            products: cart.items.map(item => ({ productId: item.productId, quantity: item.quantity })),
            totalPrice: cart.totalPrice,
            paidWithWallet: walletDeduction,
            deliveryAddress: addressId,
            orderStatus: remainingAmount === 0 ? 'paid' : 'pending',
        });

        await order.save();

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({
            message: 'Order placed successfully',
            order,
            walletBalance: tourist.wallet,
        });
    } catch (error) {
        console.error('Error during checkout:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const viewOrders = async (req, res) => {
    try {
        const { touristId } = req.params;

        const orders = await Orders.find({ userId: touristId }).sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found' });
        }

        // Separate current and past orders
        const currentOrders = orders.filter(order => order.orderStatus === 'pending' || order.orderStatus === 'paid');
        const pastOrders = orders.filter(order => order.orderStatus !== 'pending' && order.orderStatus !== 'paid');

        res.status(200).json({ currentOrders, pastOrders });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ error: error.message });
    }
};


// View details of a specific order
const viewOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Orders.findById(orderId)
            .populate('products.productId', 'name price') // Populate product details
            .populate('deliveryAddress', 'street city country'); // Populate address details

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ 
            orderDetails: order, 
            orderStatus: order.orderStatus, 
            createdAt: order.createdAt, 
            updatedAt: order.updatedAt 
        });
    } catch (error) {
        console.error('Error fetching order details:', error.message);
        res.status(500).json({ error: error.message });
    }
};


// Cancel an order
const cancelOrder = async (req, res) => {
    try {
        const { touristId, orderId } = req.params;

        const order = await Orders.findOne({ _id: orderId, userId: touristId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.orderStatus !== 'pending') {
            return res.status(400).json({ message: 'Order cannot be canceled' });
        }

        // Update order status to canceled and set refund amount
        order.orderStatus = 'cancelled';
        order.refundAmount = order.totalPrice;
        await order.save();

        // Refund the wallet
        const tourist = await Tourist.findById(touristId);
        tourist.wallet += order.totalPrice;
        await tourist.save();

        res.status(200).json({
            message: 'Order canceled successfully',
            walletBalance: tourist.wallet,
            refundAmount: order.totalPrice,
        });
    } catch (error) {
        console.error('Error canceling order:', error.message);
        res.status(500).json({ error: error.message });
    }
};


// View wallet balance
const viewWallet = async (req, res) => {
    try {
        const { touristId } = req.params;

        const tourist = await Tourist.findById(touristId);

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        res.status(200).json({ 
            walletBalance: tourist.wallet, 
            refunds: tourist.walletRefunds || [] // Include details of refunds if tracked
        });
    } catch (error) {
        console.error('Error fetching wallet balance:', error.message);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    checkoutOrder,
    viewOrders,
    viewOrderDetails,
    cancelOrder,
    viewWallet,
};

