import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MovieDetails from "./pages/MovieDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; // import it

function App() {
   useEffect(() => {
    toast(
      "🍪 To login, please allow third-party cookies in your browser.",
      { duration: 5000 }
    );
  }, []);
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
        <Toast />
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
           <Route path="*" element={<NotFound />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;