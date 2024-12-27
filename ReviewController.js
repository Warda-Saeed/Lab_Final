const Review = require('../models/Review');
const Visitor = require('../models/Visitor');


// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('visitor', 'name email') // Populate visitor details
            .populate('attraction', 'name location'); // Populate attraction details
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get a review by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('visitor', 'name email')
            .populate('attraction', 'name location');
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Update a review by ID
const updateReview = async (req, res) => {
    try {
        const { score, comment } = req.body;

        // Ensure score is between 1 and 5
        if (score && (score < 1 || score > 5)) {
            return res.status(400).json({ error: 'Score must be between 1 and 5' });
        }

        const updatedReview = await Review.findByIdAndUpdate(req.params.id, { score, comment }, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data', details: error.message });
    }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

//POST a new review
const postReview = async (req, res) => {
    try {
        const { visitorId, attractionId, score, comment } = req.body;

        // Validate score between 1 and 5
        if (score < 1 || score > 5) {
            return res.status(400).json({ error: 'Score must be between 1 and 5' });
        }

        // Ensure visitor has visited the attraction
        const visitor = await Visitor.findById(visitorId);
        if (!visitor || !visitor.visitedAttractions.includes(attractionId)) {
            return res.status(400).json({ error: 'Visitor must have visited the attraction to post a review' });
        }

        // Ensure visitor has not already reviewed the attraction
        const existingReview = await Review.findOne({ visitor: visitorId, attraction: attractionId });
        if (existingReview) {
            return res.status(400).json({ error: 'Visitor has already reviewed this attraction' });
        }

        // Create a new review
        const newReview = new Review({ visitor: visitorId, attraction: attractionId, score, comment });
        await newReview.save();

        // After adding the review, update the attraction's rating
        await updateAttractionRating(attractionId);

        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data', details: error.message });
    }
};

module.exports = { 
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    postReview
 };