const router = require("express").Router();

const Post = require("../../models/Post");
const { authMiddleware } = require("../../utils");
const {
  checkValidSkipAndDate,
  checkOwnPost,
} = require("../../middleware/posts-middleware");
const { deletePost } = require("../../utils/elasticsearch");

router.get("/popular", async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Get 1 popular post'
  */
  try {
    let post = await Post.findOne({ isPublished: true });
    if (!post) {
      return res.status(404).send({ message: "No popular post found" });
    }
    post = await post.getPostPreview();
    return res.send(post);
  } catch (err) {
    // console.log(err);
    return res
      .status(500)
      .send({ message: "Some errors occur in finding popular posts" });
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

router.get("/user/:userId", checkValidSkipAndDate, async () => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = "Get user id's published posts"
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
    const { userId } = req.params;
    let { date, skip } = req;

    let posts = await Post.find({
      isPublished: true,
      publishDate: { $lte: date },
      author: userId,
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
    return res.set("Content-Type", "image/png").send(post.coverImage);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Get an error while fetching cover image" });
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

router.put("/:id/unpublish", authMiddleware, checkOwnPost, async (req, res) => {
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

    await deletePost(id);

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

    await deletePost(id);

    post = await post.getPostPreview();
    await Post.deleteOne({ _id: id });
    return res.send(post);
  } catch (e) {
    res.status(500).send({ message: "Error in deleting post with ID" });
  }
});

module.exports = router;
