const app = require("./app");
const port = process.env.PORT || 5000;

const server = app.listen(port);

const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Notification = require("./models/Notification");
const { sessionsParser } = require("./config");
const {
  PUB_KEY,
  authMiddleware,
  REQUIRE_ACTIVATE_ACCOUNT,
  NO_AUTH_TOKEN,
} = require("./utils");
const { checkCommentContent } = require("./middleware/comments-middleware");

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", function (req, socket, head) {
  wss.handleUpgrade(req, socket, head, function (ws) {
    wss.emit("connection", ws, req, socket);
  });
});

wss.on("connection", function (ws, req, socket) {
  sessionsParser(req, {}, async function () {
    const userId = req.session?.passport?.user;
    if (userId) {
      const user = await User.findById(userId);
      ws.user = user;
    }
  });
  ws.on("message", async function (data) {
    const action = JSON.parse(data.toString());
    switch (action.type) {
      case "setAuth": {
        const jwtPayload = jwt.verify(action.payload.token.slice(7), PUB_KEY, {
          algorithms: "RS256",
        });
        const user = await User.findById(jwtPayload.vux);
        ws.user = user;
        break;
      }
    }
  });
  ws.on("close", function () {});
});

// app.post("/notifications/:userId", authMiddleware, async (req, res) => {
//   /*
//     #swagger.tags = ['Notification']
//     #swagger.security = [{
//       "bearerAuth": []
//     }]
//   */
//   try {
//     console.log(req.session);
//     wss.clients.forEach((client) => {
//       if (!client.user) return;

//       if (client.user._id.toString() === req.params.userId) {
//         client.send(
//           JSON.stringify({
//             type: "notification",
//             payload: {
//               from: req.user._id,
//               content: "send from swagger",
//               url: "",
//               createdAt: "",
//             },
//           })
//         );
//       }
//     });
//     return res.send();
//   } catch (err) {
//     return res
//       .status(500)
//       .send({ message: "Something went wrong in send notifications" });
//   }
// });

app.post("/posts/:postId/like", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Post']
    #swagger.summary = 'Like post'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const postId = req.params.postId;
    let post = await Post.findById(postId).populate("author");
    if (!post) {
      return res.status(404).send({ message: "Cannot find post with ID" });
    }

    const isLikedIndex = req.user.liked.findIndex(
      (pId) => pId.toString() === postId
    );

    const userId = req.user._id.toString();
    if (isLikedIndex === -1) {
      req.user.liked.push(postId);
      post.likes.push(userId);

      const postAuthor = post.author._id.toString();
      if (postAuthor !== userId) {
        // create a notification to postAuthor ?
        const notification = new Notification({
          from: userId,
          to: postAuthor,
          content: `${req.user.displayName} liked ${post.title}`,
          url: "unavailable",
        });
        await notification.save();
        post.author.notifications.push(notification._id);
        await post.author.save();

        for (let client of wss.clients) {
          if (!client.user) continue;
          if (client.user._id.toString() === postAuthor) {
            client.send(
              JSON.stringify({
                type: "notification",
                payload: notification,
              })
            );
            break;
          }
        }
      }
    } else {
      req.user.liked.splice(isLikedIndex, 1);
      post.likes.splice(
        post.likes.findIndex((uId) => uId.toString() === userId),
        1
      );
    }

    await req.user.save();
    await post.save();
    return res.send(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error in like post" });
  }
});

app.post(
  "/posts/:postId/comments",
  authMiddleware,
  checkCommentContent,
  async (req, res) => {
    /*
    #swagger.tags = ['Comment']
    #swagger.summary = 'Comment on the post'
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
      const { content } = req.body;

      const post = await Post.findById(postId, {
        title: 1,
        comments: 1,
      }).populate("author");
      if (!post) {
        return res.status(404).send({
          message: `Post ${postId} not found. Please be sure that this id is correct!`,
        });
      }

      const userId = req.user._id.toString();
      const commentObj = new Comment({ user: userId, content, post: postId });
      await commentObj.save();

      post.comments.push(commentObj._id);
      await post.save();

      const postAuthor = post.author._id.toString();
      if (userId !== postAuthor) {
        // create a notification to postAuthor
        const notification = new Notification({
          from: userId,
          to: postAuthor,
          content: `${req.user.displayName} commented on ${post.title}`,
          url: "unavailable",
        });
        await notification.save();
        post.author.notifications.push(notification._id);
        await post.author.save();

        for (let client of wss.clients) {
          if (!client.user) continue;

          if (client.user._id.toString() === postAuthor) {
            client.send(
              JSON.stringify({
                type: "notification",
                payload: notification,
              })
            );
            break;
          }
        }
      }

      return res.status(201).send(commentObj);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: `Something went wrong when create a comment of post`,
      });
    }
  }
);

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
