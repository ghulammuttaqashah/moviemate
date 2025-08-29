const express = require("express");
const router = express.Router();
const tmdbController = require("../controllers/tmdbController");

// @desc   Search movies by query
// @route  GET /api/tmdb/search?query=batman
router.get("/search", tmdbController.searchMovies);

// @desc   Get movie details by TMDB ID
// @route  GET /api/tmdb/:id
router.get("/:id", tmdbController.getMovieDetails);

module.exports = router;