import { useState, useEffect } from "react";
import axios from "../utils/axios";
import MovieCardExplore from "../components/MovieCardExplore";
import MovieDetails from "./MovieDetails"; // your details page
import toast from "react-hot-toast";
import Loader from "../components/Loader"; // make sure you have a Loader component

export default function Explore({ currentUserId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByVotes, setSortByVotes] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const endpoint = sortByVotes ? "/movies/filter/votes" : "/movies";
      const { data } = await axios.get(endpoint);
      setMovies(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [sortByVotes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Explore Movies</h1>

      {/* Sorting */}
      <div className="mb-4">
        <button
          onClick={() => setSortByVotes(!sortByVotes)}
          className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold"
        >
          {sortByVotes ? "Unsort Movies by Votes" : "Sort by Votes"}
        </button>
      </div>

      {/* Movies List / Loader / No Movies */}
      {loading ? (
        <Loader />
      ) : movies.length === 0 ? (
        <p className="text-gray-400 text-center">No movies added by anyone.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCardExplore
              key={movie._id}
              movie={movie}
              refreshMovies={fetchMovies}
              currentUserId={currentUserId}
              onClick={(id) => setSelectedMovieId(id)}
            />
          ))}
        </div>
      )}

      {/* Movie Details Modal */}
      {selectedMovieId && (
        <MovieDetails
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
}