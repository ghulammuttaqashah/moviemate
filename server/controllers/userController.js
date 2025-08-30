const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { path } = require("pdfkit");

// ============================
// Helper: Generate JWT + Cookie
// ============================
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Cookie settings for cross-domain
  res.cookie("jwt", token, {
    httpOnly: true,                       // can't be accessed by JS
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "none",                      // allow cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,      // 7 days
  });

  return token;
};
// ============================
// Signup with Email
// ============================
const signup = async (req, res) => {
  try {
    const { name, email, password, bio, favoriteGenres } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      bio: bio || "",
      favoriteGenres: favoriteGenres || [],
      watchlist: [],
    });

    const token = generateToken(res, user._id);

    res.status(201).json({
      message: "Signup successful",
      token, // optional: useful for mobile apps
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// Login with Email
// ============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(res, user._id);

    res.json({
      message: "Login successful",
      token, // optional
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// Google OAuth Callback
// ============================
const googleAuth = async (req, res) => {
  try {
    // Ensure Passport returned a user
    if (!req.user) {
      return res.status(400).json({ message: "No user returned from Google" });
    }

    const user = req.user; // user document from MongoDB

    // Generate JWT cookie
    generateToken(res, user._id);

    // Redirect to frontend dashboard
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ============================
// Logout Controller
// ============================
const logout = async (req, res) => {
  try {
    // if you’re using passport/session
    req.logout?.(() => {});
    req.session?.destroy?.(() => {});

    // Clear cookie with same settings as in generateToken
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // must match
      sameSite: "none",                              // must match
      path: "/",                                     // default path
    });

    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: error.message });
  }
};
// ============================
// Get Current Authenticated User
// ============================
const getCurrentUser = async (req, res) => {
  try {
    // `authMiddleware` should have set req.user if token is valid
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  signup,
  login,
  googleAuth,
  logout,
  getCurrentUser
};