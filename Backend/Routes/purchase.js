const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Purchase = require('../models/Purchase'); // Import the Purchase model
const Sales = require('../models/Seller_Sales'); // Import the Seller Sales model
const User = require('../models/User'); // User model (Tourists)
const Product = require('../models/Products'); // Product model
const Notification = require('../models/Anotification2');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Using Gmail as the email service
    auth: {
      user: 'explora.donotreply@gmail.com',
      pass: 'goiz pldj kpjy clsh' // Use app-specific password if required
    },
    tls: {
      rejectUnauthorized: false, // This will allow self-signed certificates
    }
  });
  router.post('/purchase', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        console.log('Request body:', req.body);

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid Product ID format.' });
        }

        const tourist = await User.findById(userId);
        if (!tourist || tourist.role !== 'Tourist') {
            return res.status(403).json({ message: 'Only tourists can buy.' });
        }

        const product = await Product.findById(productId);
        console.log('Fetched Product:', product);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        

        const totalPrice = product.price * quantity;

        const purchase = new Purchase({
            tourist: tourist._id,
            product: product._id,
            quantity,
            totalPrice,
            seller: product.seller._id, // Use populated seller ID
        });
        await purchase.save();

        const sale = new Sales({
            seller: product.seller._id,
            productId: product._id,
            touristId: tourist._id,
            amount: totalPrice,
             
        });
        await sale.save();

        product.sales += quantity;
            product.quantity -= quantity;
            if (product.quantity < 0) product.quantity = 0; // Prevent negative values
            await product.save();
        if (product.quantity == 0) {
            // Create a notification for the seller
            await Notification.create({
                userId: product.seller._id,
                message: `Your product "${product.name}" is now out of stock.`,
                prodId: productId,
            });

            // Prepare email
            const mailOptions = {
                from: 'explora.donotreply@gmail.com',
                to: product.seller.email, // Use populated seller's email
                subject: 'Product Out of Stock',
                text: `Dear ${product.seller.name},\n\nYour product titled "${product.name}" is now out of stock.\nPlease review it.\n\nBest regards,\nExplora Team`,
            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }

        return res.status(201).json({
            message: 'Purchase recorded successfully.',
            purchase,
            sale,
            
        });
    } catch (error) {
        console.error('Error during purchase:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = router;
