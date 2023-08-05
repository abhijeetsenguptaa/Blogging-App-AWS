const { Op } = require('sequelize');
const BlogPost = require('../models/blog.model');

// Controller to create a new blog post
const createBlog = async (req, res) => {
    try {
        const { title, content, slug } = req.body;

        // Validate required fields
        if (!title || !content || !slug) {
            return res.status(400).json({
                error: 'Please provide all required fields.',
            });
        }

        // Create the new blog post
        const newBlog = await BlogPost.create({
            title,
            content,
            slug,
            userId: userId,
        });

        // Return the created blog post
        res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error while creating a new blog post:', error);
        res.status(500).json({
            error: 'Failed to create the blog post.',
        });
    }
};


// Controller to fetch all blog posts with search, query, and pagination
const getAllBlogs = async (req, res) => {
    try {
        const { title, sortBy, sortOrder, limit, page } = req.query;

        // Default values for limit and page
        const DEFAULT_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        // Parse limit and page to integers
        const limitValue = parseInt(limit) || DEFAULT_LIMIT;
        const pageValue = parseInt(page) || DEFAULT_PAGE;

        // Calculate the offset based on the page value
        const offset = (pageValue - 1) * limitValue;

        // Build the query options based on the request parameters
        const options = {
            limit: limitValue,
            offset,
        };

        if (title) {
            options.where = {
                title: {
                    [Op.like]: `%${title}%`,
                },
            };
        }

        if (sortBy && sortOrder) {
            options.order = [[sortBy, sortOrder]];
        }

        // Fetch all blog posts from the database based on the query options
        const blogs = await BlogPost.findAll(options);

        // Return the blog posts
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error while fetching blog posts:', error);
        res.status(500).json({
            error: 'Failed to fetch blog posts.',
        });
    }
};


// Controller to fetch a single blog post by its ID
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the blog post by its ID in the database
        const blog = await BlogPost.findByPk(id);

        // Check if the blog post exists
        if (!blog) {
            return res.status(404).json({
                error: 'Blog post not found.',
            });
        }

        // Return the blog post
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error while fetching the blog post:', error);
        res.status(500).json({
            error: 'Failed to fetch the blog post.',
        });
    }
};

// Controller to update a blog post by its ID
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // Validate required fields
        if (!title && !content) {
            return res.status(400).json({
                error: 'Please provide at least one field to update.',
            });
        }

        // Find the blog post by its ID in the database
        const blog = await BlogPost.findByPk(id);

        // Check if the blog post exists
        if (!blog) {
            return res.status(404).json({
                error: 'Blog post not found.',
            });
        }

        // Update the blog post
        if (title) {
            blog.title = title;
        }
        if (content) {
            blog.content = content;
        }
        await blog.save();

        // Return the updated blog post
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error while updating the blog post:', error);
        res.status(500).json({
            error: 'Failed to update the blog post.',
        });
    }
};

// Controller to delete a blog post by its ID
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the blog post by its ID in the database
        const blog = await BlogPost.findByPk(id);

        // Check if the blog post exists
        if (!blog) {
            return res.status(404).json({
                error: 'Blog post not found.',
            });
        }

        // Delete the blog post
        await blog.destroy();

        // Return success message
        res.status(200).json({
            message: 'Blog post deleted successfully.',
        });
    } catch (error) {
        console.error('Error while deleting the blog post:', error);
        res.status(500).json({
            error: 'Failed to delete the blog post.',
        });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
