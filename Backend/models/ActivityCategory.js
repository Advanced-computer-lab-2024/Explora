const mongoose = require('mongoose');

const Schema = mongoose.Schema

const  ActivityCategorySchema = new Schema({ 

    activityType: {
        type: String,
        undefined: true,
        unique: true,
        required: true
    }
})
module.exports = mongoose.model('ActivityCategory', ActivityCategorySchema);

