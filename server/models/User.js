const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    googleId: {
      type: String, // For Google OAuth users
    },
    bio: {
      type: String,
      maxlength: 200, // small bio, optional
      default: "",
    },
    favoriteGenres: {
      type: [String], // e.g. ["Action", "Drama"]
      default: [],
    },
    watchlist: {
      type: [Number], // TMDB IDs of movies/series
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);