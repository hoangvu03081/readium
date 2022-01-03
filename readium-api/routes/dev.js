const { ObjectId } = require("mongoose").Types;
const router = require("express").Router();
const multer = require("multer");

const User = require("../models/User");
const Post = require("../models/Post");
const Collection = require("../models/Collection");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const { authMiddleware } = require("../utils");
const { deletePost, deleteUser, putPost } = require("../utils/elasticsearch");

router.get("/users", async (req, res) => {
  /* 
    #swagger.tags = ['Dev']
    #swagger.summary = 'Get all users'
  */
  const users = await User.find({}, { avatar: 0, coverImage: 0 });
  res.send(users);
});

router.get("/collections", async (req, res) => {
  /*
    #swagger.tags = ['Dev']
    #swagger.summary = "Get all collections"
  */
  const collections = await Collection.find();
  res.send(collections);
});

router.get("/posts", async (req, res) => {
  /*
    #swagger.tags = ['Dev']
    #swagger.summary = "Get all posts"
  */
  const posts = await Post.find({}, { coverImage: 0 });
  return res.send(posts);
});

router.get("/comments", async (req, res) => {
  /*
    #swagger.tags = ['Dev']
    #swagger.summary = "Get all comments"
  */
  const comments = await Comment.find();
  return res.send(comments);
});

router.get("/notifications", async (req, res) => {
  /*
    #swagger.tags = ['Dev']
    #swagger.summary = "Get all notifications"
  */
  const notifications = await Notification.find();
  return res.send(notifications);
});

router.delete("/users", async (req, res) => {
  /*
    #swagger.tags = ['Dev']
    #swagger.summary = 'Delete all users'
  */
  const users = await User.find();
  await Promise.all(
    users.map(async (user) => {
      const _id = user._id.toString();
      await deleteUser(_id);
      return await User.deleteOne({ _id });
    })
  );
  return res.send();
});

router.delete("/", async (req, res) => {
  /*
    #swagger.tags = ['Dev']
    #swagger.summary = 'Delete all data'
  */
  try {
    const users = await User.find();
    await Promise.all(
      users.map(async (user) => {
        const _id = user._id.toString();
        await deleteUser(_id);
        return await User.deleteOne({ _id });
      })
    );
    const posts = await Post.find();
    await Promise.all(
      posts.map(async (post) => {
        const _id = post._id.toString();
        await deletePost(_id);
        return await Post.deleteOne({ _id });
      })
    );
    await Comment.deleteMany();
    await Notification.deleteMany();
    await Collection.deleteMany();
    return res.send();
  } catch (err) {
    return res.status(500).send();
  }
});

const uploadCover = multer({
  limits: {
    fields: 6,
    fileSize: 12e6,
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
                isPublished: {
                  type: "string",
                  example: "false",
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
      let { title, content, description, isPublished } = req.body;
      isPublished = isPublished === "true";

      const {
        file: { buffer: coverImage },
      } = req;

      const textEditorContent = new ObjectId();

      let post = new Post({
        title,
        content,
        textEditorContent,
        description,
        coverImage,
        author: req.user._id,
        isPublished,
        publishDate: new Date(),
      });

      await post.save();
      const postObject = post.getElastic();
      await putPost(post._id.toString(), postObject);
      return res.status(201).send(post);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Some errors occur in create posts" });
    }
  }
);

const posts = require("../tests/fixtures/data/posts");
const { pushTask } = require("../utils");
router.post("/ai", async (req, res) => {
  /*
    #swagger.tags = ['Dev']
    #swagger.summary = 'Create posts for AI service test'
  */
  try {
    // push to elastic search
    let post = new Post({
      _id: posts[0]._id,
      title: posts[0].title,
      content: posts[0].content,
      // textEditorContent: posts[0].textEditorContent,
      coverImage: posts[0].coverImage,
      author: posts[0].author,
      isPublished: posts[0].isPublished,
      publishDate: posts[0].publishDate,
    });
    await post.save();
    pushTask(posts[0]._id);
    return res.send();
  } catch (err) {
    return res.status(500).send({ message: "Mock AI failed" });
  }
});

module.exports = router;
