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

// * login routes
router.post("/", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Login'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: {
                $ref: "#/definitions/LoginUser"
            }  
        }
      }
    } */

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // #swagger.responses[404] = { description: 'Could not find user' }
      return res.status(404).json({ message: ["Could not find user"] });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      // #swagger.responses[400] = { description: 'Wrong password' }
      return res.status(400).json({ message: ["Wrong password"] });
    }

    const token = issueJWT(user);
    // #swagger.responses[200] = { description: 'Login successfully' }
    return res.send({ message: ["Login successfully"], token });
  } catch (err) {
    return next(err);
  }
});

router.get("/logout", (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Logout'

  req.logOut();
  req.session.destroy((err) => {
    if (err) return next(err);
    // #swagger.responses[200] = { description: 'Logout successfully' }
    res.send({ message: ["Log out successfully"] });
  });
});

// * create user
router.post("/register", async (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Register by email'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: {
                $ref: "#/definitions/RegisterUser"
            }  
        }
      }
    } */

  const { email, password, fullname } = req.body;

  validator.resetErrors();
  const isValid =
    validator.checkEmpty("email", email) &
    validator.checkEmpty("password", password) &
    validator.checkEmpty("fullname", fullname) &
    validator.validateEmail(email) &
    validator.validatePassword(password) &
    validator.validateFullname(fullname);

  if (!isValid) {
    // #swagger.responses[400] = { description: 'Fields have errors' }
    return res.status(400).send({ errors: validator.errors });
  }

  const newUser = new User({
    email,
    password,
    fullname,
    activated: false,
  });

  const activation_link = `${url}/auth/activate/${newUser._id}`;
  newUser.activation_link = activation_link;
  await sendWelcomeEmail({ to: email, url: activation_link });
  try {
    await newUser.save();
  } catch (err) {
    // #swagger.responses[400] = { description: 'Email has already been used or Fields have erros' }
    return res.status(400).send({ message: ["Your email is already used"] });
  }
  const token = issueJWT(newUser);
  // #swagger.responses[201] = { description: 'Account created' }
  return res.status(201).send({
    message: ["Please activate your account with the link sent to your email!"],
    token,
  });
});

// * activate api
router.get("/activate/:id", async (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Activate their account'

  const user = await User.findById(req.params.id);
  if (user.activated) {
    // #swagger.responses[400] = { description: 'Account has already activated' }
    return res
      .status(400)
      .send({ message: ["Your account is already activated"] });
  } else if (!user) {
    // #swagger.responses[404] = { description: 'User not found' }
    return res.status(404).send({ message: ["User not found!"] });
  } else {
    user.activation_link = undefined;
    user.activated = true;
    await user.save();
    // #swagger.responses[200] = { description: 'Activate successfully' }
    return res.send({
      message: ["You have activated your account successfully."],
    });
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
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Login by Facebook'
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

// facebook redirect users after they login
router.get(
  "/facebook/callback",
  // #swagger.ignore = true
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Facebook redirect after authenticate users'
  passport.authenticate("facebook", {
    successRedirect: "/auth/facebook/login-succeeded",
    failureRedirect: "/auth/facebook/login-failed",
  })
);

// ! MAY DELETE
router.get("/facebook/login-succeeded", (req, res) => {
  // #swagger.ignore = true
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Login Facebook successfully'
  res.send({ message: ["Facebook login successfully"] });
});

// * after user login facebook failed send status and error message
router.get("/facebook/login-failed", (req, res) => {
  // #swagger.ignore = true
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Login Facebook failed'
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
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Login Google'
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google redirect users through callback api
router.get(
  "/google/callback",
  // #swagger.ignore = true
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Google Redirect after authenticated'
  passport.authenticate("google", {
    successRedirect: "/auth/google/login-succeeded",
    failureRedirect: "/auth/google/login-failed",
  })
);

// fail login google
router.get("/google/login-failed", (req, res) => {
  // #swagger.ignore = true
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Google Login Failed'
  res.status(500).send({ message: "Google Login failed for some reason" });
});

// successfully login google
router.get("/google/login-succeeded", (req, res) => {
  // #swagger.ignore = true
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Google Login Successfully'
  res.send({ message: "Google Login successfully" });
});

// request forget password
router.post("/forget", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Users forget password'
  try {
    // find user in database
    const user = await User.findOne({ email: req.body.email });

    // send to user email if found in database;
    if (user) {
      // ? where should resetLink be ?
      const resetLink = `${url}/forget/${user._id}`;
      await sendResetPasswordEmail({ to: user.email, url: resetLink });

      // #swagger.responses[200] = { description: 'Request change password successfully' }
      return res.send({
        message: ["Please check your mail and reset your password!"],
      });
    }

    // #swagger.responses[404] = { description: 'User not found' }
    return res.status(404).send({ message: ["User is not found"] });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
