const Post = require("../../../models/Post");
const { getImageUrl } = require("../../../utils");

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
      post.imageUrl = getImageUrl(post._id);
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
    let { date = new Date().toString(), skip = "0" } = req.query;
    skip = +skip;
    date = new Date(date);

    if (Number.isNaN(skip)) {
      return res
        .status(400)
        .send({ message: "skip parameter must be a number" });
    }

    try {
      if (date.toString() === "Invalid Date") {
        let posts = JSON.parse(
          JSON.stringify(
            await Post.find(
              {
                isPublished: true,
              },
              { coverImage: 0 }
            )
              .skip(skip)
              .sort({ publishDate: -1 })
              .limit(5)
          )
        );
        posts = posts.map((post) => {
          post.imageUrl = getImageUrl(post._id);
          return post;
        });

        return res.send({ posts, next: skip + 5 });
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
            .sort({ publishDate: -1 })
            .skip(skip)
            .limit(5)
        )
      );

      posts = posts.map((post) => {
        post.imageUrl = getImageUrl(post._id);
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

  router.get("/:id/cover-image", async (req, res) => {
    /*
      #swagger.tags = ['Post']
      #swagger.summary = "Get post's cover image"
    */
    try {
      const post = await Post.findById(req.params.id);
      if (!post.isPublished) {
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
