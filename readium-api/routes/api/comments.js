const router = require("express").Router({ mergeParams: true });

const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const { authMiddleware } = require("../../utils");
const { checkCommentContent } = require("../../middleware/comments-middleware");

router.get("/posts/:postId/comments/", async (req, res) => {
  /* 
    #swagger.tags = ["Comment"]
    #swagger.summary = "Get comments of a post"
  */
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId, { comments: 1, isPublished: 1 }).populate(
      "comments"
    );
    console.log(post);

    if (!post || !post.isPublished) {
      return res.status(404).send({
        message: `Post not found. Please be sure that id is correct!`,
      });
    }

    let comments = post.comments.map((comment) => comment.getCommentDetails());
    comments = await Promise.all(comments);

    return res.send(comments);
  } catch (err) {
    return res.status(500).send({
      message: `Something went wrong when finding the comments of post`,
    });
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
      const { commentId } = req.params;
      const { content } = req.body;

      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).send({ message: "Comment not found." });
      }

      if (comment.user.toString() !== req.user._id.toString()) {
        return res.status(400).send({
          message: "You do not own this comment to edit",
        });
      }

      comment.content = content;
      await comment.save();
      return res.send(await comment.getCommentDetails());
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
    const { commentId } = req.params;
    let comment = await Comment.findById(commentId);
    const post = await Post.findById(comment.post);

    const commentIndex = post.comments.findIndex(
      (cId) => cId.toString() === commentId
    );
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
    }

    comment = await Comment.deleteOne({ _id: commentId });
    await post.save();
    return res.send(await comment.getCommentDetails());
  } catch (err) {
    return res.status(500).send({
      message: `Something went wrong when deleting comment`,
    });
  }
});

module.exports = router;
