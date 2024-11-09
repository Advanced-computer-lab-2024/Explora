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
                required: false
            },
            rating: {
                type: Number,
                required: false,
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

productSchema.methods.addReview = function({ user, comment }) {
    this.reviews.push({ user, comment });
};

productSchema.methods.addRating = function(rating) {
    this.reviews.push({ rating });
};

productSchema.methods.updateAverageRating = function() {
    if (this.reviews.length === 0) {
        this.averageRating = 0;
    } else {
        const sum = this.reviews.reduce((total, review) => total + (review.rating || 0), 0);
        const ratingsCount = this.reviews.filter(review => review.rating).length;
        this.averageRating = parseFloat((sum / ratingsCount).toFixed(2)); // Rounded to 2 decimal places
    }
};


module.exports = mongoose.model('Product', productSchema);

