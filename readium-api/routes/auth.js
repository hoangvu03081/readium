const router = require("express").Router();

const bcrypt = require("bcrypt");
const passport = require("passport");

const { decrypt, encrypt, issueJWT } = require("../utils/auth");
const User = require("../models/User");
const { url } = require("../config");
const validator = require("../utils/validator/Validator");
const {
  sendWelcomeEmail,
  sendResetPasswordEmail,
} = require("../utils/sendMail");

router.post("/", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Login'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/LoginUser"
          }  
        }
      }
    }
  */

  const { email, password } = req.body;

  validator.resetErrors();
  let isValid =
    validator.validateEmail(email) & validator.validatePassword(password);

  if (!isValid) {
    const { displayName, ...errors } = validator.errors;
    return res.status(400).send({ errors });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // #swagger.responses[404] = { description: 'Could not find user' }
      return res.status(404).json({ message: ["Could not find user"] });
    }

    isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      // #swagger.responses[400] = { description: 'Wrong password' }
      return res.status(400).json({ message: ["Wrong password"] });
    }

    // #swagger.responses[200] = { description: 'Login successfully' }
    return res.send({ message: ["Login successfully"], token: issueJWT(user) });
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

router.post("/register", async (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Register by email'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: {
                $ref: "#/definitions/RegisterUser"
            }  
        }
      }
    } 
  */

  const { email, password } = req.body;

  validator.resetErrors();
  const isValid =
    validator.validateEmail(email) & validator.validatePassword(password);

  if (!isValid) {
    const { displayName, ...errors } = validator.errors;
    // #swagger.responses[400] = { description: 'Fields have errors' }
    return res.status(400).send({ errors });
  }

  const newUser = new User({
    email,
    password,
    displayName: email.split('@')[0],
    activated: false,
  });

  const [iv, encryptedId] = encrypt(newUser._id.toString());

  const activationLink = `${url}/auth/confirm?iv=${iv}&id=${encryptedId}`;
  newUser.activationLink = activationLink;
  try {
    await sendWelcomeEmail({ to: email, url: activationLink });
    await newUser.save();
  } catch (err) {
    // #swagger.responses[400] = { description: 'Email has already been used or fields have errors' }
    return res.status(400).send({ message: ["Your email is already used"] });
  }
  // #swagger.responses[201] = { description: 'Account created' }
  return res.status(201).send({
    message: ["Please activate your account with the link sent to your email!"],
  });
});

router.get("/confirm", async (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User CONFIRM their account'
  /*
    #swagger.parameters['iv'] = {
      in: 'query',
      required: 'true',
      type: 'string',
    }
    #swagger.parameters['id'] = {
      description: 'hashed user id',
      in: 'query',
      required: 'true',
      type: 'string',
    }
  */

  const { iv, id: hashedId } = req.query;
  const decryptedId = decrypt([iv, hashedId]);

  const user = await User.findById(decryptedId);

  if (!user) {
    // #swagger.responses[404] = { description: 'User not found' }
    return res.status(404).send({ message: ["User not found"] });
  } else if (user.activated) {
    // #swagger.responses[400] = { description: 'Account has already activated' }
    return res.status(400).send({ message: ["You went wrong"] });
  } else {
    user.activationLink = undefined;
    user.activated = true;
    await user.save();

    // #swagger.responses[200] = { description: 'Activate successfully' }
    return res.send({
      message: ["You have activated your account successfully."],
      token: issueJWT(user),
    });
  }
});

// redirect user to facebook
// * getting permissions for:
//   + email
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'User Login by Facebook'
    scope: ["email"],
  })
);

// facebook redirect users after they login
router.get(
  "/facebook/callback",
  // #swagger.ignore = true
  passport.authenticate("facebook", {
    successRedirect: "/auth/facebook/login-succeeded",
    failureRedirect: "/auth/facebook/login-failed",
  })
);

router.get("/facebook/login-succeeded", (req, res) => {
  // #swagger.ignore = true
  res.send({ message: ["Facebook login successfully"] });
});

router.get("/facebook/login-failed", (req, res) => {
  // #swagger.ignore = true
  res.status(500).send({ message: ["Facebook login failed for some reason"] });
});

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
  passport.authenticate("google", {
    successRedirect: "/auth/google/login-succeeded",
    failureRedirect: "/auth/google/login-failed",
  })
);

router.get("/google/login-failed", (req, res) => {
  // #swagger.ignore = true
  res.status(500).send({ message: "Google Login failed for some reason" });
});

router.get("/google/login-succeeded", (req, res) => {
  // #swagger.ignore = true
  res.send({ message: "Google Login successfully" });
});

router.post("/forget", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Users forget password'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Email"
          }  
        }
      }
    } 
  */

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // #swagger.responses[404] = { description: 'User not found' }
      return res.status(404).send({ message: ["User is not found"] });
    }

    const [iv, hashedId] = encrypt(user._id.toString());
    const resetLink = `${url}/auth/reset?iv=${iv}&id=${hashedId}`;
    user.resetLink = resetLink;
    await user.save();
    await sendResetPasswordEmail({ to: user.email, url: resetLink });

    // #swagger.responses[200] = { description: 'Request change password successfully' }
    return res.send({
      message: ["Please check your mail and reset your password!"],
    });
  } catch (err) {
    return next(err);
  }
});

// request forget password
router.post("/reset", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Users reset password'
  /*
    #swagger.parameters['iv'] = {
      in: 'query',
      required: 'true',
      type: 'string',
    }
    #swagger.parameters['id'] = {
      description: 'hashed user id',
      in: 'query',
      required: 'true',
      type: 'string',
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/ResetPassword"
          }  
        }
      }
    } 
  */
  try {
    const { iv, id: hashedId } = req.query;
    const { password, password2 } = req.body;

    const id = decrypt([iv, hashedId]);
    const user = await User.findById(id);

    if (!user) {
      // #swagger.responses[400] = { description: 'User not found' }
      return res.status(400).send({ message: ["Bad request"] });
    }

    if (password !== password2) {
      // #swagger.responses[400] = { description: 'Retype wrong' }
      return res.status(400).send({
        message: ["Your password must match"],
      });
    }

    validator.resetErrors();
    const isValid = validator.validatePassword(password);
    if (!isValid) {
      return res
        .status(400)
        .send({ errors: { password: validator.errors.password } });
    }

    user.password = password;
    user.resetLink = undefined;
    await user.save();
    return res.send({ message: ["Reset password successfully"] });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
