const mongoose = require('mongoose');

const Orders = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    cancellationReason: {
      type: String, // Add a field for storing cancellation reason
      default: null,
    },
    refundAmount: {
      type: Number, // Store the refund amount for cancelled orders
      default: 0,
    },
    paidWithWallet: {
      type: Number, // Store the amount paid using the wallet
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Orders', Orders);
