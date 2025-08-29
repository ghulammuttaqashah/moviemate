const Movie = require("../models/Movie");

// Add a movie
exports.addMovie = async (req, res) => {
  try {
    const { tmdbId, title, overview, posterPath, releaseDate } = req.body;

    const existing = await Movie.findOne({ tmdbId });
    if (existing) return res.status(400).json({ message: "Movie already exists" });

    const movie = new Movie({
      tmdbId,
      title,
      overview,
      posterPath,
      releaseDate,
      addedBy: req.user._id,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: "Failed to add movie", error: err.message });
  }
};

// In movieController.js
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("addedBy", "name");
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movie", error: err.message });
  }
};

// Delete movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Only owner or admin can delete
    if (movie.addedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this movie" });
    }

    await movie.deleteOne();
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete movie", error: err.message });
  }
};

// Get all movies (public)
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ createdAt: -1 })
      .populate("addedBy", "name"); // <-- populate name
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movies", error: err.message });
  }
};


// Get movies added by a specific user
exports.getMoviesByUser = async (req, res) => {
  try {
    const movies = await Movie.find({ addedBy: req.params.userId }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user's movies", error: err.message });
  }
};


// Vote a movie
exports.voteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);// <-- use tmdbId

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    if (movie.voters.includes(req.user._id)) {
      return res.status(400).json({ message: "You already voted for this movie" });
    }

    movie.votes += 1;
    movie.voters.push(req.user._id);
    await movie.save();

    res.json({ message: "Vote added", votes: movie.votes });
  } catch (err) {
    res.status(500).json({ message: "Failed to vote movie", error: err.message });
  }
};


// Filter movies by votes
// Filter movies by votes
exports.filterByVotes = async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ votes: -1 })
      .populate("addedBy", "name"); // <-- populate name
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Failed to filter movies", error: err.message });
  }
};

// Get total votes for a movie
// Get total votes for a movie
exports.getMovieVotes = async (req, res) => {
  try {
    const movie = await Movie.findOne({ tmdbId: req.params.id }).select("votes title"); // <-- tmdbId

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json({ movieId: movie.tmdbId, title: movie.title, totalVotes: movie.votes });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch votes", error: err.message });
  }
};





