const { once } = require("events");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { url } = require("./index");
const imageUtil = require("../utils/getImageBufferFromUrl");

const downloadImageFromUrl = async (url) => {
  imageUtil.getImageBufferFromUrl(url);
  const avatar = await once(imageUtil.bufferEmitter, "downloaded");
  return avatar;
};

const activateUser = (user) => {
  user.activation_link = undefined;
  user.activated = true;
};

module.exports = function (passport) {
  // pass in passport object
  passport.serializeUser(function (user, done) {
    return done(null, user._id);
  });
  passport.deserializeUser(async function (id, done) {
    const user = await User.findById(id);
    return done(null, user);
  });

  // local strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            req.flash("signInMessage", "User not found");
            return done(null, false);
          }
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            req.flash("signInMessage", "Wrong password.");
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Facebook strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${url}/auth/facebook/callback`,
        profileFields: [
          "id",
          "displayName",
          "email",
          "first_name",
          "last_name",
          "middle_name",
          "gender",
          "birthday",
          "profileUrl",
          "photos",
        ],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ email: profile.emails[0].value });
          const avatar = await downloadImageFromUrl(profile.photos[0].value);
          if (user) {
            // haven't activated
            if (!user.activated) activateUser(user);
            // no avatar
            if (!user.avatar) {
              user.avatar = avatar[0];
            }
            if (!user.activated || !user.avatar) await user.save();
            return done(null, user);
          }
          const newUser = new User({
            avatar: avatar[0],
            email: profile.emails[0].value,
            fullname: profile.displayName,
            activated: true,
          });
          await newUser.save();
          console.log(newUser);
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Google strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${url}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ email: profile.emails[0].value });
          const avatar = await downloadImageFromUrl(profile.photos[0].value);

          if (user) {
            if (!user.activated) activateUesr(user);
            if (!user.avatar) {
              user.avatar = avatar[0];
            }
            if (!user.activated || !user.avatar) await user.save();
            return done(null, user);
          }
          const newUser = new User({
            avatar: avatar[0],
            email: profile.emails[0].value,
            fullname: profile.displayName,
            activated: true,
          });
          await newUser.save();
          console.log(newUser);
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
