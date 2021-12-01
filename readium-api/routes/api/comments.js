const router = require("express").Router({ mergeParams: true });

const Post = require("../../models/Post");
const { authMiddleware } = require("../../utils/auth");

const checkCommentContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).send({
      message:
        "Please provide comment content before request to POST/PATCH comments' endpoints!",
    });
  }
  return next();
};

router.get("/", async (req, res) => {
  // #swagger.tags = ['Comment']
  // #swagger.summary = 'Get comment of a post'

  const { id } = req.params;

  try {
    const post = await Post.findById(id, { comments: 1 });
    if (!post) {
      return res.status(404).send({
        message: `Post ${id} not found. Please be sure that this id is correct!`,
      });
    }
    return res.send(post.comments);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: `Something went wrong when finding the comments of post ${id}`,
    });
  }
});

router.post("/", authMiddleware, checkCommentContent, async (req, res) => {
  // #swagger.tags = ['Comment']
  // #swagger.summary = 'Comment on the post'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Comment"
          }
        }
      }
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
  */

  const { id } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findById(id, { comments: 1 });
    if (!post) {
      return res.status(404).send({
        message: `Post ${id} not found. Please be sure that this id is correct!`,
      });
    }
    const commentObj = { user: req.user._id, content };
    post.comments.push(commentObj);
    await post.save();
    return res.status(201).send(commentObj);
  } catch (err) {
    return res.status(500).send({
      message: `Something went wrong when create a comment of post ${id}`,
    });
  }
});

router.patch(
  "/:commentId",
  authMiddleware,
  checkCommentContent,
  async (req, res) => {
    /*
    #swagger.tags = ['Comment']
    #swagger.summary = 'Edit a comment'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Comment"
          }
        }
      }
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
    const { id, commentId } = req.params;
    const { content } = req.body;
    try {
      const post = await Post.findById(id, { comments: 1 });
      if (!post) {
        return res.status(404).send({
          message: `Post ${id} not found. Please be sure that this id is correct!`,
        });
      }
      const comment = post.comments.id(commentId);
      if (comment.user !== req.user._id) {
        return res.status(400).send({
          message: `User ${req.user.displayName} can not edit comment of other users. Make sure that ${req.user.displayName} owned this comment to edit`,
        });
      }
      comment.content = content;
      await post.save();
      return res.send(comment);
    } catch (err) {
      return res.status(500).send({
        message: `Something went wrong when create a comment of post ${id}`,
      });
    }
  }
);

router.delete("/:commentId", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Comment']
    #swagger.summary = 'Delete comment'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  const { id, commentId } = req.params;

  try {
    const post = await Post.findById(id);
    const index = post.comments.findIndex(
      (c) => c._id.toString() === commentId
    );
    if (index === -1) {
      return res.status(404).send({ message: "Comment not found" });
    }
    const comment = post.comments.splice(index, 1);
    await post.save();
    return res.send(comment);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        message: `Something went wrong when deleting comment ${commentId}`,
      });
  }
});

module.exports = router;
