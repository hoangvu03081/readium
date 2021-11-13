const router = require("express").Router();
const User = require("../models/User");
const { url } = require("../config");
const { sendWelcomeEmail } = require("../utils/sendMail");

const errorHandler = (err, req, res, next) => {
  console.log("auth error", err);
  return res
    .status(500)
    .send({ message: ["Some really bad error that needed to be viewed!"] });
};

// pass in passport object
module.exports = function (passport) {
  router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.send({ message: ["Log out successfully"] });
    });
  });

  // * passport local routes
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/login-succeeded",
      failureRedirect: "/login-failed",
    })
  );

  // ! MAY DELETE
  router.get("/login-succeeded", (req, res) => {
    return res.send({ message: ["login successfully"] });
  });

  // * after user login failed send status
  router.get("/login-failed", (req, res) => {
    return res.status(400).send({ message: req.flash("signInMessage") });
  });

  // * create user
  router.post("/register", async (req, res) => {
    const { email, password, fullname } = req.body;

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase());

    if (!isValid) {
      return res
        .status(400)
        .send({ message: ["Email is not valid. Please input a valid email!"] });
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
    return res.status(201).send({
      message: [
        "Please activate your account with the link sent to your email!",
      ],
    });
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
  //   + user_gender
  //   + user_birthday
  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email"],
    })
  );

  // facebook redirect users after they login
  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/auth/facebook/login-succeeded",
      failureRedirect: "/auth/facebook/login-failed",
    }),
    errorHandler
  );

  // ! MAY DELETE
  router.get("/auth/facebook/login-succeeded", (req, res) => {
    res.send({ message: ["Facebook login successfully"] });
  });

  // * after user login facebook failed send status and error message
  router.get("/auth/facebook/login-failed", (req, res) => {
    res
      .status(500)
      .send({ message: ["Facebook login failed for some reason"] });
  });

  /**
   ** passport facebook routes
   */

  /**
   ** passport google routes
   */

  // redirect users to google
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // fail login google
  router.get("/auth/google/login-failed", (req, res) => {
    res.status(500).send({ message: "Google Login failed for some reason" });
  });

  // successfully login google
  router.get("/auth/google/login-succeeded", (req, res) => {
    res.send({ message: "Google Login successfully" });
  });

  // Google redirect users through callback api
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/auth/google/login-succeeded",
      failureRedirect: "/auth/google/login-failed",
    }),
    errorHandler
  );

  /**
   ** passport facebook routes
   */

  return router;
};
