const router = require("express").Router();

const { createAvatar } = require("@dicebear/avatars");
const style = require("@dicebear/avatars-initials-sprites");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { decrypt, encrypt, issueJWT, authMiddleware } = require("../utils/auth");
const User = require("../models/User");
const { clientUrl } = require("../config/url");
const {
  checkEmpty,
  validateEmail,
  validatePassword,
} = require("../utils/validator");
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

  let errMessage = checkEmpty(email, "Email must not be empty");
  errMessage = errMessage || validateEmail(email);
  errMessage = errMessage || checkEmpty(password, "Password must not be empty");
  errMessage = errMessage || validatePassword(password);

  if (errMessage) {
    return res.status(400).send({ message: errMessage });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // #swagger.responses[404] = { description: 'Wrong email' }
      return res.status(404).json({ message: "Wrong email" });
    }

    isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      // #swagger.responses[400] = { description: 'Wrong password' }
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = issueJWT(user._id);

    if (!user.tokens) user.tokens = [];
    user.tokens.push(token);
    await user.save();

    // #swagger.responses[200] = { description: 'Login successfully' }
    return res.send({
      message: "Login successfully",
      token,
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/logout", authMiddleware, async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Logout'
  /**
    #swagger.security = [{
      "bearerAuth": []
    }]
   */
  const index = req.user.tokens.indexOf(req.headers.authorization);
  if (index !== -1) req.user.tokens.splice(index, 1);
  await req.user.save();

  res.clearCookie("connect.sid");
  req.logOut();

  req.session.destroy((err) => {
    if (err) return next(err);
    // #swagger.responses[200] = { description: 'Logout successfully' }
    res.send({ message: "Logout successfully" });
  });
});

router.get("/logout-all", authMiddleware, async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User Logout from all devices'
  /**
    #swagger.security = [{
      "bearerAuth": []
    }]
   */
  req.user.tokens = [];
  await req.user.save();

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

  const { email, password, displayName: dN } = req.body;

  let errMessage = checkEmpty(email, "Email must not be empty");
  errMessage = errMessage || validateEmail(email);
  errMessage = errMessage || checkEmpty(password, "Password must not be empty");
  errMessage = errMessage || validatePassword(password);

  if (errMessage) {
    // #swagger.responses[400] = { description: 'Fields have errors' }
    return res.status(400).send({ message: errMessage });
  }

  const displayName = dN || email.split("@")[0];
  const count = await User.find({ displayName }).countDocuments();
  const profileId = displayName + (count ? count : "");

  // avatar
  const avatarSvg = createAvatar(style, {
    seed: displayName,
  });
  const avatar = await sharp(Buffer.from(avatarSvg, "utf-8"), {
    density: 50000,
  })
    .resize({ width: 200, fit: sharp.fit.contain })
    .png()
    .toBuffer();

  const newUser = new User({
    // avatar,
    email,
    password,
    profileId,
    displayName,
  });

  const [iv, encryptedId] = encrypt(newUser._id.toString());

  const activationLink = `${clientUrl}/auth/confirm?iv=${iv}&id=${encryptedId}`;
  newUser.activationLink = activationLink;
  try {
    await newUser.hashPassword();
    await newUser.save();
    await sendWelcomeEmail({ to: email, url: activationLink });

    // #swagger.responses[201] = { description: 'Account created' }
    return res.status(201).send({
      message: "Please activate your account with the link sent to your email!",
      user: newUser.getPublicProfile(),
    });
  } catch (err) {
    // #swagger.responses[400] = { description: 'Email has already been used or fields have errors' }
    return res.status(400).send({ message: "Your email is already used" });
  }
});

router.get("/confirm", async (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User CONFIRM their account'
  /*
    #swagger.parameters['iv'] = {
      in: 'query',
      required: true,
      type: 'string',
    }
    #swagger.parameters['id'] = {
      description: 'hashed user id',
      in: 'query',
      required: true,
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
  }

  const token = issueJWT(user._id);

  if (!user.tokens) user.tokens = [];
  user.tokens.push(token);

  user.activationLink = undefined;
  user.activated = true;
  await user.save();

  // #swagger.responses[200] = { description: 'Activate successfully' }
  return res.send({
    message: "You have activated your account successfully.",
    token,
  });
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
        .status(404)
        .send({ message: "Your account is not registered! Please register." });
    }

    const due = new Date();
    due.setDate(due.getDate() + 7);

    const [iv, hashedId] = encrypt({ due, id: user._id.toString() });
    const resetLink = `${clientUrl}/auth/reset?iv=${iv}&id=${hashedId}`;

    user.resetLink = resetLink;
    user.resetTimeout = due;
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
      required: true,
      type: 'string',
    }
    #swagger.parameters['id'] = {
      description: 'hashed user id',
      in: 'query',
      required: true,
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
      // #swagger.responses[404] = { description: 'User not found' }
      return res.status(404).send({ message: "User not found" });
    }

    if (user.resetTimeout.toString() !== dueDate.toString()) {
      return res
        .status(400)
        .send({ message: "Please don't hack this endpoint" });
    }

    let errMessage = checkEmpty(password, "Password must not be empty");
    errMessage = errMessage || validatePassword(password);
    if (errMessage) {
      return res.status(400).send({ message: errMessage });
    }

    user.resetTimeout = undefined;

    user.password = password;
    await user.hashPassword();
    user.resetLink = undefined;
    await user.save();

    return res.send({ message: "Reset password successfully" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
