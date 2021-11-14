const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { url } = require("../config");
const {
  sendWelcomeEmail,
  sendResetPasswordEmail,
} = require("../utils/sendMail");
const { issueJWT } = require("../utils/auth");
const Validator = require("../utils/validator/Validator");

const validator = new Validator();

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.send({ message: ["Log out successfully"] });
  });
});

// * create user
router.post("/register", async (req, res) => {
  const { email, password, fullname } = req.body;

  validator.resetErrors();
  const isValid =
    validator.checkEmpty("email", email) &
      validator.checkEmpty("password", password) &
      validator.checkEmpty("fullname", fullname) &&
    validator.validateEmail(email) &
      validator.validatePassword(password) &
      validator.validateFullname(fullname);

  if (!isValid) {
    return res.status(400).send({ errors: validator.errors });
  }

  const newUser = new User({
    email,
    password,
    fullname,
    activated: false,
  });

  const activation_link = `${url}/activate/${newUser._id}`;
  newUser.activation_link = activation_link;
  await sendWelcomeEmail({ to: email, url: activation_link });

  await newUser.save();

  const token = issueJWT(newUser);
  return res.status(201).send({
    message: ["Please activate your account with the link sent to your email!"],
    token,
  });
});

// * login routes
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ message: ["Could not find user"] });

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).json({ message: ["Wrong password"] });

    const token = issueJWT(user);
    return res.json({ message: ["Login successfully"], token });
  } catch (err) {
    return next(err);
  }
});

// * activate api
router.get("/activate/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user.activated) {
    return res
      .status(400)
      .send({ message: ["Your account is already activated"] });
  } else if (!user) {
    return res.status(404).send({ message: ["User not found!"] });
  } else {
    user.activation_link = undefined;
    user.activated = true;
    await user.save();
    return res.send({ message: ["You have activated your account."] });
  }
});

/**
 ** passport facebook routes
 */

// redirect user to facebook
// * getting permissions for:
//   + email
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

// facebook redirect users after they login
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/auth/facebook/login-succeeded",
    failureRedirect: "/auth/facebook/login-failed",
  })
);

// ! MAY DELETE
router.get("/facebook/login-succeeded", (req, res) => {
  res.send({ message: ["Facebook login successfully"] });
});

// * after user login facebook failed send status and error message
router.get("/facebook/login-failed", (req, res) => {
  res.status(500).send({ message: ["Facebook login failed for some reason"] });
});

/**
 ** passport facebook routes
 */

/**
 ** passport google routes
 */

// redirect users to google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// fail login google
router.get("/google/login-failed", (req, res) => {
  res.status(500).send({ message: "Google Login failed for some reason" });
});

// successfully login google
router.get("/google/login-succeeded", (req, res) => {
  res.send({ message: "Google Login successfully" });
});

// Google redirect users through callback api
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/google/login-succeeded",
    failureRedirect: "/google/login-failed",
  })
);

// request forget password
router.post("/forget", async (req, res, next) => {
  try {
    // find user in database
    const user = await User.findOne({ email: req.body.email });

    // send to user email if found in database;
    if (user) {
      // ? where should resetLink be ?
      const resetLink = `${url}/forget/${user._id}`;
      await sendResetPasswordEmail({ to: user.email, url: resetLink });
      return res.send({
        message: ["Please check your mail and reset your password!"],
      });
    }

    return res.status(404).send({ message: ["User is not found"] });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
