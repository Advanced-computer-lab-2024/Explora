const mongoose = require('mongoose');

const Schema = mongoose.Schema

const productSchema = new Schema({
    image: {    
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    
    price: {
        type: Number,
        required: true
    },
    currency: { type: String, required: true, default: 'USD' },
    description: {
        type: String,
        required: true
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Seller', 
        required: true 
    }, 
  
    
    quantity: {
        type: Number,
        required: true
    },

    reviews: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,               
                ref: 'User'
            },
            comment: {
                type: String,
                required: false
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            }
        }],
        required: false
    },
    averageRating: {
        type: Number,
        default: 0
    }



}, { timestamps: true });

productSchema.methods.calculateAverageRating = function() {
    if (this.reviews.length === 0) return 0;

    const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / this.reviews.length).toFixed(2); // Rounded to 2 decimal places
};

module.exports = mongoose.model('Product', productSchema);

