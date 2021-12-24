const Stream = require("stream");
const router = require("express").Router();
const Delta = require("quill-delta");
const { ObjectId } = require("mongodb");
const { getBucket } = require("../../config/db");

const configMulter = require("../../config/multer-config");

const Post = require("../../models/Post");
const { authMiddleware, streamToString } = require("../../utils");
const {
  checkValidSkipAndDate,
  checkOwnPost,
} = require("../../middleware/posts-middleware");
const { Readable } = require("stream");
const { putPost } = require("../../utils/elasticsearch");

const uploadCover = configMulter({
  limits: { fields: 6, fileSize: 12e6, files: 1 },
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
    posts = await Promise.all(posts);

    if (posts.length === 0) return res.send({ posts });
    return res.send({ posts, next: skip + 5 });
  } catch {
    return res.status(500).send({ message: "Error in finding post with ID" });
  }
});

router.get("/:id/cover-image", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Draft']
    #swagger.summary = 'Fetch a draft cover image'
    #swagger.security = [{
      "bearerAuth": []
    }]
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

    if (!post.coverImage) {
      return res.status(404).send({ message: "Post's cover image not found" });
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
    #swagger.security = [{
      "bearerAuth": []
    }]
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

    return res.send(await post.getPostDetail());
  } catch {
    return res.status(500).send({ message: "Error in finding post with ID" });
  }
});

const createInitialDraftEditorContent = () => {
  const buf = Buffer.from('{ "ops": [] }', "utf8");
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buf);
  readable.push(null);
  return readable;
};

// TODO: test grid fs
router.post("/", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Draft']
    #swagger.summary = 'Initialize a draft'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    let post = new Post();
    post.author = req.user._id;

    const textEditorContentId = new ObjectId();
    post.textEditorContent = textEditorContentId;
    // create a file in grid fs and keep a ref to it
    const bucket = getBucket();
    const readable = createInitialDraftEditorContent();
    readable.pipe(
      bucket.openUploadStream("textEditorContent", { id: textEditorContentId })
    );

    await post.save();
    return res.status(201).send({ id: post._id });
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
      title,
      textEditorContent,
      _id,
      author,
      coverImage,
      content,
      duration,
      tags,
      description,
    } = req.post;

    const newPost = new Post({
      title,
      textEditorContent,
      publishedPost: _id,
      author,
      coverImage,
      content,
      duration,
      tags,
      description,
    });

    await newPost.save();
    return res.send({ id: newPost._id });
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
            $ref: "#/definitions/TextEditorContent"
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

    ///
    // const cursor = bucket.find({ _id: post.textEditorContent });
    // cursor.forEach((doc) => {
    //   console.log(doc);
    // });
    // return res.send();

    ///
    const bucket = getBucket();
    if (!diff) {
      bucket.delete(post.textEditorContent);
      const textEditorContentId = new ObjectId();
      post.textEditorContent = textEditorContentId;
      // create a file in grid fs and keep a ref to it
      const readable = createInitialDraftEditorContent();
      readable.pipe(
        bucket.openUploadStream("textEditorContent", {
          id: textEditorContentId,
        })
      );

      post.content = "";
      post.duration = 0;
      await post.save();
      return res.send(await post.getPostDetail());
    }

    const stream = bucket.openDownloadStream(post.textEditorContent);
    const textEditorContent = await streamToString(stream);

    const diffDelta = new Delta(diff);
    const textEditorDelta = new Delta(JSON.parse(textEditorContent));
    const composedDelta = textEditorDelta.compose(diffDelta);
    const mb = Buffer.byteLength(JSON.stringify(composedDelta), "utf8") * 10e-7;
    if (mb > 50) {
      return res.send({
        message: "Your post content has reached the maximum size 50mb.",
      });
    }

    bucket.delete(post.textEditorContent);
    const textEditorContentId = new ObjectId();

    const buf = Buffer.from(JSON.stringify(composedDelta), "utf8");
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buf);
    readable.push(null);

    readable.pipe(
      bucket.openUploadStream("textEditorContent", {
        id: textEditorContentId,
      })
    );

    post.textEditorContent = textEditorContentId;
    post.content = composedDelta
      .filter((op) => typeof op.insert === "string")
      .map((op) => op.insert)
      .join("");
    const duration = Math.ceil(post.content.trim().split(/\s+/).length / 250);
    post.duration = duration;

    await post.save();
    return res.send(await post.getPostDetail());
  } catch (err) {
    console.log(err);
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
      console.log(err);
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

      if (!req.file) {
        return res.status(400).send({
          message: "Please provide an image to update your post's cover image",
        });
      }

      post.coverImage = req.file.buffer;
      await post.save();
      return res.send(await post.getPostDetail());
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
    let { post } = req;

    if (post.isPublished) {
      return res.status(400).send({ message: "Can not edit published post" });
    }

    const { title } = req.body;
    if (title) post.title = title;
    else post.title = "";

    await post.save();
    post = await post.getPostDetail();
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

    if (tags) post.tags = tags;
    else post.tags = [];
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

      if (description) post.description = description;
      else post.description = "";
      await post.save();

      return res.send(post);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Something went wrong when updating post's description",
      });
    }
  }
);

router.put("/:id/publish", authMiddleware, checkOwnPost, async (req, res) => {
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
    const _id = req.params.id;
    putPost(_id, { tags: post.tags, title: post.title });

    /// republish post
    if (post.publishedPost) {
      const publishedPost = await Post.findById(post.publishedPost);
      publishedPost.title = post.title;
      publishedPost.textEditorContent = post.textEditorContent;
      publishedPost.coverImage = post.coverImage;
      publishedPost.content = post.content;
      publishedPost.duration = post.duration;
      publishedPost.tags = post.tags;
      publishedPost.description = post.description;
      await publishedPost.save();
      await Post.deleteOne({ _id });
      return res.send();
    }
    /// republish post

    /// publish post
    post.publishDate = new Date();
    post.isPublished = true;
    await post.save();
    return res.send();
    // return res.send(post);
    /// publish post
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong when publishing the post",
    });
  }
});

module.exports = router;
