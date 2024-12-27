const Visitor = require('../models/Visitor');

//Get the visitor's activity
const getVisitorActivity = async (req, res) => {
    try {
        // Fetch all visitors
        const visitors = await Visitor.find({}, { name: 1, email: 1 }); // Select only name and email

        // Map through visitors and count their reviews
        const visitorActivity = await Promise.all(
            visitors.map(async (visitor) => {
                const reviewCount = await Review.countDocuments({ visitor: visitor._id });
                return {
                    name: visitor.name,
                    email: visitor.email,
                    reviewedAttractionsCount: reviewCount
                };
            })
        );

        if (visitorActivity.length === 0) {
            return res.status(404).json({ message: 'No visitors found' });
        }

        res.status(200).json(visitorActivity);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get all visitors
const getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().populate('visitedAttractions');
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get a visitor by ID
const getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id).populate('visitedAttractions');
        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Create a new visitor
const createVisitor = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if email already exists
        const existingVisitor = await Visitor.findOne({ email });
        if (existingVisitor) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newVisitor = new Visitor({ name, email });
        await newVisitor.save();
        res.status(201).json(newVisitor);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data', details: error.message });
    }
};

// Update a visitor by ID
const updateVisitor = async (req, res) => {
    try {
        const updatedVisitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }
        res.status(200).json(updatedVisitor);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data', details: error.message });
    }
};

// Delete a visitor by ID
const deleteVisitor = async (req, res) => {
    try {
        const deletedVisitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!deletedVisitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }
        res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

module.exports = {
    getAllVisitors,
    getVisitorById,
    createVisitor,
    updateVisitor,
    deleteVisitor,
    getVisitorActivity
};