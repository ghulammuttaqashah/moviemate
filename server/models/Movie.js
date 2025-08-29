const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, required: true, unique: true }, // link to TMDB
    title: { type: String, required: true },
    overview: { type: String },
    posterPath: { type: String },
    releaseDate: { type: String },

    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Community features
    votes: { type: Number, default: 0 }, // total upvotes
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // to prevent double voting
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);