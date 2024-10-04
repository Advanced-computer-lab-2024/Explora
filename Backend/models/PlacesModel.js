const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,  // E.g., 'museum', 'historical place', 'activity', etc.
    required: true,
  },
  tags: {
    type: [String],  // Array of tags for additional filtering
    default: [],
  },
}, { timestamps: true });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;