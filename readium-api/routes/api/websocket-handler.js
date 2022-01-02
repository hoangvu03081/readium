const jwt = require("jsonwebtoken");

const { sessionsParser } = require("../../config");
const { PUB_KEY, authMiddleware } = require("../../utils");
const { checkCommentContent } = require("../../middleware/comments-middleware");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Notification = require("../../models/Notification");
let notifications = [];

module.exports = function (app, wss) {
  if (app && wss) {
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
            const jwtPayload = jwt.verify(
              action.payload.token.slice(7),
              PUB_KEY,
              {
                algorithms: "RS256",
              }
            );
            const user = await User.findById(jwtPayload.id);
            ws.user = user;
            break;
          }
        }
      });
    });

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
            notifications.unshift(notification);
            await post.author.save();

            for (let client of wss.clients) {
              if (!client.user) continue;
              if (client.user._id.toString() === postAuthor) {
                client.send(
                  JSON.stringify({
                    type: "notification",
                    payload: notifications,
                  })
                );
                break;
              }
            }
          }
        } else {
          req.user.liked.splice(isLikedIndex, 1);
          await Notification.deleteMany({
            content: `${req.user.displayName} liked ${post.title}`,
          });
          post.likes.splice(
            post.likes.findIndex((uId) => uId.toString() === userId),
            1
          );
        }

        await req.user.save();
        await post.save();
        return res.send({ likes: post.likes.length });
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
              message: `Post not found. Please be sure that post id is correct!`,
            });
          }

          const userId = req.user._id.toString();
          const commentObj = new Comment({
            user: userId,
            content,
            post: postId,
          });
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
            notifications.unshift(notification);
            await post.author.save();

            for (let client of wss.clients) {
              if (!client.user) continue;

              if (client.user._id.toString() === postAuthor) {
                client.send(
                  JSON.stringify({
                    type: "notification",
                    payload: notifications,
                  })
                );
                break;
              }
            }
          }

          return res.status(201).send(await commentObj.getCommentDetails());
        } catch (err) {
          return res.status(500).send({
            message: `Something went wrong when create a comment of post`,
          });
        }
      }
    );
  }

  return {
    resetNotifications() {
      notifications = [];
    },
  };
};
