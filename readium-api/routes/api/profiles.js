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
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Get my profile'
    #swagger.security = [{
      "bearerAuth": []
    }]
   */
  return res.send(req.user.getPublicProfile());
});

router.patch("/", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Edit profile'
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

  try {
    const {
      displayName,
      biography,
      job,
      facebook,
      twitter,
      instagram,
      contactEmail,
    } = req.body;
    const { user } = req;

    let errMessage;
    if (displayName) errMessage = validateDisplayName(displayName);
    if (contactEmail) errMessage = validateEmail(contactEmail);
    if (facebook) errMessage = validateURL(facebook);
    if (twitter) errMessage = validateURL(twitter);
    if (instagram) errMessage = validateURL(instagram);

    if (errMessage) {
      return res.status(400).send({ message: errMessage });
    }

    user.displayName = displayName ?? user.displayName;
    user.biography = biography ?? user.biography;
    user.job = job ?? user.job;
    user.facebook = facebook ?? user.facebook;
    user.twitter = twitter ?? user.twitter;
    user.instagram = instagram ?? user.instagram;
    user.contactEmail = contactEmail ?? user.contactEmail;

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

router.put("/display-name", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Edit display name'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: {
            properties: {
              displayName: {
                type: 'string',
                default: 'display name',
              }
            }
          }  
        }
      }
    }
  */

  try {
    const { displayName } = req.body;
    const { user } = req;

    if (!displayName) {
      return res.status(400).send({ message: "Please provide display name" });
    }

    let errMessage = validateDisplayName(displayName);
    if (errMessage) {
      return res.status(400).send({ message: errMessage });
    }

    user.displayName = displayName;
    await user.save();
    // #swagger.responses[200] = { description: 'Successfully edit display name' }
    return res.send(user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occured when editing display name" });
  }
});

router.put("/biography", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Edit biography'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: {
            properties: {
              biography: {
                type: 'string',
                default: 'biography',
              }
            }
          }  
        }
      }
    }
  */

  try {
    const { biography } = req.body;
    const { user } = req;

    if (!biography) {
      return res.status(400).send({ message: "Please provide biography" });
    }

    user.biography = biography;
    await user.save();
    // #swagger.responses[200] = { description: 'Successfully edit biography' }
    return res.send(user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occured when editing the biography" });
  }
});

router.put("/job", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Edit job'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: {
            properties: {
              job: {
                type: 'string',
                default: 'job',
              }
            }
          }  
        }
      }
    }
  */

  try {
    const { job } = req.body;
    const { user } = req;

    if (!job) {
      return res.status(400).send({ message: "Please provide job" });
    }

    user.job = job;
    await user.save();
    // #swagger.responses[200] = { description: 'Successfully edit job' }
    return res.send(user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occured when editing job" });
  }
});

router.put("/facebook", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Edit facebook link'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: {
            properties: {
              facebook: {
                type: 'string',
                default: 'http://localhost:5000.com.vn',
              }
            }
          }  
        }
      }
    }
  */

  try {
    const { facebook } = req.body;
    const { user } = req;

    const errMessage = validateURL(facebook);
    if (errMessage) {
      return res.status(400).send({ message: errMessage });
    }

    user.facebook = facebook;
    await user.save();
    // #swagger.responses[200] = { description: 'Successfully edit facebook link' }
    return res.send(user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occured when editing facebook link" });
  }
});

router.put("/twitter", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Edit twitter link'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: {
            properties: {
              twitter: {
                type: 'string',
                default: 'https://localhost.twitter.vn',
              }
            }
          }  
        }
      }
    }
  */

  try {
    const { twitter } = req.body;
    const { user } = req;

    let errMessage = validateURL(twitter);
    if (errMessage) {
      return res.status(400).send({ message: errMessage });
    }

    user.twitter = twitter;
    await user.save();
    // #swagger.responses[200] = { description: 'Successfully edit twitter link' }
    return res.send(user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occured when editing twitter link" });
  }
});

