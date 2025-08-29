import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Loader from "../components/Loader";
import MovieCardDashboard from "../components/MovieCardDashboard";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  // Fetch user's movies
  const fetchMovies = async () => {
    if (!user?.id) {
      console.log("User ID not ready yet:", user);
      return;
    }

    setLoadingMovies(true);
    try {
      
      const { data } = await axios.get(`/movies/user/${user.id}`);
      
      setMovies(data);
    } catch (err) {
      console.error("Fetch movies error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to fetch your movies.");
      setMovies([]);
    } finally {
      setLoadingMovies(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchMovies();
      } else {
        setLoadingMovies(false); // stop loader if no user
      }
    }
  }, [user, authLoading]);

  // Delete movie using Mongo _id
  const handleDelete = async (_id) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      await axios.delete(`/movies/${_id}`);
      toast.success("Movie deleted!");
      setMovies((prev) => prev.filter((m) => m._id !== _id));
    } catch (err) {
      console.error("Delete movie error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to delete movie.");
    }
  };

  if (authLoading || loadingMovies) return <Loader />;
  if (!user) return <p className="text-center mt-12 text-gray-400">You need to login.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Dashboard</h1>

      {/* User Info */}
      <section className="bg-gray-900 p-6 rounded-xl mb-8 shadow-md">
        <h2 className="text-xl font-bold text-gray-200 mb-2">User Information</h2>
        <p className="text-gray-300"><strong>Name:</strong> {user.name}</p>
        <p className="text-gray-300"><strong>Email:</strong> {user.email}</p>
      </section>

      {/* User Movies */}
      <section>
        <h2 className="text-xl font-bold text-gray-200 mb-4">Your Movies</h2>

        {movies.length === 0 ? (
          <p className="text-gray-400">You haven't added any movies yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCardDashboard
                key={movie._id}
                movie={movie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}