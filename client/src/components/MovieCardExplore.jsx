import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";

export default function MovieCardExplore({ movie, onClick, refreshMovies }) {
  const { user } = useAuth(); // get login status from AuthContext
  const { title, overview, posterPath, votes, addedBy, _id, tmdbId } = movie;

  const [userVote, setUserVote] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);

  const handleVote = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      await axios.post(`/movies/${_id}/vote`);
      setUserVote(true);
      refreshMovies();
      toast.success("Voted!");
    } catch (err) {
      console.error(err);
      toast.error("You can only vote once");
    }
  };

  const handleAddComment = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      toast.error("Please login first");
      return;
    }
    if (!commentText.trim()) return;

    setLoadingComment(true);
    try {
      await axios.post(`/comments/`, { movieId: tmdbId, text: commentText });
      setCommentText("");
      setShowCommentForm(false);
      refreshMovies();
      toast.success("Comment added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    } finally {
      setLoadingComment(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-md flex flex-col h-full">
      {/* Poster */}
      {posterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="h-64 w-full object-cover rounded-t-2xl"
        />
      ) : (
        <div className="h-64 w-full bg-gray-700 flex items-center justify-center text-gray-400 rounded-t-2xl">
          No Image
        </div>
      )}

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Title: only this is clickable */}
          <h3
            className="text-lg font-bold text-indigo-400 mb-2 hover:underline cursor-pointer"
            onClick={() => onClick(movie._id)}
          >
            {title}
          </h3>

          <p className="text-sm text-gray-300 mb-2 line-clamp-4">
            {overview || "No overview available."}
          </p>

          <p className="text-m font-bold text-white mb-2">
            Added by: {addedBy?.name || "Unknown"}
          </p>

          <span className="text-sm font-bold text-yellow-400">Votes: {votes || 0}</span>
        </div>

        {/* Buttons */}
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={handleVote}
              disabled={userVote}
              className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            >
              {userVote ? "Voted" : "Vote"}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!user) {
                  toast.error("Please login first");
                  return;
                }
                setShowCommentForm(!showCommentForm);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold"
            >
              {showCommentForm ? "Cancel" : "Comment"}
            </button>
          </div>

          {/* Inline Comment Form */}
          {showCommentForm && user && (
            <div
              className="flex flex-col gap-2 mt-2"
              onClick={(e) => e.stopPropagation()} // prevent opening details when typing
            >
              <textarea
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder="Add your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                disabled={loadingComment}
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold self-start"
              >
                {loadingComment ? "Adding..." : "Add Comment"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}