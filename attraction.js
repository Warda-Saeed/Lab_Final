//Attraction model
const mongoose = require('mongoose');

//Schema creation for attraction models
const AttractionSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    entryFee: { 
        type: Number,
         required: true,
          min: [0, 'Entry fee must be a positive value']
    },
    rating: { 
        type: Number, 
        default: 0,
        min: [1, 'Score must be at least 1'], // Minimum value
        max: [5, 'Score cannot exceed 5'] // Maximum value
    }
});

//Used export so it can be used elsewhere
module.exports = mongoose.model('Attraction', AttractionSchema);