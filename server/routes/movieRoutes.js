const express = require("express");
const { addMovie, deleteMovie, getAllMovies, voteMovie, filterByVotes,getMovieVotes,getMoviesByUser,getMovieById} = require("../controllers/movieController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Movies
router.post("/", authMiddleware, addMovie);
router.delete("/:id", authMiddleware, deleteMovie);
router.get("/", getAllMovies); // public
router.post("/:id/vote", authMiddleware, voteMovie);
router.get("/filter/votes", filterByVotes);
// Public route: get total votes for a movie
router.get("/:id/votes",getMovieVotes);
// In router
router.get("/:id", getMovieById); // public route

// Get movies added by a specific user (public or protected depending on your need)
router.get("/user/:userId", authMiddleware, getMoviesByUser);


module.exports = router;