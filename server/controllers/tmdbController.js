const tmdbService = require("../services/tmdbService");

exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query; // use "q" instead of "query"
    if (!q) return res.status(400).json({ message: "Query required" });

    const movies = await tmdbService.search(q);
    res.json(movies);
  } catch (err) {
    console.error("TMDB Search Error:", err.message);
    res.status(500).json({ message: "TMDB search failed", error: err.message });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Movie ID required" });

    const movie = await tmdbService.getDetails(id);
    res.json(movie);
  } catch (err) {
    console.error("TMDB Details Error:", err.message);
    res.status(500).json({ message: "TMDB details fetch failed", error: err.message });
  }
};