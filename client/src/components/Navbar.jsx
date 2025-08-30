import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { usePWAInstall } from "../hooks/usePWAInstall";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { isInstallable, promptInstall } = usePWAInstall();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-400">
          MovieMate
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-bold transition ${
                  isActive
                    ? "text-indigo-400"
                    : "text-gray-300 hover:text-indigo-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* PWA Install Button */}
          {isInstallable && (
            <button
              onClick={promptInstall}
              className="ml-4 px-4 py-2 rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white font-bold transition"
            >
              📲 Install App
            </button>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4 font-bold">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white transition font-bold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="flex flex-col items-center space-y-4 py-4 font-bold">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-indigo-400"
                      : "text-gray-300 hover:text-indigo-300"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* PWA Install Button (Mobile) */}
            {isInstallable && (
              <button
                onClick={() => {
                  promptInstall();
                  setIsOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white font-bold w-32 text-center transition"
              >
                📲 Install App
              </button>
            )}

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white w-32 text-center transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 w-32 text-center transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white w-32 text-center transition font-bold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;