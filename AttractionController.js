const Attraction = require('../models/attraction');


// Function to get the top 5 attractions with the highest ratings
const getTopRatedAttractions = async (req, res) => {
    try {
        // Fetch the top 5 attractions, sorted by rating in descending order
        const topAttractions = await Attraction.find()
            .sort({ rating: -1 })  // Sort by rating in descending order
            .limit(5);  // Limit to top 5 attractions

        if (topAttractions.length === 0) {
            return res.status(404).json({ message: 'No attractions found' });
        }

        res.status(200).json(topAttractions);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};


// Get all attractions
const getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json(attractions);
    } 
    catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get an attraction by ID
const getAttractionById = async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        res.status(200).json(attraction);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Create a new attraction
const createAttraction = async (req, res) => {
    try {
        const { name, location, entryFee, rating } = req.body;
        const newAttraction = new Attraction({ name, location, entryFee, rating });
        await newAttraction.save();
        res.status(201).json(newAttraction);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data', details: error.message });
    }
};

// Update an attraction by ID
const updateAttraction = async (req, res) => {
    try {
        const updatedAttraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAttraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        res.status(200).json(updatedAttraction);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data', details: error.message });
    }
};

// Delete an attraction by ID
const deleteAttraction = async (req, res) => {
    try {
        const deletedAttraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!deletedAttraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        res.status(200).json({ message: 'Attraction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

const updateAttractionRating = async (attractionId) => {
    try {
        // Get all reviews for the attraction
        const reviews = await Review.find({ attraction: attractionId });
        const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
        const averageScore = totalScore / reviews.length;

        // Update the attraction's rating
        await Attraction.findByIdAndUpdate(attractionId, { rating: averageScore });
    } catch (error) {
        console.error('Error updating attraction rating:', error);
    }
};

module.exports = {
    getAllAttractions,
    getAttractionById,
    createAttraction,
    updateAttraction,
    deleteAttraction,
    updateAttractionRating,
    getTopRatedAttractions
};