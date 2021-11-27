const router = require("express").Router();

const bcrypt = require("bcrypt");
const passport = require("passport");

const { decrypt, encrypt, issueJWT } = require("../utils/auth");
const User = require("../models/User");
const { clientUrl } = require("../config");
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
  let isValid = validator.validateEmail(email);

  if (!isValid) {
    const { email } = validator.errors;
    return res.status(400).send({ message: email[0] });
  }

  isValid = validator.validatePassword(password);
  if (!isValid) {
    const { password } = validator.errors;
    return res.status(400).send({ message: password[0] });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // #swagger.responses[404] = { description: 'Could not find user' }
      return res.status(404).json({ message: "Could not find user" });
    }

    isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      // #swagger.responses[400] = { description: 'Wrong password' }
      return res.status(400).json({ message: "Wrong password" });
    }
    // cookie
    // const token = issueJWT(user);
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });

    // #swagger.responses[200] = { description: 'Login successfully' }
    return res.send({ message: "Login successfully", token: issueJWT(user) });
  } catch (err) {
    return next(err);
  }
});

router.get("/logout", (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Logout'

  // clear jwt cookie
  // res.clearCookie("jwt");
  res.clearCookie("connect.sid");

  req.logOut();
  req.session.destroy((err) => {
    if (err) return next(err);

    // #swagger.responses[200] = { description: 'Logout successfully' }
    res.send({ message: "Logout successfully" });
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
  let isValid = validator.validateEmail(email);
  if (!isValid) {
    const { email } = validator.errors;
    // #swagger.responses[400] = { description: 'Fields have errors' }
    return res.status(400).send({ message: email[0] });
  }

  isValid = validator.validatePassword(password);
  if (!isValid) {
    const { password } = validator.errors;
    return res.status(400).send({ message: password[0] });
  }

  const displayName = req.body.displayName || email.split("@")[0];
  const count = await User.find({ displayName }).countDocuments();
  const profileId = displayName + (count ? count : "");

  const newUser = new User({
    email,
    password,
    profileId,
    displayName,
    activated: false,
  });

  const [iv, encryptedId] = encrypt(newUser._id.toString());

  const activationLink = `${clientUrl}/auth/confirm?iv=${iv}&id=${encryptedId}`;
  newUser.activationLink = activationLink;
  try {
    await newUser.hashPassword();
    await newUser.save();
    await sendWelcomeEmail({ to: email, url: activationLink });
  } catch (err) {
    // #swagger.responses[400] = { description: 'Email has already been used or fields have errors' }
    return res.status(400).send({ message: "Your email is already used" });
  }
  // #swagger.responses[201] = { description: 'Account created' }
  return res.status(201).send({
    message: "Please activate your account with the link sent to your email!",
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
  if (!iv || !hashedId) {
    return res.status(400).send({
      message: "Please provide enough query params. Missing iv or id",
    });
  }
  let decryptedId;
  try {
    decryptedId = decrypt([iv, hashedId]);
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Please provide correct parameters to this endpoint" });
  }

  const user = await User.findById(decryptedId);

  if (!user) {
    // #swagger.responses[404] = { description: 'User not found' }
    return res.status(404).send({ message: "User not found" });
  } else if (user.activated) {
    // #swagger.responses[400] = { description: 'Account has already activated' }
    return res.status(400).send({ message: "Account is already activated" });
  } else {
    user.activationLink = undefined;
    user.activated = true;
    await user.save();

    // #swagger.responses[200] = { description: 'Activate successfully' }
    return res.send({
      message: "You have activated your account successfully.",
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
    successRedirect: clientUrl,
    failureRedirect: "/auth/facebook/login-failed",
  })
);

router.get("/facebook/login-failed", (req, res) => {
  // #swagger.ignore = true
  res.status(500).send({ message: "Facebook login failed for some reason" });
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
    successRedirect: clientUrl,
    failureRedirect: "/auth/google/login-failed",
  })
);

router.get("/google/login-failed", (req, res) => {
  // #swagger.ignore = true
  res.status(500).send({ message: "Google Login failed for some reason" });
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
      return res
        .status(200)
        .send({ message: "Please check your mail and reset your password!" });
    }

    const due = new Date();
    due.setDate(due.getDate() + 7);

    const [iv, hashedId] = encrypt({ due, id: user._id.toString() });
    const resetLink = `${clientUrl}/auth/reset?iv=${iv}&id=${hashedId}`;
    user.resetLink = resetLink;
    await user.save();
    await sendResetPasswordEmail({ to: user.email, url: resetLink });

    // #swagger.responses[200] = { description: 'Request change password successfully or User not found but Mlem ' }
    return res.send({
      message: "Please check your mail and reset your password!",
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
    const { password } = req.body;

    if (!iv || !hashedId) {
      return res.status(400).send({
        message: "Please provide both iv and id to reset your password",
      });
    }

    const { due, id } = decrypt([iv, hashedId]);
    const dueDate = new Date(due);

    if (!due || !id || dueDate.toString() === "Invalid Date") {
      return res
        .status(400)
        .send({ message: "Your reset link is wrong. Please try again!" });
    }

    if (new Date() >= dueDate) {
      return res.status(400).send({
        message:
          "Reset link dued, please request again to change your password",
      });
    }
    const user = await User.findById(id);

    if (!user) {
      // #swagger.responses[400] = { description: 'User not found but for security send 400' }
      return res.status(400).send({ message: "Bad request" });
    }

    validator.resetErrors();
    const isValid = validator.validatePassword(password);
    if (!isValid) {
      return res.status(400).send({ message: validator.errors.password[0] });
    }

    user.password = password;
    user.resetLink = undefined;
    await user.save();

    return res.send({ message: "Reset password successfully" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
