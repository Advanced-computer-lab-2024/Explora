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
        ref: 'User', 
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


module.exports = mongoose.model('Product', productSchema);

