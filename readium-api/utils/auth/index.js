const passport = require("passport");
const fs = require("fs");
const path = require("path");
const jsonwebtoken = require("jsonwebtoken");
const ExtractJwt = require("passport-jwt").ExtractJwt;

const pathToPrivKey = path.join(
  __dirname,
  "../..",
  "config/jwt/id_rsa_priv.pem"
);
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf-8");

function issueJWT(user) {
  const _id = user._id;

  const expiresIn = "10y";

  const payload = {
    vux: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
    if (err || !user) {
      // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
      return next(info);
    } else {
      req.user = user;
      return next();
    }
  })(req, res, next);
};


const pathToPubKey = path.join(
  __dirname,
  "../../",
  "config/jwt/id_rsa_pub.pem"
);

const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

module.exports = { authMiddleware, issueJWT, jwtOptions };
