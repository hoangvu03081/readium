const { once } = require("events");
const JwtStrategy = require("passport-jwt").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/User");
const { serverUrl } = require("./index");
const imageUtil = require("../utils/getImageBufferFromUrl");
const { jwtOptions } = require("../utils/auth");

const downloadImageFromUrl = async (url) => {
  imageUtil.getImageBufferFromUrl(url);
  return once(imageUtil.bufferEmitter, "downloaded"); // avatar
};

const activateUser = (user) => {
  user.activationLink = undefined;
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

  // JWT strategy
  passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload.vux });
        if (!user) {
          return done(null, false, { message: ["User is not authorized"] });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Facebook strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${serverUrl}/auth/facebook/callback`,
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
            displayName: profile.displayName,
            activated: true,
          });
          await newUser.save();

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
        callbackURL: `${serverUrl}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ email: profile.emails[0].value });
          const avatar = await downloadImageFromUrl(profile.photos[0].value);

          if (user) {
            if (!user.activated) activateUser(user);
            if (!user.avatar) {
              user.avatar = avatar[0];
            }
            if (!user.activated || !user.avatar) await user.save();
            return done(null, user);
          }
          const newUser = new User({
            avatar: avatar[0],
            email: profile.emails[0].value,
            displayName: profile.displayName,
            activated: true,
          });
          await newUser.save();
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
