const axios = require("axios");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

const tmdbService = {
  async search(query) {
    const res = await axiosInstance.get(`/search/movie`, {
      params: { query },
    });
    return res.data.results;
  },

  async getDetails(tmdbId) {
    const res = await axiosInstance.get(`/movie/${tmdbId}`);
    return res.data;
  },
};

module.exports = tmdbService;