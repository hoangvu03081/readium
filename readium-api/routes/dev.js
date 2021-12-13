const router = require("express").Router();
const multer = require("multer");

const User = require("../models/User");
const Post = require("../models/Post");
const { authMiddleware } = require("../utils/auth");

router.get("/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = 'Get all users'
  const users = await User.find({}, { avatar: 0 });
  res.send(users);
});

router.get("/collections", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = "Get all users' collections"
  const users = await User.find();
  const collections = users
    .map((user) => user.collections)
    .reduce((acc, collections) => [...acc, ...collections], []);

  res.send(collections);
});

router.get("/posts", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = "Get all posts"
  const posts = await Post.find({}, { coverImage: 0 });
  return res.send(posts);
});

router.delete("/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = 'Delete all users'
  await User.deleteMany();
  res.send();
});

router.delete("/", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = 'Delete all data'
  await User.deleteMany();
  await Post.deleteMany();
  res.send();
});

const uploadCover = multer({
  limits: {
    fields: 6,
    fileSize: 5e6, // max 5mb
    files: 1,
  },
  fileFilter(req, file, cb) {
    const mimeRe = /^image\/(jpg|jpeg|png|webp|avif|tiff|gif|svg\+xml)$/i;
    const nameRe = /\.(jpg|jpeg|png|webp|avif|tiff|gif|svg)$/i;
    if (mimeRe.test(file.mimetype) && nameRe.test(file.originalname)) {
      return cb(null, true);
    }
    return cb(new Error("Your type of file is not acceptable"));
  },
});

router.post(
  "/post",
  authMiddleware,
  uploadCover.single("coverImage"),
  async (req, res) => {
    /*
   #swagger.tags = ['Dev']
   #swagger.summary = 'Create a post (DEV)'
   #swagger.requestBody = {
     required: true,
     content: {
       "multipart/form-data": {
         schema: {
           type: 'object',
           properties: {
             coverImage: {
               type: 'file',
             },
             title: {
               type: 'string',
               example: "Post Title",
             },
             content: {
               type: 'string',
               example: "Text only content",
             },
             textEditorContent: {
               type: 'string',
               example: "Text Editor Content",
             },
             description: {
               type: 'string',
               example: "Description",
             },
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
      const { title, content, textEditorContent, description } = req.body;

      const {
        file: { buffer: coverImage },
      } = req;

      if (!title) {
        return res.status(400).send({ message: "Please provide post's title" });
      }

      if (!textEditorContent) {
        return res
          .status(400)
          .send({ message: "Please provide post's content" });
      }
      if (!content) {
        return res.status(400).send({
          message: "Please provide post's content in TEXT ONLY form",
        });
      }
      if (!coverImage) {
        return res
          .status(400)
          .send({ message: "Please add a cover image for post" });
      }

      let post = new Post({
        title,
        coverImage,
        content,
        textEditorContent,
        author: req.user._id,
        isPublished: true,
        publishDate: new Date(),
      });

      await post.save();
      post = await post.getPostDetail();
      return res.status(201).send(post);
    } catch (err) {
      res.status(500).send({ message: "Some errors occur in create posts" });
    }
  }
);

module.exports = router;
