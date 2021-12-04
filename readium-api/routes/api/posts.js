const router = require("express").Router();

const multer = require("multer");

const Post = require("../../models/Post");
const { getImageUrl } = require("../../utils");
const { authMiddleware } = require("../../utils/auth");

const uploadCover = multer({
  limits: {
    fields: 4,
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
    const post = JSON.parse(
      JSON.stringify(await Post.findOne({}, { coverImage: 0 }))
    );
    post.imageUrl = getImageUrl(post._id);
    res.send(post);
  } catch {
    res
      .status(500)
      .send({ message: "Some errors occur in finding popular posts" });
  }
});

router.get("/", async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Get posts'
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

  try {
    if (date.toString() === "Invalid Date") {
      let posts = JSON.parse(
        JSON.stringify(
          await Post.find(
            {
              isPublished: true,
            },
            { coverImage: 0 }
          )
            .skip(skip)
            .sort({ publishDate: -1 })
            .limit(5)
        )
      );
      posts = posts.map((post) => {
        post.imageUrl = getImageUrl(post._id);
        return post;
      });

      return res.send({ posts, next: skip + 5 });
    }

    let posts = JSON.parse(
      JSON.stringify(
        await Post.find(
          {
            isPublished: true,
            publishDate: { $lte: date },
          },
          { coverImage: 0 }
        )
          .sort({ publishDate: -1 })
          .skip(skip)
          .limit(5)
      )
    );

    posts = posts.map((post) => {
      post.imageUrl = getImageUrl(post._id);
      return post;
    });

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

router.get("/:id/cover-image", async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Get post's cover image'
  */
  const post = await Post.findById(req.params.id);
  res.set("Content-Type", "image/png");
  res.send(post.coverImage);
});

router.post("/like/:id", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Like post'
  */
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
    post.likes.splice(
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

router.delete("/:id", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Delete a post'
  */
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .send({ message: `Cannot find post with ID: ${id}` });
    }

    if (post.author !== req.user._id) {
      return res
        .status(400)
        .send({ message: "You must own this post to delete it!" });
    }

    await Post.deleteOne({ _id: id });
    return res.send(post);
  } catch (e) {
    res.status(500).send({ message: "Error in deleting post with ID" });
  }
});

module.exports = router;
