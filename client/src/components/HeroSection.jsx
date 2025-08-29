import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center bg-gray-950 px-6">
      <div className="max-w-3xl">
        {/* Tagline */}
        <p className="uppercase text-indigo-400 font-semibold tracking-widest mb-4">
          Your Personal Movie Hub 🎬
        </p>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
          Discover, Share & Vote for Movies You Love
        </h1>


        {/* Subtitle / Description */}
        <p className="text-gray-300 text-base sm:text-lg mb-8">
          Search movies instantly from{" "}
          <span className="text-indigo-400 font-bold">TMDB</span>,  
          add movies you like, upvote community picks, and join conversations with comments.  
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/explore">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl transition">
              Start Exploring
            </button>
          </Link>
        
            <button className="border border-indigo-400 text-indigo-400 hover:bg-indigo-500 hover:text-white font-bold px-6 py-3 rounded-xl transition">
              Contact Us
            </button>
         
        </div>
      </div>
    </section>
  );
}

export default HeroSection;