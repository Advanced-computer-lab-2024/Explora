const mongoose = require('mongoose');

const Schema = mongoose.Schema

const  ActivityCategorySchema = new Schema({ 

    activityType: {
        type: String,
<<<<<<< HEAD
        undefined: false,
        required: false
=======
        undefined: true,
        unique: true,
        required: true
>>>>>>> 0b91fb7a83cee7e1ca248370c036e2ffbc6a826e
    }
})
module.exports = mongoose.model('ActivityCategory', ActivityCategorySchema);

