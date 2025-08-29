const Comment = require("../models/Comment");
const Movie = require("../models/Movie");

// ============================
// Add comment
// ============================
exports.addComment = async (req, res) => {
  try {
    const { movieId, text } = req.body;
    if (!movieId || !text)
      return res.status(400).json({ message: "Movie ID and text are required" });

    // Find MongoDB movie by TMDB ID
    const movie = await Movie.findOne({ tmdbId: movieId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const comment = new Comment({
      movie: movie._id, // MongoDB _id
      user: req.user._id,
      text,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

// ============================
// Update comment
// ============================
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Only author or admin can update
    if (comment.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this comment" });
    }

    comment.text = req.body.text || comment.text;
    await comment.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to update comment", error: err.message });
  }
};

// ============================
// Delete comment
// ============================
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Only author or admin can delete
    if (comment.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete comment", error: err.message });
  }
};

// ============================
// Get all comments for a movie
// ============================
exports.getCommentsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Find MongoDB movie by TMDB ID
    const movie = await Movie.findOne({ tmdbId:Number(movieId) });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const comments = await Comment.find({ movie: movie._id })
      .populate("user", "name email"); // populate author info

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
};