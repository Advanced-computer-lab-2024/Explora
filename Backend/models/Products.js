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
                required: true
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

// Inside your Product model
productSchema.methods.calculateAverageRating = function() {
    if (this.reviews.length === 0) return 0;  // If there are no reviews, return 0
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / this.reviews.length;
};

module.exports = mongoose.model('Product', productSchema);

