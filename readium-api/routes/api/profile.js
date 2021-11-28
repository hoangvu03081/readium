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

  user.displayName = displayName || user.displayName;
  user.biography = biography || user.biography;
  user.job = job || user.job;

  // validation for displayName
  validator.resetErrors();
  const isValid = validator.validateDisplayName(user.displayName);

  if (!isValid) {
    // #swagger.responses[400] = { description: 'User input displayName with errors' }
    return res.status(400).send({ message: validator.errors.displayName[0] });
  }

  try {
    await user.save();
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occured when editing the profile" });
  }

  // #swagger.responses[200] = { description: 'Successfully edit profile' }
  return res.send(user.getPublicProfile());
});

const uploadAva = multer({
  limits: {
    fields: 0,
    fileSize: 5e6, // max 5mb
    files: 1,
  },
  fileFilter(req, file, cb) {
    const mimeRe = /^image\/(jpeg|png|webp|avif|tiff|gif|svg\+xml)$/;
    const nameRe = /\.(jpeg|png|webp|avif|tiff|gif|svg)$/;
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
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
);

router.get("/:profileId", async (req, res) => {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Get others' profile'

  const user = await User.findOne({ profileId: req.params.profileId });
  if (user) return res.send(user.getPublicProfile());

  return res.status(404).send({ message: "User not found" });
});

//TODO need test
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
  res.set("Content-Type", "image/png");

  if (!req.params.id) {
    // #send back user's avatar if id is undefined
    return res.send(req.user.avatar);
  }

  try {
    const { avatar } = await User.findById(req.params.id, { avatar: 1 });
    // #swagger.responses[200] = { description: 'Send back user avatar' }
    return res.send(avatar);
  } catch (err) {
    // #swagger.responses[500] = { description: 'Object Id is error or mongodb error' }
    return res.status(500).send({ message: "Error when fetching avatar" });
  }
});

module.exports = router;
