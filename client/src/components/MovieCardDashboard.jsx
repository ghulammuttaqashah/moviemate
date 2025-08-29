import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";

function MovieCardDashboard({ movie, onDelete }) {
  const { title, overview, posterPath, releaseDate, votes, _id, tmdbId } = movie;
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    if (!tmdbId) return;
    setLoadingComments(true);
    try {
      const { data } = await axios.get(`/comments/${tmdbId}`);
      setComments(data);
    } catch (err) {
      console.error("Fetch comments error:", err.response?.data || err.message);
      toast.error("Failed to fetch comments.");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [tmdbId]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-md flex flex-col h-full overflow-hidden">
      {/* Movie Poster */}
      {posterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="h-72 w-full object-cover"
        />
      ) : (
        <div className="h-72 w-full bg-gray-700 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Movie Info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-indigo-400 mb-2">{title}</h3>
          <p className={`text-sm text-gray-300 mb-2 ${overview ? "line-clamp-4" : ""}`}>
            {overview || "No overview available."}
          </p>

          <div className="flex justify-between items-center mb-2">
            {releaseDate && (
              <span className="text-xs text-gray-400">Release: {releaseDate}</span>
            )}
            <span className="text-sm font-bold text-yellow-400">Votes: {votes || 0}</span>
          </div>
        </div>

        <div className="mt-2 flex flex-col">
          <button
            onClick={() => onDelete(_id)}
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition mb-2"
          >
            Delete
          </button>

          {/* Comments Section */}
          <div className="flex flex-col">
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-sm text-indigo-400 font-bold hover:underline mb-1 text-left"
            >
              Comments ({comments.length})
            </button>

            {showComments && (
              <div className="max-h-48 overflow-y-auto">
                {loadingComments ? (
                  <p className="text-gray-400 text-sm">Loading comments...</p>
                ) : comments.length === 0 ? (
                  <p className="text-gray-400 text-sm">No comments yet.</p>
                ) : (
                  <ul className="text-gray-300 text-sm space-y-2">
                    {comments.map((c) => (
                      <li key={c._id} className="border-b border-gray-700 pb-1">
                        <span className="font-bold text-indigo-400">{c.user?.name || "Unknown"}:</span>{" "}
                        <span className="font-medium">{c.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCardDashboard;