const mongoose = require('mongoose');

const touristPromoCodeSchema = new mongoose.Schema({
    code: { type: String, required: true }, // The promo code assigned to the tourist
    discount: { type: Number, required: true }, // Discount percentage (same as admin code)
    expiryDate: { type: Date, required: true }, // Expiry date set to 10 days after birthday
    tourist: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tourist', 
        required: true 
    }, // The tourist who receives the promo code
}, { timestamps: true });

const TouristPromoCode = mongoose.model('TouristPromoCode', touristPromoCodeSchema);

module.exports = TouristPromoCode;
