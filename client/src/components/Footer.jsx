import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react"; // 👈 import only Github and Linkedin

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400">MovieMate</h2>
          <p className="mt-2 text-sm text-gray-400">
            Discover movies instantly from TMDB, add the ones you love, vote for community picks, and join conversations with fellow movie enthusiasts.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-gray-200 mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-indigo-300 transition font-bold">Home</Link></li>
            <li><Link to="/explore" className="hover:text-indigo-300 transition font-bold">Explore</Link></li>
            <li><Link to="/dashboard" className="hover:text-indigo-300 transition font-bold">Dashboard</Link></li>
            <li><Link to="/signup" className="hover:text-indigo-300 transition font-bold">Sign Up</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold text-gray-200 mb-2">Connect with Us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-3 text-sm text-gray-500">
        © {new Date().getFullYear()} MovieMate. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;