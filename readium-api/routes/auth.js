const router = require("express").Router();

const bcrypt = require("bcrypt");
const passport = require("passport");

const { decrypt, encrypt, issueJWT } = require("../utils/auth");
const User = require("../models/User");
const Response = require("../models/Response");
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
  let isValid =
    validator.validateEmail(email) & validator.validatePassword(password);

  const { responseObj } = res;
  if (!isValid) {
    const { displayName, ...errors } = validator.errors;
    responseObj.errors = errors;
    return res.status(400).send(responseObj);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      responseObj.messages = ["Could not find user"];
      // #swagger.responses[404] = { description: 'Could not find user' }
      return res.status(404).json(responseObj);
    }

    isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      responseObj.messages = ["Wrong password"];
      // #swagger.responses[400] = { description: 'Wrong password' }
      return res.status(400).json(responseObj);
    }
    // cookie
    // const token = issueJWT(user);
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });

    responseObj.messages = ["Login successfully"];
    // #swagger.responses[200] = { description: 'Login successfully' }
    return res.send({ ...responseObj, token: issueJWT(user) });
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

    const { responseObj } = res;
    responseObj.messages = ["Logout successfully"];
    // #swagger.responses[200] = { description: 'Logout successfully' }
    res.send(responseObj);
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

  const { responseObj } = res;
  if (!isValid) {
    const { displayName, ...errors } = validator.errors;
    responseObj.errors = errors;
    // #swagger.responses[400] = { description: 'Fields have errors' }
    return res.status(400).send(responseObj);
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
    responseObj.messages = ["Your email is already used"];
    // #swagger.responses[400] = { description: 'Email has already been used or fields have errors' }
    return res.status(400).send(responseObj);
  }
  responseObj.messages = [
    "Please activate your account with the link sent to your email!",
  ];
  // #swagger.responses[201] = { description: 'Account created' }
  return res.status(201).send({
    ...responseObj,
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

  const { responseObj } = res;
  if (!user) {
    responseObj.messages = ["User not found"];
    // #swagger.responses[404] = { description: 'User not found' }
    return res.status(404).send(responseObj);
  } else if (user.activated) {
    responseObj.messages = ["You went wrong"];
    // #swagger.responses[400] = { description: 'Account has already activated' }
    return res.status(400).send(responseObj);
  } else {
    user.activationLink = undefined;
    user.activated = true;
    await user.save();

    // cookie
    // const token = issueJWT(user);
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });

    responseObj.messages = ["You have activated your account successfully."];
    // #swagger.responses[200] = { description: 'Activate successfully' }
    return res.send({
      ...responseObj,
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
    successRedirect: clientUrl,
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
    const { responseObj } = res;

    responseObj.messages = ["Please check your mail and reset your password!"];
    if (!user) {
      return res.status(200).send(responseObj);
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
    const { password } = req.body;

    const { due, id } = decrypt([iv, hashedId]);
    const { responseObj } = res;
    if (new Date() >= new Date(due)) {
      responseObj.messages = [
        "Reset link dued, please request again to change your password",
      ];
      return res.status(400).send({
        ...responseObj,
      });
    }
    const user = await User.findById(id);

    if (!user) {
      responseObj.messages = ["Bad request"];
      // #swagger.responses[400] = { description: 'User not found but for security send 400' }
      return res.status(400).send(responseObj);
    }

    validator.resetErrors();
    const isValid = validator.validatePassword(password);
    if (!isValid) {
      responseObj.messages = [validator.errors.password];
      return res.status(400).send(responseObj);
    }

    user.password = password;
    user.resetLink = undefined;
    await user.save();
    responseObj.messages = ["Reset password successfully"];
    return res.send(responseObj);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
