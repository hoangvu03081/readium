const router = require("express").Router({ mergeParams: true });

const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const { authMiddleware } = require("../../utils");
const { checkCommentContent } = require("../../middleware/comments-middleware");

router.get("/", async (req, res) => {
  /* 
    #swagger.tags = ["Comment"]
    #swagger.summary = "Get comments of a post"
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            properties: {
              postId: {
                type: "string",
              }
            }
          }
        }
      }
    }
  */
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId, { comments: 1 }).populate(
      "comments"
    );

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

router.post("/", authMiddleware, checkCommentContent, async (req, res) => {
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
    const { postId, content } = req.body;
    const post = await Post.findById(postId, {
      comments: 1,
    });
    if (!post || !post.isPublished) {
      return res.status(404).send({ message: "Post not found." });
    }
    const comment = new Comment({
      user: req.user._id,
      post: postId,
      content,
    });

    post.comments.push(comment._id);
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
              properties: {
                content: {
                  type: "string",
                  default: "edit comment"
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
    return res.send(comment);
  } catch (err) {
    return res.status(500).send({
      message: `Something went wrong when deleting comment`,
    });
  }
});

module.exports = router;
