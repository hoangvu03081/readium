const router = require("express").Router();

const Post = require("../../models/Post");
const {
  checkValidSkipAndDate,
  checkOwnPost,
} = require("../../utils");
const { authMiddleware } = require("../../utils/auth");

router.get("/popular", async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Get 1 popular post'
  */
  try {
    let post = await Post.findOne({ isPublished: true });
    post = await post.getPostPreview();
    return res.send(post);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Some errors occur in finding popular posts" });
  }
});

router.get("/", checkValidSkipAndDate, async (req, res) => {
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
  try {
    const { date, skip } = req;

    let posts = await Post.find({
      isPublished: true,
      publishDate: { $lte: date },
    })
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(5);

    posts = posts.map((post) => post.getPostPreview());
    posts = await Promise.all(posts);

    if (posts.length === 0) return res.send({ posts });
    return res.send({ posts, next: skip + 5 });
  } catch (err) {
    return res.status(500).send({ message: "Some errors occur in get posts" });
  }
});

router.get("/me", authMiddleware, checkValidSkipAndDate, async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Get my published posts'
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
    let { date, skip } = req;

    let posts = await Post.find({
      isPublished: true,
      publishDate: { $lte: date },
      author: req.user._id,
    })
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(5);

    posts = posts.map((post) => post.getPostPreview());
    posts = await Promise.all(posts);

    if (posts.length === 0) return res.send({ posts });
    return res.send({ posts, next: skip + 5 });
  } catch (err) {
    return res.status(500).send({ message: "Some errors occur in get posts" });
  }
});

router.get("/:id", async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'View a post'
  */
  try {
    let post = await Post.findById(req.params.id);
    if (!post || !post.isPublished) {
      return res.status(404).send({ message: "Cannot find post with ID" });
    }
    post.views++;
    await post.save();
    post = await post.getPostDetail();
    return res.send(post);
  } catch {
    return res.status(500).send({ message: "Error in finding post with ID" });
  }
});

router.get("/:id/cover-image", async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = "Get post's cover image"
  */
  try {
    const post = await Post.findById(req.params.id);
    if (!post || !post.isPublished) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.set("Content-Type", "image/png").send(post.coverImage);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Get an error while fetching cover image" });
  }
});

router.post("/like/:id", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Like post'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Cannot find post with ID" });
    }

    const isLikedIndex = req.user.liked.findIndex(
      (pId) => pId.toString() === post._id.toString()
    );

    if (isLikedIndex === -1) {
      req.user.liked.push(post._id);
      post.likes.push(req.user._id);
    } else {
      req.user.liked.splice(isLikedIndex, 1);
      post.likes.splice(
        post.likes.findIndex(
          (uId) => uId.toString() === req.user._id.toString()
        ),
        1
      );
    }

    await req.user.save();
    await post.save();
    post = await post.getPostPreview();
    return res.send(post);
  } catch {
    res.status(500).send({ message: "Error in like post" });
  }
});

router.put("/unpublish/:id", authMiddleware, checkOwnPost, async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Endpoint to unpublish the post'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    let post = await req.post.populate("likes");
    const id = post._id.toString();

    const draftOfPost = await Post.findOne({
      publishedPost: id,
    });
    if (draftOfPost) {
      draftOfPost.publishedPost = undefined;
      await draftOfPost.save();
    }

    // remove all users who liked this post
    post.likes.forEach((uId) => {
      const pId = uId.liked.findIndex((pId) => pId.toString() === id);
      if (pId !== -1) uId.liked.splice(pId, 1);
    });

    post.publishDate = undefined;
    post.isPublished = false;
    post.likes = [];

    await post.save();
    post = await post.getPostPreview();
    return res.send(post);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when unpublishing the post" });
  }
});

router.delete("/:id", authMiddleware, checkOwnPost, async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Delete a post'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    let post = await req.post.populate("likes");
    const id = post._id.toString();

    // unref if exist
    const draftOfPost = await Post.findOne({
      publishedPost: id,
    });
    if (draftOfPost) {
      draftOfPost.publishedPost = undefined;
      await draftOfPost.save();
    }

    // remove all users who liked this post
    post.likes.forEach((user) => {
      const pId = user.liked.findIndex((pId) => pId.toString() === id);
      if (pId !== -1) user.liked.splice(pId, 1);
    });

    post = await post.getPostPreview();
    await Post.deleteOne({ _id: id });
    return res.send(post);
  } catch (e) {
    res.status(500).send({ message: "Error in deleting post with ID" });
  }
});

module.exports = router;
