const express = require('express');
const router = express.Router();
const {
    getAllAttractions,
    getAttractionById,
    createAttraction,
    updateAttraction,
    deleteAttraction,
    updateAttractionRating,
    getTopRatedAttractions
} = require('../Controllers/AttractionController');

// Route to get the top 5 attractions with the highest rating
router.get('/toprated', getTopRatedAttractions);

// Get all attractions
router.get('/', getAllAttractions);

// Get an attraction by ID
router.get('/:id', getAttractionById);

// Create a new attraction
router.post('/', createAttraction);

// Update an attraction by ID
router.put('/:id', updateAttraction);

// Delete an attraction by ID
router.delete('/:id', deleteAttraction);

//  update the rating of an attraction
router.put('/:id/rating', updateAttractionRating);

module.exports = router;