const mongoose = require('mongoose');

const Schema = mongoose.Schema

const  ActivityCategorySchema = new Schema({ 

    activityType: {
        type: String,
        undefined: false,
        required: false
    }
})
module.exports = mongoose.model('ActivityCategory', ActivityCategorySchema);

