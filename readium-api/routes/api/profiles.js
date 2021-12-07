const router = require("express").Router();

const sizeOf = require("image-size");
const sharp = require("sharp");
const multer = require("multer");

const User = require("../../models/User");
const { authMiddleware } = require("../../utils/auth");
const {
  validateDisplayName,
  validateEmail,
  validateURL,
} = require("../../utils/validator");

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

router.patch("/", authMiddleware, async (req, res) => {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Edit profile'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/EditProfile"
          }  
        }
      }
    }
  */

  const {
    displayName,
    biography,
    job,
    facebook,
    twitter,
    instagram,
    mail,
  } = req.body;
  const user = req.user;

  user.displayName = displayName ?? user.displayName;
  user.biography = biography ?? user.biography;
  user.job = job ?? user.job;
  user.facebook = facebook ?? user.facebook;
  user.twitter = twitter ?? user.twitter;
  user.instagram = instagram ?? user.instagram;
  user.mail = mail ?? user.mail;

  let errMessage;

  if (displayName) errMessage = validateDisplayName(displayName);
  if (mail) errMessage = validateEmail(mail);
  if (facebook) errMessage = validateURL(facebook);
  if (twitter) errMessage = validateURL(twitter);
  if (instagram) errMessage = validateURL(instagram);

  if (errMessage) {
    return res.status(400).send({ message: errMessage });
  }

  try {
    await user.save();
    // #swagger.responses[200] = { description: 'Successfully edit profile' }
    return res.send(user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occured when editing the profile" });
  }
});

const uploadAva = multer({
  limits: {
    fields: 0,
    fileSize: 5e6, // max 5mb
    files: 1,
  },
  fileFilter(req, file, cb) {
    const mimeRe = /^image\/(jpg|jpeg|png|webp|avif|tiff|gif|svg\+xml)$/;
    const nameRe = /\.(jpg|jpeg|png|webp|avif|tiff|gif|svg)$/;
    if (mimeRe.test(file.mimetype) && nameRe.test(file.originalname)) {
      return cb(null, true);
    }
    return cb(new Error("Your type of file is not acceptable"));
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
    //TODO need test
    const { width, height } = sizeOf(req.file.buffer);
    const sharpInstance = sharp(req.file.buffer);

    if (width > 200)
      sharpInstance.resize({ width: 200, fit: sharp.fit.inside });
    if (height > 200)
      sharpInstance.resize({ height: 200, fit: sharp.fit.inside });
    const buffer = await sharpInstance.png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send({ message: "oke" });
  },
  (err, req, res, next) => {
    return res.status(400).send({ message: err.message });
  }
);

router.get("/avatar", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = "Get my avatar"
    #swagger.security = [{
      "bearerAuth": []
    }]
  */

  return res.set("Content-Type", "image/png").send(req.user.avatar);
});

router.get("/avatar/:id", async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = "Get specific user's avatar"
    #swagger.parameters['id'] = {
      description: 'user id',
      in: 'path',
      type: 'string',
    }
  */
  if (!req.params.id) {
    return res.status(400).send({ message: "Please provide user's id" });
  }
  res.set("Content-Type", "image/png");

  try {
    const { avatar } = await User.findById(req.params.id, { avatar: 1 });
    // #swagger.responses[200] = { description: 'Send back user avatar' }
    return res.send(avatar);
  } catch (err) {
    // #swagger.responses[500] = { description: 'Object Id is error or mongodb error' }
    return res
      .set("Content-Type", "application/json")
      .status(500)
      .send({ message: "Error when fetching avatar" });
  }
});

router.get("/:profileId", async (req, res) => {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Get others' profile'

  const user = await User.findOne({ profileId: req.params.profileId });
  if (user) return res.send(user.getPublicProfile());

  return res.status(404).send({ message: "User not found" });
});

module.exports = router;
