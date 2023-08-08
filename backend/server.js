// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connection } = require('./configs/connection');
const { userRoute } = require('./routes/user.route');
const { blogRoute } = require('./routes/blog.route');
const { User } = require('./models/user.model');
const BlogPost = require('./models/blog.model');
const { commentRoute } = require('./routes/comment.route');

// Load environment variables from .env file
dotenv.config();

// Set the default port for the server
const PORT = process.env.PORT || 443;

// Create an instance of the Express application
const app = express();
app.use(express.json());


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


app.use('/users', userRoute)
app.use('/blogs', blogRoute)
app.use('/comments', commentRoute)

// Start the server and listen on the specified port
connection.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Server is listening to the port : 443');
    })
})
