const express = require('express');
const router = express.Router();
const {
    getAllReviews,
    getReviewById,
    updateReview,
    postReview,
    deleteReview
} = require('../Controllers/ReviewController');

// Get all reviews
router.get('/', getAllReviews);

// Get a review by ID
router.get('/:id', getReviewById);

// Update a review by ID
router.put('/:id', updateReview);

// Delete a review by ID
router.delete('/:id', deleteReview);

// POST route to create a review
router.post('/', postReview);

module.exports = router;