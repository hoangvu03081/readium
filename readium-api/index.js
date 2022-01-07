const app = require("./app");
const port = process.env.PORT || 5000;

const server = app.listen(port);

const Post = require("./models/Post");
const User = require("./models/User");
const { WebSocketServer } = require("ws");
const {
  REQUIRE_ACTIVATE_ACCOUNT,
  NO_AUTH_TOKEN,
  getPostCoverImageUrl,
  getAvatarUrl,
  authMiddleware,
} = require("./utils");
const {
  search,
  searchProfilePost,
  searchProfileDraft,
  PostSortField,
  SortType,
} = require("./utils/elasticsearch");

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", function (req, socket, head) {
  wss.handleUpgrade(req, socket, head, function (ws) {
    wss.emit("connection", ws, req, socket);
  });
});

require("./routes/api/websocket-handler")(app, wss);

app.post("/search", async (req, res) => {
  /*
    #swagger.tags = ['Search']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              keyword: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  */
  try {
    const { keyword } = req.body;
    if (!keyword) {
      return res.send([]);
    }
    const arr = req.body.keyword.split(" ");
    const text = arr.filter((word) => word[0] !== "#").join(" ");
    const tags = arr.filter((word) => word[0] === "#").join(" ");
    const result = await search(text, tags);

    const arrResult = [];

    for (let ele of result.body.hits.hits) {
      switch (ele._index) {
        case "post": {
          let post = await Post.findById(ele._id, {
            title: 1,
            content: 1,
            description: 1,
            tags: 1,
            duration: 1,
            likes: 1,
            comments: 1,
            isPublished: true,
          }).populate("author", { _id: 1 });
          post = post?.toObject();
          if (post) {
            post.id = post._id;
            post.author.id = post.author._id;
            post.url = `/post/${post.id.toString()}`;
            post.type = "post";
            post.likes = post.likes.length;
            post.comments = post.comments.length;
            post.coverImage = getPostCoverImageUrl(post.id);
            post.author.avatar = getAvatarUrl(post.author.id);
            delete post._id;
            delete post.author._id;
          }
          arrResult.push(post);
          break;
        }
        case "user": {
          let user = await User.findById(ele._id, {
            displayName: 1,
            profileId: 1,
          });
          user = user?.toObject();
          if (user) {
            user.url = `/profile/${user.profileId}`;
            user.type = "user";
          }

          arrResult.push(user);
          break;
        }
        default:
      }
    }
    return res.send(arrResult);
  } catch (err) {
    return res.status(500).send({ message: "Error in search" });
  }
});

app.post("/search-profile-post/:userId", async (req, res) => {
  /*
    #swagger.tags = ['Search']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              keyword: {
                type: 'string'
              },
              sortType: {
                type: 'string',
                default: 'desc'
              },
              sortField: {
                type: 'string',
                default: 'publishDate'
              },
              skip: {
                type: 'number',
                default: 0
              }
            }
          }
        }
      }
    }
  */
  try {
    if (req.body.sortType) {
      if (Object.values(SortType).every((type) => type !== req.body.sortType)) {
        return res.status(400).send({ message: "Your sort type is not valid" });
      }
    }
    if (req.body.sortField) {
      if (
        Object.values(PostSortField).every(
          (field) => field !== req.body.sortField
        )
      ) {
        return res
          .status(400)
          .send({ message: "Your sort field is not valid" });
      }
    }
    if (req.body.skip) {
      if (Number.isNaN(+req.body.skip)) {
        return res
          .status(400)
          .send({ message: "Your skip number is not valid" });
      }
    }
    if (!req.body.keyword) {
      let posts = await Post.find({
        author: req.params.userId,
        isPublished: true,
      });
      posts = await Promise.all(posts.map((post) => post.getPostPreview()));
      return res.send(posts);
    }
    const arr = req.body.keyword.split(" ");
    const query = arr.filter((word) => word[0] !== "#").join(" ");
    const tags = arr.filter((word) => word[0] === "#").join(" ");
    const result = await searchProfilePost(
      query,
      req.params.userId,
      tags,
      req.body.sortType || undefined,
      req.body.sortField || undefined,
      req.body.skip || undefined
    );
    let arrResult = await Promise.all(
      result.body.hits.hits.map((doc) => Post.findById(doc._id))
    );
    arrResult = arrResult.map((post) => post.getProfilePost(req.params.userId));
    return res.send(arrResult);
  } catch (err) {
    return res.status(500).send({ message: "Error in search profile posts" });
  }
});

app.post("/search-profile-draft", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Search']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              keyword: {
                type: 'string'
              },
              sortType: {
                type: 'string',
                default: 'desc'
              },
              sortField: {
                type: 'string',
                default: 'publishDate'
              },
              skip: {
                type: 'number',
                default: 0
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
    if (req.body.sortType) {
      if (Object.values(SortType).every((type) => type !== req.body.sortType)) {
        return res.status(400).send({ message: "Your sort type is not valid" });
      }
    }
    if (req.body.sortField) {
      if (
        Object.values(PostSortField).every(
          (field) => field !== req.body.sortField
        )
      ) {
        return res
          .status(400)
          .send({ message: "Your sort field is not valid" });
      }
    }
    if (req.body.skip) {
      if (Number.isNaN(+req.body.skip)) {
        return res
          .status(400)
          .send({ message: "Your skip number is not valid" });
      }
    }
    if (!req.body.keyword) {
      let posts = await Post.find({
        author: req.user._id,
        isPublished: false,
      });
      posts = await Promise.all(posts.map((post) => post.getPostPreview()));
      return res.send(posts);
    }

    const result = await searchProfileDraft(
      req.body.keyword,
      req.user._id.toString(),
      req.body.sortType || undefined,
      req.body.sortField || undefined,
      req.body.skip || undefined
    );

    let arrResult = await Promise.all(
      result.body.hits.hits.map((doc) => Post.findById(doc._id))
    );
    arrResult = arrResult.map((post) =>
      post.getProfilePost(req.user._id.toString())
    );
    return res.send(arrResult);
  } catch (err) {
    return res.status(500).send({ message: "Error in search profile drafts" });
  }
});

app.use((req, res) => {
  return res.status(404).send({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  if (err.message === REQUIRE_ACTIVATE_ACCOUNT) {
    return res.status(401).send({
      message: "Please activate your account before doing this action!",
    });
  } else if (err.message === NO_AUTH_TOKEN) {
    return res.status(401).send({ message: "Unauthenticated" });
  }
  console.log(err);
  return res.status(500).send({ message: "Some errors" });
});
