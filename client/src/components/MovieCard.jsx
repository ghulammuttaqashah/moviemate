import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";
import toast from "react-hot-toast";

function MovieCard({ movie }) {
  const { user } = useAuth();
  const { title, overview, posterPath, releaseDate, tmdbId } = movie;
  const [adding, setAdding] = useState(false);

  const handleAddToProfile = async () => {
    if (!user) {
      toast.error("Please log in first to add movies!");
      return;
    }

    setAdding(true);
    try {
      await axios.post("/movies", {
        tmdbId,
        title,
        overview,
        posterPath,
        releaseDate,
      });
      toast.success("Movie added to your profile!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add movie.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-md overflow-hidden w-full flex flex-col transition hover:scale-105 duration-200">
      {posterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="h-60 sm:h-64 md:h-72 w-full object-cover"
        />
      ) : (
        <div className="h-60 sm:h-64 md:h-72 w-full bg-gray-700 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-indigo-400 mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-2 line-clamp-4">
          {overview || "No overview available."}
        </p>
        {releaseDate && (
          <span className="text-xs text-gray-400 mb-3">Release: {releaseDate}</span>
        )}

        <button
          onClick={handleAddToProfile}
          className={`mt-auto px-4 py-2 rounded-xl text-white font-bold transition ${
            adding ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {adding ? "Adding..." : "Add to My Movies"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;