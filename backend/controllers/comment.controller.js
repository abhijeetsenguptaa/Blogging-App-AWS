const BlogPost = require("../models/blog.model");
const Comment = require("../models/comment.model");
const { User } = require("../models/user.model");

async function postingComment(req, res) {
    try {
        const postId = req.params.postId;
        const { text } = req.body;

        // Create a new comment
        const newComment = await Comment.create({ text, userId, blogID: postId });

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).json({ error: "Failed to post comment." });
    }
}


async function gettingComments(req, res) {
    try {
        const postId = req.params.postId;

        // Find all comments where blogID matches postId
        const data = await Comment.findAll({
            where: {
                blogID: postId,
            },
            include: [
                {
                    model: User, // Include the User model associated with each Comment
                    attributes: ['firstName'], // Specify the attributes you want to include from the User model
                    as: 'user', // Use an alias for the User model to avoid conflict with the outer User model
                },
                {
                    model: BlogPost, // Include the BlogPost model associated with each Comment
                    attributes: ['id', 'title', 'slug', 'content'], // Specify the attributes you want to include from the BlogPost model
                    as: 'blogPost', // Use an alias for the BlogPost model to avoid conflict with the outer BlogPost model
                },
            ],
        });

        // Return the comments
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments." });
    }
}


async function deletingComments(req, res) {
    try {
        const commentId = req.params.commentId;

        // Find the comment by its ID in the database
        const comment = await Comment.findByPk(commentId);

        // Check if the comment exists
        if (!comment) {
            return res.status(404).json({
                error: 'Comment not found.',
            });
        }

        // Check if the user making the request is the owner of the comment
        if (comment.userId !== userId) {
            return res.status(403).json({
                error: 'You are not authorized to delete this comment.',
            });
        }

        // Delete the comment from the database
        await comment.destroy();

        // Return a success response
        res.status(200).json({
            message: 'Comment deleted successfully.',
        });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment." });
    }
}


async function updatingComments(req, res) {
    try {
        const commentId = req.params.commentId;
        const { text } = req.body;

        // Find the comment by its ID in the database
        const comment = await Comment.findByPk(commentId);

        // Check if the comment exists
        if (!comment) {
            return res.status(404).json({
                error: 'Comment not found.',
            });
        }

        // Check if the user making the request is the owner of the comment
        if (comment.userId !== req.user.id) {
            return res.status(403).json({
                error: 'You are not authorized to update this comment.',
            });
        }

        // Update the comment in the database
        await comment.update({
            text,
        });

        // Return the updated comment
        res.status(200).json({
            message: 'Comment updated successfully.',
            comment,
        });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Failed to update comment." });
    }
}




module.exports = { postingComment, gettingComments, deletingComments, updatingComments };
