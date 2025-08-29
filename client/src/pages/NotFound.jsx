import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <h1 className="text-6xl font-bold text-indigo-400 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl mb-6">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-bold transition"
      >
        Go Home
      </Link>
    </div>
  );
}