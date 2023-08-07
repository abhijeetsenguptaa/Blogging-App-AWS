const { postingComment, gettingComments, deletingComments, updatingComments } = require("../controllers/comment.controller");
const { authentication } = require("../middleware/authentication.middleware");
const Comment = require("../models/comment.model");
const express = require("express");
const commentRoute = express.Router();


commentRoute.post("/:postId", authentication, postingComment);

commentRoute.get("/:postId", authentication, gettingComments);

commentRoute.delete("/:commentId", authentication, deletingComments);

commentRoute.patch("/:commentId", authentication, updatingComments);

module.exports = { commentRoute };