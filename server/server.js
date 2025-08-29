const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ quiet: true });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const passport = require("./config/passport"); // Passport config
const jwt = require("jsonwebtoken");

// Routes
const userRoutes = require("./routes/userRoutes");
const tmdbRoutes = require("./routes/tmdbRoutes");
const movieRoutes = require("./routes/movieRoutes");
const commentRoutes = require("./routes/commentRoutes");

connectDB(); // Connect to MongoDB Atlas

const app = express();

// ------------------------
// Middleware
// ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // must match frontend exactly
    credentials: true,              // allow cookies cross-domain
  })
);

// ------------------------
// Initialize Passport (for OAuth)
// ------------------------
app.use(passport.initialize());

// ------------------------
// Routes
// ------------------------
app.get("/", (req, res) => res.send("MovieMate API running..."));

// Auth routes
app.use("/api/auth", userRoutes);

// TMDB routes (search, details)
app.use("/api/tmdb", tmdbRoutes);

// Movies routes (CRUD, vote, filter)
app.use("/api/movies", movieRoutes);

// Comments routes (add/update/delete/get)
app.use("/api/comments", commentRoutes);

// ------------------------
// Start server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

