const Post = require("../../../models/Post");
const { getImageUrl, getAvatarUrl } = require("../../../utils");
const { authMiddleware } = require("../../../utils/auth");

module.exports = function (router) {
  router.get("/popular", async (req, res) => {
    /*
      #swagger.tags = ['Post']
      #swagger.summary = 'Get 1 popular post'
    */
    try {
      const post = JSON.parse(
        JSON.stringify(
          await Post.findOne({ isPublished: true }, { coverImage: 0 })
        )
      );
      post.imageUrl = getImageUrl(post.id);
      res.send(post);
    } catch {
      res
        .status(500)
        .send({ message: "Some errors occur in finding popular posts" });
    }
  });

  router.get("/", async (req, res) => {
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
      let { date = new Date().toString(), skip = "0" } = req.query;
      skip = +skip;
      date = new Date(date);

      if (Number.isNaN(skip)) {
        return res
          .status(400)
          .send({ message: "skip parameter must be a number" });
      }

      if (date.toString() === "Invalid Date") {
        return res.send({ message: "Invalid date parameter" });
      }

      let posts = JSON.parse(
        JSON.stringify(
          await Post.find(
            {
              isPublished: true,
              publishDate: { $lte: date },
            },
            { coverImage: 0 }
          )
            .populate("author", { displayName: 1 })
            .sort({ publishDate: -1 })
            .skip(skip)
            .limit(5)
        )
      );

      posts = posts.map((post) => {
        post.imageUrl = getImageUrl(post.id);
        post.userAvatar = getAvatarUrl(post.author._id); /// TODO: code
        return post;
      });

      if (posts.length === 0) return res.send({ posts });
      return res.send({ posts, next: skip + 5 });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Some errors occur in get posts" });
    }
  });

  router.get("/me", authMiddleware, async (req, res) => {
    /*
      #swagger.tags = ['Post']
      #swagger.summary = 'Get my posts'
      #swagger.parameters['skip'] = {
        in: 'query',
        type: 'integer',
      }
      #swagger.parameters['date'] = {
        in: 'query',
        type: 'string',
      }
    */
    let { date = new Date().toString(), skip = "0" } = req.query;
    skip = +skip;
    date = new Date(date);

    if (Number.isNaN(skip)) {
      return res
        .status(400)
        .send({ message: "Skip parameter must be a number" });
    }

    if (date.toString() === "Invalid Date") {
      return res.send({ message: "Invalid date parameter" });
    }

    try {
      let posts = JSON.parse(
        JSON.stringify(
          await Post.find(
            {
              isPublished: true,
              publishDate: { $lte: date },
              author: req.user._id,
            },
            { coverImage: 0 }
          )
            .sort({ publishDate: -1 })
            .skip(skip)
            .limit(5)
        )
      );

      posts = posts.map((post) => {
        post.imageUrl = getImageUrl(post.id);
        return post;
      });

      if (posts.length === 0) return res.send({ posts });
      return res.send({ posts, next: skip + 5 });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Some errors occur in get posts" });
    }
  });

  router.get("/:id", async (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.summary = 'View a post'
    /*
      #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string'
      }
    */
    const _id = req.params.id;

    try {
      const post = await Post.findById(_id);
      if (!post || !post.isPublished) {
        return res.status(404).send({ message: "Cannot find post with ID" });
      }
      post.views++;
      await post.save();
      res.send(post);
    } catch {
      res.status(500).send({ message: "Error in finding post with ID" });
    }
  });

  router.get("/drafts/:id", authMiddleware, async (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.summary = 'Fetch a draft'
    const _id = req.params.id;

    try {
      const post = await Post.findOne({
        _id,
        author: req.user._id,
        isPublished: false,
      });
      if (!post) {
        return res.status(404).send({ message: "Cannot find post with ID" });
      }
      res.send(post);
    } catch {
      res.status(500).send({ message: "Error in finding post with ID" });
    }
  });

  router.get("/drafts/:id/avatar", authMiddleware, async (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.summary = 'Fetch a draft avatar'
    const _id = req.params.id;

    try {
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
      res.set("Content-Type", "image/png").send(post.coverImage);
    } catch {
      res
        .status(500)
        .send({ message: `Error in fetching cover image of post ${_id}` });
    }
  });

  router.get("/drafts", authMiddleware, async (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.summary = 'Fetch all drafts'
    try {
      const posts = await Post.find({
        author: req.user._id,
        isPublished: false,
      });
      res.send(posts);
    } catch {
      res.status(500).send({ message: "Error in finding post with ID" });
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
      res.set("Content-Type", "image/png");
      res.send(post.coverImage);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Get an error while fetching cover image" });
    }
  });
};
