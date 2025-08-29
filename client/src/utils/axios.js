import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
  withCredentials: true, // important for cookies
});

// Optional: interceptors for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, logging out...");
      // you can auto-logout here if needed
    }
    return Promise.reject(error);
  }
);

export default instance;