router.put("/instagram", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Edit instagram'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: {
            properties: {
              instagram: {
                type: 'string',
                default: 'http://instagram.com',
              }
            }
          }  
        }
      }
    }
  */

  try {
    const { instagram } = req.body;
    const { user } = req;

    let errMessage = validateURL(instagram);
    if (errMessage) {
      return res.status(400).send({ message: errMessage });
    }

    user.instagram = instagram;
    await user.save();
    // #swagger.responses[200] = { description: 'Successfully edit instagram link' }
    return res.send(user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occured when editing instagram link" });
  }
});

router.put("/contact-email", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Edit contact email'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: {
            properties: {
              contactEmail: {
                type: 'string',
                default: 'mail@mail.com',
              }
            }
          }  
        }
      }
    }
  */

  try {
    const { contactEmail } = req.body;
    const { user } = req;

    let errMessage = validateEmail(contactEmail);
    if (errMessage) {
      return res.status(400).send({ message: errMessage });
    }

    user.contactEmail = contactEmail;
    await user.save();
    // #swagger.responses[200] = { description: 'Successfully edit contact email' }
    return res.send(user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occured when editing contact email" });
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

///////////////////
router.post(
  "/avatar",
  authMiddleware,
  uploadAva.single("avatar"),
  async (req, res) => {
    /*
    #swagger.tags = ['Profile']
    #swagger.summary = 'Upload avatar'
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
    try {
      if (!req.file) {
        return res.status(400).send({ message: "Please provide avatar" });
      }

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
    } catch (err) {
      return res.status(400).send({ message: "error in uploading avatar" });
    }
  }
);

router.get("/avatar", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = "Get my avatar"
    #swagger.security = [{
      "bearerAuth": []
    }]
  */

  return res.set("Content-Type", "image/png").send(req.user.avatar);
});

router.get("/cover-image", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = "Get my avatar"
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  if (!req.user.coverImage) {
    return res.status(404).send({ message: "Cover image not found" });
  }
  return res.set("Content-Type", "image/png").send(req.user.coverImage);
});

///////////////////
router.post(
  "/cover-image",
  authMiddleware,
  uploadAva.single("coverImage"),
  async (req, res) => {
    /*
    #swagger.requestBody = {
      content: {
        "multipart/form-data": {
          schema: {
            type: 'object',
            properties: {
              coverImage: {
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
    try {
      if (!req.file) {
        return res.status(400).send({ message: "Please provide cover image" });
      }
      const { width, height } = sizeOf(req.file.buffer);
      const sharpInstance = sharp(req.file.buffer);

      if (width > 200)
        sharpInstance.resize({ width: 200, fit: sharp.fit.inside });
      if (height > 200)
        sharpInstance.resize({ height: 200, fit: sharp.fit.inside });
      const buffer = await sharpInstance.png().toBuffer();
      req.user.coverImage = buffer;
      await req.user.save();
      res.send({ message: "oke" });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "error in uploading cover image" });
    }
  }
);

router.get("/avatar/:userId", async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = "Get specific user's avatar"
  */
  try {
    const user = await User.findById(req.params.userId, { avatar: 1 });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // #swagger.responses[200] = { description: 'Send back user avatar' }
    return res.set("Content-Type", "image/png").send(user.avatar);
  } catch (err) {
    // #swagger.responses[500] = { description: 'Object Id is error or mongodb error' }
    return res.status(500).send({ message: "Error when fetching avatar" });
  }
});

router.get("/cover-image/:userId", async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = "Get specific user's cover image"
  */
  try {
    const user = await User.findById(req.params.userId, { coverImage: 1 });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!user.coverImage) {
      return res.status(404).send({ message: "Cover image not found" });
    }
    return res.set("Content-Type", "image/png").send(user.coverImage);
  } catch (err) {
    // #swagger.responses[500] = { description: 'Object Id is error or mongodb error' }
    return res.status(500).send({ message: "Error when fetching cover image" });
  }
});

router.get("/:profileId", async (req, res) => {
  // #swagger.tags = ['Profile']
  // #swagger.summary = "Get others' profile"
  try {
    const user = await User.findOne({ profileId: req.params.profileId });
    if (!user) return res.status(404).send({ message: "User not found" });
    return res.send(user.getPublicProfile());
  } catch (err) {
    return res.status(500).send({ message: "Error in getting profile" });
  }
});

module.exports = router;
