const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ✅ Ensure email exists in profile
        if (!profile.emails || !profile.emails.length) {
          return done(
            new Error("Google account does not provide an email address"),
            null
          );
        }

        const email = profile.emails[0].value;

        // ✅ Find existing user by email
        let user = await User.findOne({ email });

        if (!user) {
          // Create new user only when we have a real email
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName || "Google User",
            email,
            password: null, // for OAuth
          });
        } else if (!user.googleId) {
          // Attach googleId if it's missing
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


module.exports = passport;