const express = require('express');
const router = express.Router();
const {
    getAllVisitors,
    getVisitorById,
    createVisitor,
    updateVisitor,
    deleteVisitor,
    getVisitorActivity
} = require('../Controllers/VisitorController');


// Route to get the activity of visitors (number of attractions they have reviewed)
router.get('/activity', getVisitorActivity);

// Get all visitors
router.get('/', getAllVisitors);

// Get a visitor by ID
router.get('/:id', getVisitorById);

// Update a visitor by ID
router.put('/:id', updateVisitor);

// Delete a visitor by ID
router.delete('/:id', deleteVisitor);

// Create a new visitor
router.post('/', createVisitor);



module.exports = router;