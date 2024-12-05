const mongoose = require('mongoose');

const Orders = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'payment_issue'],
        default: 'pending',
    },
    deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true

    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'cash', 'wallet'],
        required: true
    }

}, { timestamps: true } )

module.exports = mongoose.model('Orders', Orders);  