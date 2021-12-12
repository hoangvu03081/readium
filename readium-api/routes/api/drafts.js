const router = require("express").Router();
const Delta = require("quill-delta");
const configMulter = require("../../config/multer-config");

const Post = require("../../models/Post");
const {
  checkValidSkipAndDate,
  checkOwnPost,
} = require("../../utils");
const { authMiddleware } = require("../../utils/auth");

const uploadCover = configMulter({
  limits: { fields: 6, fileSize: 5e6, files: 1 },
});

router.get("/", authMiddleware, checkValidSkipAndDate, async (req, res) => {
  /*
    #swagger.tags = ['Draft']
    #swagger.summary = 'Fetch all my drafts'
    #swagger.parameters['skip'] = {
      in: 'query',
      type: 'integer',
    }
    #swagger.parameters['date'] = {
      in: 'query',
      type: 'string',
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const { date, skip } = req;

    let posts = await Post.find({
      isPublished: false,
      author: req.user._id,
      publishDate: { $lte: date },
    })
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(5);

    posts = posts.map((post) => post.getPostPreview());
    posts = Promise.all(posts);

    if (posts.length === 0) return res.send({ posts });
    return res.send({ posts, next: skip + 5 });
  } catch {
    return res.status(500).send({ message: "Error in finding post with ID" });
  }
});

router.get("/:id/avatar", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Draft']
    #swagger.summary = 'Fetch a draft cover image'
  */

  try {
    const _id = req.params.id;
    const post = await Post.findOne({
      _id,
      author: req.user._id,
      isPublished: false,
    });

    if (!post) {
      return res
        .status(404)
        .send({ message: `Cannot find post with ID: ${_id}` });
    }

    return res.set("Content-Type", "image/png").send(post.coverImage);
  } catch {
    return res
      .status(500)
      .send({ message: `Error in fetching cover image of post ${_id}` });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Draft']
    #swagger.summary = 'Fetch a draft'
  */
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id,
      isPublished: false,
    });

    if (!post) {
      return res.status(404).send({ message: "Cannot find post with ID" });
    }
    return res.send(post);
  } catch {
    return res.status(500).send({ message: "Error in finding post with ID" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Draft']
    #swagger.summary = 'Initialize a draft'
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

router.post("/:id", authMiddleware, checkOwnPost, async (req, res) => {
  /*
    #swagger.tags = ['Draft']
    #swagger.summary = "Create a draft based on published post"
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const {
      _id,
      author,
      title,
      coverImage,
      textEditorContent,
      content,
      textConnection,
      duration,
      tags,
      description,
    } = req.post;

    const newPost = new Post({
      author,
      title,
      coverImage,
      textEditorContent,
      content,
      textConnection,
      duration,
      tags,
      description,
      publishedPost: _id,
    });

    await newPost.save();
    return res.send(newPost);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error in create a draft based on published post" });
  }
});

router.patch("/:id/diff", authMiddleware, checkOwnPost, async (req, res) => {
  /*
    #swagger.tags = ['Draft']
    #swagger.summary = "Update draft's textEditorContent"
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
    const { post } = req;

    if (post.isPublished) {
      return res.status(400).send({ message: "Can not edit published post" });
    }

    const { diff } = req.body;

    if (!diff)
      return res.status(400).send({
        message: "Please provide post's content",
      });

    const diffContent = JSON.parse(diff);
    const diffDelta = new Delta(diffContent);
    const composedDelta = diffDelta.compose(JSON.parse(post.textEditorContent));
    post.textEditorContent = JSON.stringify(composedDelta);
    post.content = composedDelta
      .filter((op) => typeof op.insert === "string")
      .map((op) => op.insert)
      .join("");
    const duration = Math.ceil(post.content.trim().split(/\s+/).length / 250);
    post.duration = duration;

    await post.save();
    return res.send(post);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when updating post's content" });
  }
});

router.patch(
  "/:id",
  authMiddleware,
  uploadCover.single("coverImage"),
  checkOwnPost,
  async (req, res) => {
    /*
        #swagger.tags = ['Draft']
        #swagger.summary = 'Update a draft'
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
      const { post } = req;

      if (post.isPublished) {
        return res.status(400).send({ message: "Can not edit published post" });
      }

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

      const duration = Math.ceil(post.content.trim().split(/\s+/).length / 250);
      post.duration = duration;

      if (req.file) post.coverImage = req.file.buffer;
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

router.put(
  "/:id/cover-image",
  authMiddleware,
  uploadCover.single("coverImage"),
  checkOwnPost,
  async (req, res) => {
    /*
      #swagger.tags = ['Draft']
      #swagger.summary = "Update draft's cover image"
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
      const { post } = req;

      if (post.isPublished) {
        return res.status(400).send({ message: "Can not edit published post" });
      }

      if (!req.file)
        return res.status(400).send({
          message: "Please provide an image to update your post's cover image",
        });

      post.coverImage = file.buffer;
      await post.save();
      return res.send(post);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong when updating cover image" });
    }
  }
);

router.put("/:id/title", authMiddleware, checkOwnPost, async (req, res) => {
  /*
      #swagger.tags = ['Draft']
      #swagger.summary = "Update draft's title"
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
    const { post } = req;

    if (post.isPublished) {
      return res.status(400).send({ message: "Can not edit published post" });
    }

    const { title } = req.body;
    if (!title) {
      return res.status(400).send({
        message: "Please provide a title to update your post's title",
      });
    }

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
      #swagger.tags = ['Draft']
      #swagger.summary = "Update draft's tags"
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
    const { post } = req;

    if (post.isPublished) {
      return res.status(400).send({ message: "Can not edit published post" });
    }

    const { tags } = req.body;
    if (!tags) {
      return res.status(400).send({
        message: "Please provide tags",
      });
    }

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
      #swagger.tags = ['Draft']
      #swagger.summary = "Update draft's description"
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
      const { post } = req;

      if (post.isPublished) {
        return res.status(400).send({ message: "Can not edit published post" });
      }

      const { description } = req.body;

      if (!description) {
        return res.status(400).send({
          message: "Please provide post's description",
        });
      }

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

router.put("/publish/:id", authMiddleware, checkOwnPost, async (req, res) => {
  /*
    #swagger.tags = ['Draft']
    #swagger.summary = 'Endpoint to publish the draft'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const { post } = req;

    if (!post.title) {
      return res.status(400).send({
        message: "Please provide a title for the post before publishing",
      });
    }

    if (!post.coverImage) {
      return res.status(400).send({
        message: "Please provide a cover image for the post before publishing",
      });
    }

    if (!post.textEditorContent || !post.content) {
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
});



module.exports = router;
