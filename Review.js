//Review model
const mongoose = require('mongoose');

//Schema definition for reviews
const reviewSchema = new mongoose.Schema({
    attraction: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Attraction', 
        required: true // Reference to Attraction and required
    },
    visitor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Visitor', 
        required: true // Reference to Visitor and required
    },
    score: { 
        type: Number, 
        required: true, 
        min: [1, 'Score must be at least 1'], // Minimum value
        max: [5, 'Score cannot exceed 5'] // Maximum value
    },
    comment: { 
        type: String, 
        required: false // optional
    }
});

// Ensure a visitor cannot review the same attraction twice
reviewSchema.index({ attraction: 1, visitor: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);