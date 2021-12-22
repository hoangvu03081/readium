const router = require("express").Router({ mergeParams: true });

const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const { authMiddleware } = require("../../utils");
const { checkCommentContent } = require("../../middleware/comments-middleware");

router.get("/", async (req, res) => {
  /* 
    #swagger.tags = ['Comment']
    #swagger.summary = 'Get comments of a post'
  */
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId, { comments: 1 }).populate(
      "comments"
    );

    if (!post || !post.isPublished) {
      return res.status(404).send({
        message: `Post not found. Please be sure that id is correct!`,
      });
    }

    return res.send(post.comments);
  } catch (err) {
    return res.status(500).send({
      message: `Something went wrong when finding the comments of post`,
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Comment']
    #swagger.summary = 'Post a comment'
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
  try {
    const { postId } = req.params;
    const post = await Post.findById(req.params.postId, {
      comments: 1,
    }).populate("comments");
    if (!post || !post.isPublished) {
      return res.status(404).send({ message: "Post not found." });
    }
    const comment = new Comment({
      user: req.user._id,
      post: postId,
      content: req.body.content,
    });

    post.comments.push(postId);
    await post.save();
    await comment.save();

    return res.send(comment);
  } catch (err) {
    return res.send({ message: "Something went when posting a comment" });
  }
});

router.put(
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
    try {
      const { postId, commentId } = req.params;
      const { content } = req.body;

      if (!content) {
        return res
          .status(400)
          .send({ message: "Please provide content to edit your comment" });
      }

      const post = await Post.findById(postId, { comments: 1 }).populate(
        "comments"
      );

      if (!post || !post.isPublished) {
        return res.status(404).send({
          message: `Post not found. Please be sure that id is correct!`,
        });
      }

      const comment = await Comment.findById(commentId);

      if (comment.user.toString() !== req.user._id.toString()) {
        return res.status(400).send({
          message: "You do not own this comment to edit",
        });
      }

      comment.content = content;
      await comment.save();
      return res.send(comment);
    } catch (err) {
      return res.status(500).send({
        message: `Something went wrong when editing a comment of post`,
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
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId, { comments: 1 }).populate(
      "comments"
    );

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).send({ message: "Comment not found" });
    }

    if (
      post.comments[commentIndex].user.toString() !== req.user._id.toString()
    ) {
      return res
        .status(400)
        .send({ message: "You must own this comment to delete it." });
    }

    post.comments.splice(commentIndex, 1);
    const comment = await Comment.findByIdAndDelete(commentId);
    await post.save();
    return res.send(comment);
  } catch (err) {
    return res.status(500).send({
      message: `Something went wrong when deleting comment`,
    });
  }
});

module.exports = router;
