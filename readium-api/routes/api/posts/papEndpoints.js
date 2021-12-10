const Delta = require("quill-delta");
const multer = require("multer");

const Post = require("../../../models/Post");
const { authMiddleware } = require("../../../utils/auth");

const checkOwnPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  if (post.author !== req.user._id) {
    return res.status(400).send({
      message: "You do not own this post to update its content",
    });
  }

  return next();
};

const uploadCover = multer({
  limits: {
    fields: 6,
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

module.exports = function (router) {
  router.post("/post", uploadCover.single("coverImage"), async (req, res) => {
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
      const { title, content, textEditorContent } = req.body;
      const {
        file: { buffer: coverImage },
      } = req;

      if (!title)
        return res.status(400).send({ message: "Please provide post's title" });

      if (!textEditorContent)
        return res
          .status(400)
          .send({ message: "Please provide post's content" });

      if (!content)
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
        textEditorContent,
        author: req.user._id,
        isPublished: true,
        publishDate: new Date(),
      });

      await post.save();
      return res.status(201).send(post);
    } catch (err) {
      res.status(500).send({ message: "Some errors occur in create posts" });
    }
  });

  router.post("/", authMiddleware, async (req, res) => {
    /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Initialize a post'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
    try {
      const post = new Post();
      post.author = req.user._id;
      await post.save();
      return res.status(201).send(post);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong when initializing a post" });
    }
  });

  router.patch(
    "/:id",
    authMiddleware,
    uploadCover.single("coverImage"),
    async (req, res) => {
      /*
        #swagger.tags = ['Post']
        #swagger.summary = 'Update a post'
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
                  diff: {
                    $ref: '#/definitions/TextEditorContent',
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'string'
                    },
                    example: ['tag 1', 'tag 2']
                  },
                  description: {
                    type: 'string',
                    example: 'Post description',
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
        const { id } = req.params;
        const post = await Post.findById(id);
        const {
          title,
          tags,
          description,
          diff = JSON.stringify({ ops: [] }),
        } = req.body;

        const diffContent = JSON.parse(diff);
        const diffDelta = new Delta(diffContent);
        const composedDelta = diffDelta.compose(
          JSON.parse(post.textEditorContent)
        );
        post.textEditorContent = JSON.stringify(composedDelta);
        post.content = composedDelta
          .filter((op) => typeof op.insert === "string")
          .map((op) => op.insert)
          .join("");
        const duration = Math.ceil(
          post.content.trim().split(/\s+/).length / 250
        );
        post.duration = duration;

        const { file } = req;
        if (file && file.buffer) post.coverImage = file.buffer;

        if (title) post.title = title;
        if (tags) post.tags = tags;
        if (description) post.description = description;

        await post.save();
        return res.send(post);
      } catch (err) {
        return res
          .status(500)
          .send({ message: "Something went wrong when updating a post" });
      }
    }
  );

  router.patch(
    "/:id/cover-image",
    authMiddleware,
    checkOwnPost,
    uploadCover.single("coverImage"),
    async (req, res) => {
      /*
      #swagger.tags = ['Post']
      #swagger.summary = "Update post's cover image"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
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
    */
      try {
        const post = await Post.findById(req.params.id);

        const { file } = req;

        if (!file || !file.buffer)
          return res.status(400).send({
            message:
              "Please provide an image to update your post's cover image",
          });

        if (file && file.buffer) {
          post.coverImage = file.buffer;
          await post.save();
          return res.send(post);
        }
      } catch (err) {
        return res
          .status(500)
          .send({ message: "Something went wrong when updating cover image" });
      }
    }
  );

  router.patch("/:id/diff", authMiddleware, checkOwnPost, async (req, res) => {
    /*
      #swagger.tags = ['Post']
      #swagger.summary = "Update post's textEditorContent"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              diff: { $ref: "#/definitions/TextEditorContent" }
            }
          }
        }
      }
    */
    try {
      const post = await Post.findById(req.params.id);

      const { diff } = req.body;

      if (!diff)
        return res.status(400).send({
          message: "Please provide post's content",
        });

      const diffContent = JSON.parse(diff);
      const diffDelta = new Delta(diffContent);
      const composedDelta = diffDelta.compose(
        JSON.parse(post.textEditorContent)
      );
      post.textEditorContent = JSON.stringify(composedDelta);
      await post.save();
      return res.send(post);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong when updating post's content" });
    }
  });

  router.put("/:id/title", authMiddleware, checkOwnPost, async (req, res) => {
    /*
      #swagger.tags = ['Post']
      #swagger.summary = "Update post's title"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  default: 'Post title'
                }
              }
            }
          }
        }
      }
    */
    try {
      const post = await Post.findById(req.params.id);

      const { title } = req.body;
      if (!title)
        return res.status(400).send({
          message: "Please provide a title to update your post's title",
        });

      post.title = title;
      await post.save();
      return res.send(post);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong when updating post's title" });
    }
  });

  router.put("/:id/tags", authMiddleware, checkOwnPost, async (req, res) => {
    /*
      #swagger.tags = ['Post']
      #swagger.summary = "Update post's tags"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                tags: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  example: ['tag 1', 'tag 2']
                },
              }
            }
          }
        }
      }
    */
    try {
      const post = await Post.findById(req.params.id);

      const { tags } = req.body;
      if (!tags)
        return res.status(400).send({
          message: "Please provide tags",
        });

      post.tags = tags;
      await post.save();
      return res.send(post);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong when updating post's tags" });
    }
  });

  router.put(
    "/:id/description",
    authMiddleware,
    checkOwnPost,
    async (req, res) => {
      /*
      #swagger.tags = ['Post']
      #swagger.summary = "Update post's description"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                  default: "Post\'s description"
                }
              }
            }
          }
        }
      }
    */
      try {
        const post = await Post.findById(req.params.id);
        const { description } = req.body;

        if (!description)
          return res.status(400).send({
            message: "Please provide post's description",
          });

        post.description = description;
        await post.save();
        return res.send(post);
      } catch (err) {
        return res.status(500).send({
          message: "Something went wrong when updating post's description",
        });
      }
    }
  );

  router.put(
    "/publish/:id",
    authMiddleware,
    checkOwnPost,
    async (req, res) => {
      /*
      #swagger.tags = ['Post']
      #swagger.summary = 'Endpoint to publish the post'
      #swagger.security = [{
        "bearerAuth": []
      }]
    */
      try {
        const post = await Post.findById(req.params.id);

        if (!post.coverImage) {
          return res.status(400).send({
            message:
              "Please provide a cover image for the post before publishing",
          });
        }
        if (!post.textEditorContent) {
          return res.status(400).send({
            message: "Please write the post's content before publishing",
          });
        }
        post.publishDate = new Date();
        post.isPublished = true;
        await post.save();
        return res.send(post);
      } catch (err) {
        return res.status(500).send({
          message: "Something went wrong when publishing the post",
        });
      }
    }
  );

  router.put(
    "/unpublish/:id",
    authMiddleware,
    checkOwnPost,
    async (req, res) => {
      /*
      #swagger.tags = ['Post']
      #swagger.summary = 'Endpoint to unpublish the post'
      #swagger.security = [{
        "bearerAuth": []
      }]
    */
      try {
        const post = await Post.findById(req.params.id);
        post.publishDate = undefined;
        post.isPublished = false;
        await post.save();
        return res.send(post);
      } catch (err) {
        return res
          .status(500)
          .send({ message: "Something went wrong when unpublishing the post" });
      }
    }
  );
};
