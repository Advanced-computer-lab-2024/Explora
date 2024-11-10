const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,               
        ref: 'User' 
    },
    comment: { 
        type: String, 
        required: false  // Made optional
    },
    rating: { 
        type: Number, 
        required: false, 
        min: 1, 
        max: 5 
    }
}, { timestamps: true });

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
    reviews: [reviewSchema],
    averageRating: {
        type: Number,
        default: 0
    },
    archived: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    sales: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
    },
    archived: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    sales: {
        type: Number,
        default: 0 
    }

},


{ timestamps: true });

// Method to calculate average rating
productSchema.methods.calculateAverageRating = function() {
    if (this.reviews.length === 0) return 0;
    const totalRating = this.reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const validRatings = this.reviews.filter(review => review.rating).length;
    return validRatings === 0 ? 0 : totalRating / validRatings;
};

module.exports = mongoose.model('Product', productSchema);
