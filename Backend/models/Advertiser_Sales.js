const mongoose = require('mongoose');

const activitySalesSchema = new mongoose.Schema({
  advertiserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Advertiser', // Reference to the Advertiser model
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Activity', // Reference to the Activity model
  },
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the Tourist/User model
  },
  amount: {
    type: Number,
    required: true, // Total amount paid for the activity
  },
  date: {
    type: Date,
    default: Date.now, // Date of the sale
  },
});

const AdvertiserSale = mongoose.model('AdvertiserSale', activitySalesSchema);

module.exports = AdvertiserSale;
