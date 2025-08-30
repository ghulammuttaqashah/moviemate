import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/auth/me", { withCredentials: true });
       
        setUser(data.user || null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const { data } = await axios.post("/auth/login", credentials, { withCredentials: true });
    setUser(data.user);
  };

 const logout = async () => {
  try {
    await axios.get("/auth/logout", { withCredentials: true });
    setUser(null);
    toast.success("Logged out successfully!"); // ✅ toast here
  } catch (err) {
    console.error("Logout failed:", err);
    toast.error("Logout failed, please try again.");
  }
};

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);