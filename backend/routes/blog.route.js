require('dotenv').config();
const express = require('express');
const blogRoute = express.Router();

// Import the controller functions for blog routes
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require('../controllers/blog.controller');
const { authentication } = require('../middleware/authentication.middleware');

// Blog Routes

// Route to create a new blog post
blogRoute.post('/create', authentication, createBlog);

// Route to fetch all blog posts
blogRoute.get('/', getAllBlogs);

// Route to fetch a single blog post by its ID
blogRoute.get('/:id', authentication, getBlogById);

// Route to update a blog post by its ID
blogRoute.put('/:id', authentication, updateBlog);

// Route to delete a blog post by its ID
blogRoute.delete('/:id', authentication, deleteBlog);

module.exports = { blogRoute };
