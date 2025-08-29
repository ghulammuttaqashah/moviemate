import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const toastShown = useRef(false);

  if (loading) return null; // wait until auth is checked

  if (!user) {
    if (!toastShown.current) {
      toast.error("You must be logged in to access the dashboard!");
      toastShown.current = true;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;