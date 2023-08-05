// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Set the default port for the server
const PORT = process.env.PORT || 8080;

// Create an instance of the Express application
const app = express();

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Define the root route
app.get('/', async (req, res) => {
    try {
        // Send a JSON response with a welcome message
        res.status(200).json({
            status: 'success',
            message: 'Welcome to the Blogging-App-AWS'
        });
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.error('Error while handling the root route:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
