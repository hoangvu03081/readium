const router = require("express").Router();

const Post = require("../../../models/Post");
const { authMiddleware } = require("../../../utils/auth");

require('./getEndpoints')(router);
require('./papEndpoints')(router);

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
