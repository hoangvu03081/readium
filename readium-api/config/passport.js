const JwtStrategy = require("passport-jwt").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { ObjectId } = require("mongoose").Types;

const User = require("../models/User");
const Collection = require("../models/Collection");
const { serverUrl } = require("./url");
const {
  downloadImageFromUrl,
  convertBufferToPng,
  decodeJWT,
  jwtOptions,
  NO_AUTH_TOKEN,
  removeAccents,
} = require("../utils");

const { putUser } = require("../utils/elasticsearch");

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
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });

  // JWT strategy
  passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (!user || !user.tokens) {
          return done(null, false, { message: NO_AUTH_TOKEN });
        }
        const isAuth = user.tokens.some((token) => {
          const decoded = decodeJWT(token.split(" ")[1]);
          return JSON.stringify(decoded) === JSON.stringify(jwt_payload);
        });
        if (!isAuth) {
          return done(null, false, { message: NO_AUTH_TOKEN });
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
          "picture.type(large)",
        ],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ email: profile.emails[0].value });
          let avatar = await downloadImageFromUrl(profile.photos[0].value);
          avatar = await convertBufferToPng(avatar[0]);
          if (user) {
            // haven't activated
            if (!user.activated) {
              activateUser(user);
            }
            // no avatar
            if (!user.avatar) {
              user.avatar = avatar;
            }
            await user.save();
            const userObject = user.getElastic();
            await putUser(user._id.toString(), userObject);
            return done(null, user);
          }

          const profileIdBase = removeAccents(profile.displayName)
            .toLowerCase()
            .replace(/ +/g, "-");

          const count = await User.find({
            profileId: profileIdBase,
          }).countDocuments();

          const profileId = profileIdBase + (count ? "." + count : "");

          const newUserId = new ObjectId();
          const defaultCollection = new Collection({ user: newUserId });
          const newUser = new User({
            _id: newUserId,
            avatar: avatar,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            activated: true,
            profileId,
            collections: [defaultCollection._id],
          });

          await defaultCollection.save();
          await newUser.save();
          const newUserObject = newUser.getElastic();
          await putUser(newUser._id.toString(), newUserObject);

          return done(null, newUser);
        } catch (err) {
          console.log(err);
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
          profile.photos[0].value = profile.photos[0].value.replace(
            "96",
            "200"
          );
          const user = await User.findOne({ email: profile.emails[0].value });
          let avatar = await downloadImageFromUrl(profile.photos[0].value);
          avatar = await convertBufferToPng(avatar[0]);
          if (user) {
            if (!user.activated) {
              activateUser(user);
            }
            if (!user.avatar) {
              user.avatar = avatar;
            }
            await user.save();
            const userObject = user.getElastic();
            await putUser(user._id.toString(), userObject);
            return done(null, user);
          }

          const profileIdBase = removeAccents(profile.displayName)
            .toLowerCase()
            .replace(/ +/g, "-");

          const count = await User.find({
            profileId: profileIdBase,
          }).countDocuments();

          const profileId = profileIdBase + (count ? "." + count : "");

          const newUserId = new ObjectId();
          const defaultCollection = new Collection({ user: newUserId });
          const newUser = new User({
            _id: newUserId,
            avatar: avatar,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            activated: true,
            profileId,
            collections: [defaultCollection._id],
          });

          await defaultCollection.save();
          await newUser.save();
          const newUserObject = newUser.getElastic();
          await putUser(newUser._id.toString(), newUserObject);

          return done(null, newUser);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
};
