const express = require("express");
const { addComment, updateComment, deleteComment, getCommentsByMovie } = require("../controllers/commentController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Comments
router.post("/", authMiddleware, addComment);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);
router.get("/:movieId", getCommentsByMovie);

module.exports = router;