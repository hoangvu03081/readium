const router = require("express").Router();

const { createAvatar } = require("@dicebear/avatars");
const style = require("@dicebear/avatars-initials-sprites");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
const passport = require("passport");

const {
  decrypt,
  encrypt,
  issueJWT,
  authMiddleware,
  checkEmpty,
  validateEmail,
  validatePassword,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  removeAccents,
} = require("../utils");
const User = require("../models/User");
const { clientUrl } = require("../config/url");
const { putUser } = require("../utils/elasticsearch");

router.post("/", async (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User Login'
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
      return res.status(404).json({ message: "User not found" });
    }

    isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = issueJWT(user);

    if (!user.tokens) user.tokens = [];
    user.tokens.push(token);
    await user.save();

    return res.send({ token });
  } catch (err) {
    return next(err);
  }
});

router.get("/logout", authMiddleware, async (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User Logout'
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
    return res.send({ message: "Logout successfully" });
  });
});

router.get("/logout-all", authMiddleware, async (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User Logout from all devices'
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
    res.send({ message: "Logout successfully" });
  });
});

router.post("/register", async (req, res) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User Register by email'
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
  try {
    const { email, password } = req.body;

    let errMessage = checkEmpty(email, "Email must not be empty");
    errMessage = errMessage || validateEmail(email);
    errMessage =
      errMessage || checkEmpty(password, "Password must not be empty");
    errMessage = errMessage || validatePassword(password);

    if (errMessage) {
      // #swagger.responses[400] = { description: 'Fields have errors' }
      return res.status(400).send({ message: errMessage });
    }

    const displayName = email
      .trim()
      .split(/[.@]/)
      .find((word) => Boolean(word));

    const profileIdBase = removeAccents(displayName)
      .toLowerCase()
      .replace(/ +/g, "-");

    const count = await User.find({
      profileId: profileIdBase,
    }).countDocuments();

    const profileId = profileIdBase + (count ? "." + count : "");

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
      avatar,
      email,
      password,
      profileId,
      displayName,
    });

    const newUserId = newUser._id.toString();
    const [iv, encryptedId] = encrypt(newUserId);

    const activationLink = `${clientUrl}/auth/confirm?iv=${iv}&id=${encryptedId}`;
    newUser.activationLink = activationLink;
    await newUser.hashPassword();
    await newUser.save();
    await sendWelcomeEmail({ to: email, url: activationLink });
    const newUserObject = newUser.getElastic();
    await putUser(newUserId, newUserObject);

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
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User CONFIRM their account'
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
  try {
    const decryptedId = decrypt([iv, hashedId]);
    const user = await User.findById(decryptedId);

    if (!user) {
      // #swagger.responses[404] = { description: 'User not found' }
      return res.status(404).send({ message: "User not found" });
    } else if (user.activated) {
      // #swagger.responses[400] = { description: 'Account has already activated' }
      return res.status(400).send({ message: "Account is already activated" });
    }

    const token = issueJWT(user);

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
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Please provide correct parameters to this endpoint" });
  }
});

// redirect user to facebook
// * getting permissions for:
//   + email
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    /*
      #swagger.tags = ['Auth']
      #swagger.summary = 'User Login by Facebook'
    */
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
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login Google'
  */
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

router.get("/reset", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = "Send reset password link to authenticated users"
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const user = req.user;
    await user.sendResetLink();
    await sendResetPasswordEmail({ to: user.email, url: user.resetLink });
    return res.send({
      message: "Please check your mail and reset your password!",
    });
  } catch (err) {
    return res.send({
      message: "Some errors occurred in reset password (GET)",
    });
  }
});

router.post("/forget", async (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Users forget password'
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

    // const due = new Date();
    // due.setDate(due.getDate() + 7);

    // const [iv, hashedId] = encrypt({ due, id: user._id.toString() });
    // const resetLink = `${clientUrl}/auth/reset?iv=${iv}&id=${hashedId}`;

    // user.resetLink = resetLink;
    // user.resetTimeout = due;

    // await user.save();

    await user.sendResetLink();

    await sendResetPasswordEmail({ to: user.email, url: user.resetLink });
    // #swagger.responses[200] = { description: 'Request change password successfully ' }
    return res.send({
      message: "Please check your mail and reset your password!",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong in the forget password request process",
    });
  }
});

router.post("/reset", async (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Users reset password'
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

    if (user.resetTimeout.getTime() !== dueDate.getTime()) {
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
    user.resetLink = undefined;
    user.password = password;
    await user.hashPassword();

    await user.save();
    return res.send({ message: "Reset password successfully" });
  } catch (err) {
    return next(err);
  }
});

router.post("/change-password", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User change password'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/ChangePassword"
          }  
        }
      }
    }
  */
  try {
    const { oldPassword, password } = req.body;
    const { user } = req;

    if (!oldPassword || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both old password and new password" });
    }

    const isSamePassword = await bcrypt.compare(oldPassword, user.password);

    if (!isSamePassword) {
      // #swagger.responses[400] = { description: 'Typed in wrong password' }
      return res.status(400).send({ message: "Wrong password." });
    }

    let errMessage = checkEmpty(password, "Password must not be empty");
    errMessage = errMessage || validatePassword(password);

    user.password = password;
    await user.hashPassword();

    await user.save();
    // #swagger.responses[200] = { description: 'Saving changed password successfully' }
    return res.send({ message: "Change the password successfully" });
  } catch (err) {
    // #swagger.responses[500] = { description: 'Saving user to mongodb has some errors' }
    return res
      .status(500)
      .send({ message: "Some errors occured when changing the password" });
  }
});

module.exports = router;
