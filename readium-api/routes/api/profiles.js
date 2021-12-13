const router = require("express").Router();

const sizeOf = require("image-size");
const sharp = require("sharp");

const User = require("../../models/User");
const { authMiddleware } = require("../../utils/auth");
const {
  validateDisplayName,
  validateEmail,
  validateFacebookLink,
  validateTwitterLink,
  validateInstaLink,
} = require("../../utils/validator");
const configMulter = require("../../config/multer-config");

const uploadAva = configMulter({
  limits: { fields: 0, fileSize: 5e6, files: 1 },
});

const checkFileSent = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Please provide a file" });
    }

    const { width, height } = sizeOf(req.file.buffer);
    const sharpInstance = sharp(req.file.buffer);

    req.file.width = width;
    req.file.height = height;
    req.sharpInstance = sharpInstance;

    return next();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when checking if file exists" });
  }
};

const resize = (sharpInstance, { width, height }, maxSize) => {
  if (width > maxSize) {
    sharpInstance.resize({ width: maxSize, fit: sharp.fit.inside });
  }
  if (height > maxSize) {
    sharpInstance.resize({ height: maxSize, fit: sharp.fit.inside });
  }
};

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

router.get("/:profileId", async (req, res) => {
  /*
    #swagger.tags = ['Profile']
    #swagger.summary = "Get others' profile"
  */
  try {
    const user = await User.findOne({ profileId: req.params.profileId });
    if (!user) return res.status(404).send({ message: "User not found" });
    return res.send(user.getPublicProfile());
  } catch (err) {
    return res.status(500).send({ message: "Error in getting profile" });
  }
});

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

router.post(
  "/avatar",
  authMiddleware,
  uploadAva.single("avatar"),
  checkFileSent,
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
      const { sharpInstance, file } = req;

      resize(sharpInstance, file, 200);
      const buffer = await sharpInstance.png().toBuffer();

      req.user.avatar = buffer;
      await req.user.save();

      res.set("Content-Type", "image/png").send(buffer);
    } catch (err) {
      return res.status(400).send({ message: "error in uploading avatar" });
    }
  }
);

router.post(
  "/cover-image",
  authMiddleware,
  uploadAva.single("coverImage"),
  checkFileSent,
  async (req, res) => {
    /*
      #swagger.tags = ["Profile"]
      #swagger.summary = "Post a cover image"
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
      const { sharpInstance, file } = req;

      resize(sharpInstance, file, 4000);
      const buffer = await sharpInstance.png().toBuffer();

      req.user.coverImage = buffer;
      await req.user.save();

      res.set("Content-Type", "image/png").send(buffer);
    } catch (err) {
      return res
        .status(400)
        .send({ message: "error in uploading cover image" });
    }
  }
);

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
    if (facebook) errMessage = validateFacebookLink(facebook);
    if (twitter) errMessage = validateTwitterLink(twitter);
    if (instagram) errMessage = validateInstaLink(instagram);
    if (contactEmail) errMessage = validateEmail(contactEmail);

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

const handleEdit = async (
  req,
  res,
  field,
  fieldName,
  checkEmpty,
  validator
) => {
  try {
    if (!fieldName) fieldName = field;
    const value = req.body[field];
    const user = req.user;

    if (checkEmpty && (value === null || value === void 0 || value === "")) {
      return res.status(400).send({ message: `Please provide ${fieldName}` });
    }

    if (value && validator) {
      let errMessage = validator(value);
      if (errMessage) {
        return res.status(400).send({ message: errMessage });
      }
    }

    if (value === null || value === void 0 || value === "") {
      user[field] = undefined;
    } else user[field] = value;

    await user.save();
    return res.send(user.getPublicProfile());
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Some errors occured when editing ${fieldName}` });
  }
};

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
  return handleEdit(
    req,
    res,
    "displayName",
    "display name",
    true,
    validateDisplayName
  );
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
  return handleEdit(req, res, "biography");
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
  return handleEdit(req, res, "job");
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
                default: 'https://www.facebook.com/vu.hoang.372',
              }
            }
          }  
        }
      }
    }
  */
  return handleEdit(req, res, "facebook", null, false, validateFacebookLink);
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
                default: 'https://twitter.com/Hoangvu',
              }
            }
          }  
        }
      }
    }
  */
  return handleEdit(req, res, "twitter", null, false, validateTwitterLink);
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
                default: 'https://www.instagram.com/HoangVu/',
              }
            }
          }  
        }
      }
    }
  */
  return handleEdit(req, res, "instagram", null, false, validateInstaLink);
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
  return handleEdit(
    req,
    res,
    "contactEmail",
    "contact email",
    false,
    validateEmail
  );
});

module.exports = router;
