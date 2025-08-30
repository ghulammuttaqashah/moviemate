import { useState, useEffect } from "react";
import axios from "../utils/axios";
import Loader from "./Loader";
import MovieCard from "./MovieCard";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function TMDBSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/tmdb/search?q=${encodeURIComponent(query)}`);
        setMovies(data || []);
      } catch (err) {
        toast.error("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleAddToFavorites = async (movie) => {
    if (!user) {
      toast.error("You must be logged in to add movies!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/movies", {
        tmdbId: movie.tmdbId,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
      });
      toast.success("Movie added to favorites!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-6">
      {/* Search Box */}
      <div className="flex mb-6 justify-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-6 py-3 text-lg rounded-xl bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Movies Grid */}
      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                tmdbId: movie.id,
                title: movie.title,
                overview: movie.overview,
                posterPath: movie.poster_path,
                releaseDate: movie.release_date,
              }}
              onAdd={handleAddToFavorites}
            />
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && query.trim() && movies.length === 0 && (
        <p className="text-gray-400 text-center mt-6">No movies found.</p>
      )}
    </section>
  );
}

export default TMDBSearch;