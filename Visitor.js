//Visitor Model
const mongoose = require('mongoose');

//Schema definition for Visitors
const visitorSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Email format validation
    },
    //reference to attractions model
    visitedAttractions:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Attraction', 
        }
    ] 
});

module.exports = mongoose.model('Visitor', visitorSchema);