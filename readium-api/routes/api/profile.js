/**
 ** Profile related routes
 */

const router = require("express").Router();

const sizeOf = require("image-size");
const sharp = require("sharp");
const multer = require("multer");

const User = require("../../models/User");
const { authMiddleware } = require("../../utils/auth");
const validator = require("../../utils/validator/Validator");

router.get("/", authMiddleware, async (req, res) => {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Get my profile'
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
   */
  return res.send(req.user.getPublicProfile());
});

router.patch("/?", authMiddleware, async (req, res) => {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Edit subfield'

  /*
    #swagger.parameters['displayName'] = {
      in: 'query',
      type: 'boolean',
    }
    #swagger.parameters['biography'] = {
      in: 'query',
      type: 'boolean',
    }
    #swagger.parameters['job'] = {
      in: 'query',
      type: 'boolean',
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/EditProfile"
          }  
        }
      }
    }
  */

  const user = req.user;
  const { responseObj } = res;

  let { displayName: dN, biography: b, job: j } = req.query;
  const { displayName, biography, job } = req.body;

  dN = dN === "true";
  b = b === "true";
  j = j === "true";

  const updateObj = {};
  if (dN) updateObj.displayName = displayName;
  if (b) updateObj.biography = biography;
  if (j) updateObj.job = job;

  if (dN && !displayName) {
    responseObj.messages.push("Please provide a display name to edit it!");
  }
  if (b && (biography === undefined || biography === void 0)) {
    responseObj.messages.push("Please provide a biography to edit it!");
  }
  if (j && (job === undefined || job === void 0)) {
    responseObj.messages.push("Please provide a job to edit it!");
  }
  
  if (responseObj.messages.length) return res.status(400).send(responseObj);
  
  if (dN) {
    validator.resetErrors();
    const isValid = validator.validateDisplayName(displayName);
    if (!isValid) {
      responseObj.messages = [validator.errors.displayName];
      // #swagger.responses[400] = { description: 'User input displayName with errors' }
      return res.status(400).send(responseObj);
    }
  }

  try {
    for (let key in updateObj) {
      user[key] = updateObj[key] === "" ? undefined : updateObj[key];
    }
    await user.save();
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    responseObj.messages = ["Some errors occured when editing the profile"];
    return res
      .status(500)
      .send({ message: ["Some errors occured when editing the profile"] });
  }

  return res.send(updateObj);
});

router.patch("/", authMiddleware, async (req, res) => {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Edit profile'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/EditProfile"
          }  
        }
      }
    }
  */

  const { displayName, biography, job } = req.body;
  const user = req.user;
  const { responseObj } = res;

  user.displayName = displayName || user.displayName;
  user.biography = biography || user.biography;
  user.job = job || user.job;

  // validation for displayName
  validator.resetErrors();
  const isValid = validator.validateDisplayName(user.displayName);

  if (!isValid) {
    responseObj.messages = [validator.errors.displayName];
    // #swagger.responses[400] = { description: 'User input displayName with errors' }
    return res.status(400).send(responseObj);
  }

  try {
    await user.save();
  } catch (err) {
    responseObj.messages = ["Some errors occured when editing the profile"];
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res.status(500).send(responseObj);
  }

  const resObj = {};
  if (displayName) resObj.displayName = displayName;
  if (biography) resObj.biography = biography;
  if (job) resObj.job = job;

  // #swagger.responses[200] = { description: 'Successfully edit profile' }
  return res.send(resObj);
});

const uploadAva = multer({
  fileFilter(req, file, cb) {
    const mimeRe = /^image\/(jpeg|png|webp|avif|tiff|gif|svg\+xml)$/;
    const nameRe = /\.(jpeg|png|webp|avif|tiff|gif|svg)$/;
    if (mimeRe.test(file.mimetype) && nameRe.test(file.originalname)) {
      return cb(null, true); // accept
    }
    return cb(new Error("Your type of file is not acceptable"));
  },
  limits: {
    fields: 0,
    fileSize: 5e6,
    files: 1,
  },
});

router.post(
  "/",
  authMiddleware,
  uploadAva.single("avatar"),
  async (req, res) => {
    // #swagger.tags = ['Profile']
    // #swagger.summary = 'Upload avatar'
    /*
    #swagger.requestBody = {
      content: {
        "multipart/form-data": {
          schema: {
            type: 'object',
            properties: {
              avatar: {
                type: 'file',
              }
            }
          }
        }
      }
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
    const { width, height } = sizeOf(req.file.buffer);
    const sharpInstance = sharp(req.file.buffer);

    if (width > 200)
      sharpInstance.resize({ width: 200, fit: sharp.fit.inside });
    if (height > 200)
      sharpInstance.resize({ height: 200, fit: sharp.fit.inside });
    const buffer = await sharpInstance.png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send("oke");
  },
  (err, req, res, next) => {
    console.log(err);
    const { responseObj } = res;
    responseObj.messages = [err.message];
    return res.status(400).send(responseObj);
  }
);

router.get("/:profileId", async (req, res) => {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Get others' profile'

  const user = await User.findOne({ profileId: req.params.profileId });
  if (user) return res.send(user.getPublicProfile());
  const { responseObj } = res;
  responseObj.messages = ["User not found"];
  return res.status(404).send(responseObj);
});

router.get("/avatar/:id", async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get specific user's avatar'
  /*
    #swagger.parameters['id'] = {
      description: 'user id',
      in: 'path',
      type: 'string',
    }
  */
  const { responseObj } = res;
  if (!req.params.id) {
    responseObj.messages = ["Please send user id"];
    // #swagger.responses[400] = { description: 'Send back user avatar' }
    return res.status(400).send(responseObj);
  }
  try {
    const avatar = await User.findById(req.params.id, { avatar: 1 });
    res.set("Content-Type", "image/png");
    // #swagger.responses[200] = { description: 'Send back user avatar' }
    return res.send(avatar.avatar);
  } catch (err) {
    responseObj.messages = ["Error when fetching avatar"];
    // #swagger.responses[500] = { description: 'Object Id is error or mongodb error' }
    return res.status(500).send(responseObj);
  }
});

module.exports = router;
