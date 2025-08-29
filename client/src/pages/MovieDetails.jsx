import { useState, useEffect } from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { AiOutlineClose } from "react-icons/ai";

export default function MovieDetails({ movieId, onClose }) {
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [actionLoading, setActionLoading] = useState(false); // for edit/delete

  const fetchMovie = async () => {
    try {
      const { data } = await axios.get(`/movies/${movieId}`);
      setMovie(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch movie");
    }
  };

  const fetchComments = async () => {
    if (!movie) return;
    try {
      const { data } = await axios.get(`/comments/${movie.tmdbId}`);
      setComments(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch comments");
    }
  };

  useEffect(() => {
    fetchMovie().then(() => setLoading(false));
  }, [movieId]);

  useEffect(() => {
    if (movie) fetchComments();
  }, [movie]);

  const handleAddComment = async () => {
    if (!user) return toast.error("Please login to comment");
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      await axios.post(`/comments/`, { movieId: movie.tmdbId, text: newComment });
      setNewComment("");
      fetchComments();
      toast.success("Comment added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) return toast.error("Please login to delete your comment");
    if (!confirm("Delete your comment?")) return;

    setActionLoading(true);
    try {
      await axios.delete(`/comments/${commentId}`);
      fetchComments();
      toast.success("Comment deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete comment");
    } finally {
      setActionLoading(false);
    }
  };

  const startEditing = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingText(text);
  };

  const saveEdit = async (commentId) => {
    if (!editingText.trim()) return;

    setActionLoading(true);
    try {
      await axios.put(`/comments/${commentId}`, { text: editingText });
      setEditingCommentId(null);
      setEditingText("");
      fetchComments();
      toast.success("Comment updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update comment");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl shadow-xl max-w-3xl w-full overflow-y-auto max-h-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          <AiOutlineClose />
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          {movie.posterPath ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
              className="w-full md:w-1/3 rounded-lg"
            />
          ) : (
            <div className="w-full md:w-1/3 bg-gray-700 flex items-center justify-center h-64 rounded-lg text-gray-400">
              No Image
            </div>
          )}

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-indigo-400">{movie.title}</h2>
            <p className="text-gray-300">{movie.overview || "No overview available."}</p>
            <p className="text-gray-400 text-sm">Release: {movie.releaseDate}</p>
            <p className="text-yellow-400 font-bold">Votes: {movie.votes || 0}</p>
            <p className="text-gray-400 text-sm">
              Added by: {movie.addedBy?.name || "Unknown"}
            </p>

            {/* Add Comment */}
            {user ? (
              <div className="mt-4">
                <textarea
                  className="w-full p-2 rounded bg-gray-800 text-white mb-2"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  onClick={handleAddComment}
                  disabled={commentLoading}
                  className="px-4 py-2 bg-indigo-400 rounded font-bold text-black"
                >
                  {commentLoading ? "Adding..." : "Add Comment"}
                </button>
              </div>
            ) : (
              <p className="mt-4 text-gray-400 italic">Login to add a comment</p>
            )}

            {/* Comments List */}
            <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
              {comments.length === 0 ? (
                <p className="text-gray-400">No comments yet.</p>
              ) : (
                <ul>
                  {comments.map((c) => (
                    <li key={c._id} className="bg-gray-800 p-2 rounded">
                      <p className="mb-1">
                        <span className="font-bold text-indigo-400">{c.user?.name || "Unknown"}:</span>{" "}
                        {editingCommentId === c._id ? (
                          <textarea
                            className="w-full p-1 mt-1 rounded bg-gray-700 text-white"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                        ) : (
                          <span>{c.text}</span>
                        )}
                      </p>

                      {user && c.user && String(c.user.id || c.user._id) === String(user.id || user._id) && (
                        <div className="flex gap-2 text-sm mt-2">
                          {editingCommentId === c._id ? (
                            <button
                              onClick={() => saveEdit(c._id)}
                              disabled={actionLoading}
                              className="px-4 py-1 bg-indigo-400 text-black rounded font-bold hover:bg-indigo-500"
                            >
                              {actionLoading ? "Saving..." : "Save"}
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditing(c._id, c.text)}
                                className="px-4 py-1 bg-indigo-400 text-black rounded font-bold hover:bg-indigo-500"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteComment(c._id)}
                                disabled={actionLoading}
                                className="px-4 py-1 bg-red-600 text-white rounded font-bold hover:bg-red-700"
                              >
                                {actionLoading ? "Deleting..." : "Delete"}
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}