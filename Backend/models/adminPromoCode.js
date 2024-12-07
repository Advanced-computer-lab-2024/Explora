const mongoose = require('mongoose');

const adminPromoCodeSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true // Ensures no duplicate promo codes
    },
    discount: { 
        type: Number, 
        required: true, 
    }
});

const AdminPromoCode = mongoose.model('AdminPromoCode', adminPromoCodeSchema);

module.exports = AdminPromoCode;
