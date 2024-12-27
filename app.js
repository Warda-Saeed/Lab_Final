const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const attractionRoutes = require('./Routes/AttractionRoutes'); // Import attraction routes
const visitorRoutes = require('./Routes/VisitorRoutes'); // Import visitor routes
const reviewRoutes = require('./Routes/ReviewRoutes'); // Import review routes

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

mongoose.connect('mongodb://127.0.0.1:27017/tourismManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Do not include useCreateIndex, it's no longer necessary.
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

// Routes
app.use('/attraction', attractionRoutes); // Routes for attractions
app.use('/Visitors', visitorRoutes); // Routes for visitors
app.use('/Review', reviewRoutes); // Routes for reviews

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Tourism Management System API');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
});

// Start the Server

app.listen(3000, () => {
    console.log('Server is running on http://localhost:${PORT}');
});