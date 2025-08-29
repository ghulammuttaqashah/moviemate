import HeroSection from "../components/HeroSection";
import TMDBSearch from "../components/TMDBSearch";

export default function Home() {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* TMDB Search Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-6 text-center">
          Search Movies
        </h2>
        <TMDBSearch />
      </div>
    </div>
  );
}