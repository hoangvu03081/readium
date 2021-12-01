const router = require("express").Router();

const multer = require("multer");

const Post = require("../../models/Post");
const { authMiddleware } = require("../../utils/auth");

const uploadCover = multer({
  limits: {
    fields: 4,
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
  uploadCover.single("coverImage"),
  async (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.summary = 'Create a post'
    /*
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
                example: "Post Content",
              },
              text: {
                type: 'string',
                example: "Text Only Content",
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
    const { title, content, text } = req.body;
    const {
      file: { buffer: coverImage },
    } = req;

    if (!title)
      return res.status(400).send({ message: "Please provide post's title" });

    if (!content)
      return res.status(400).send({ message: "Please provide post's content" });

    if (!text)
      return res
        .status(400)
        .send({ message: "Please provide post's content in TEXT ONLY form" });

    if (!coverImage)
      return res
        .status(400)
        .send({ message: "Please add a cover image for post" });

    const post = new Post({
      title,
      coverImage,
      content,
      text,
      author: req.user._id,
    });
    try {
      await post.save();
      const postObj = post.toObject();
      delete postObj.coverImage;
      return res.status(201).send(postObj);
      // return res.status(201).send();
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Some errors occur in create posts" });
    }
  }
);

router.get("/popular", async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Get 1 popular post'
  */
  try {
    const post = await Post.findOne({});
    res.send(post);
  } catch {
    res
      .status(500)
      .send({ message: "Some errors occur in finding popular posts" });
  }
});

router.get("/", async (req, res) => {
  // #swagger.tags = ['Post']
  // #swagger.summary = 'Get posts'
  /*
    #swagger.parameters['skip'] = {
      in: 'query',
      type: 'integer',
    }
    #swagger.parameters['date'] = {
      in: 'query',
      type: 'string',
    }
  */
  let { date = new Date().toString(), skip = "0" } = req.query;
  skip = +skip;
  date = new Date(date);

  if (Number.isNaN(skip)) {
    return res.status(400).send({ message: "skip parameter must be a number" });
  }

  if (date.toString() === "Invalid Date") {
    // { isPublished: true }
    const posts = await Post.find({}, { coverImage: 0 })
      .skip(skip)
      // .sort({ publishDate: -1 })
      .limit(5);
    return res.send(posts);
  }

  try {
    const posts = await Post.find(
      {
        // isPublished: true,
        // publishDate: { $lte: date },
      },
      { coverImage: 0 }
    )
      .skip(skip)
      // .sort({ publishDate: -1 })
      .limit(5);
    if (posts.length === 0) return res.send({ posts });
    return res.send({ posts, next: skip + 5 });
  } catch (err) {
    return res.status(500).send({ message: "Some errors occur in get posts" });
  }
});

router.get("/:id", async (req, res) => {
  // #swagger.tags = ['Post']
  // #swagger.summary = 'View a post'
  /*
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
  */
  const _id = req.params.id;

  try {
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).send({ message: "Cannot find post with ID" });
    }
    post.views++;
    await post.save();
    res.send(post);
  } catch {
    res.status(500).send({ message: "Error in finding post with ID" });
  }
});

router.post("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send({ message: "Cannot find post with ID" });
    }
    const isLikedIndex = req.user.liked.findIndex((pId) => pId === post._id);
    if (isLikedIndex === -1) {
      req.user.liked.push(post._id);
      post.likes.push(req.user._id);

      await req.user.save();
      await post.save();
      return res.send(post);
    }
    req.user.liked.splice(isLikedIndex, 1);
    post.splice(
      post.likes.findIndex((uId) => uId === req.user_id),
      1
    );

    await req.user.save();
    await post.save();
    return res.send(post);
  } catch {
    res.status(500).send({ message: "Error in finding post with ID" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      res.status(404).send({ message: "Cannot find post with ID" });
    }

    res.send(post);
  } catch (e) {
    res.status(500).send({ message: "Error in deleting post with ID" });
  }
});

module.exports = router;
