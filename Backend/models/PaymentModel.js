const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    touristId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for tourist information
        required: true,
    },
    paymentMethodId: {
        type: String, // Storing the Payment Method ID
        required: true,
    },
    amount: {
        type: Number, // Amount in cents (or the equivalent in your chosen currency)
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'succeeded', 'failed'],
        default: 'pending',
    },
    stripePaymentIntentId: {
        type: String, // Stripe's PaymentIntent ID
        required: true, // Make sure this field is marked as required
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
