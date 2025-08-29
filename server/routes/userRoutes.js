const express = require("express");
const router = express.Router();
const passport = require("passport");
const { authMiddleware } = require("../middleware/auth");

const { signup, login, logout, googleAuth,getCurrentUser } = require("../controllers/userController");

// ============================
// Email/Password Routes
// ============================
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authMiddleware,logout);

// ============================
// Google OAuth Routes
// ============================
// Start Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/me", authMiddleware, getCurrentUser);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  googleAuth // controller handles JWT + redirect to dashboard
);

module.exports = router;