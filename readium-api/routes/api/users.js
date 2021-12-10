const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../../models/Post");
const User = require("../../models/User");
const { getImageUrl } = require("../../utils");
const { authMiddleware } = require("../../utils/auth");
const { checkEmpty, validatePassword } = require("../../utils/validator");

router.get("/protected", authMiddleware, (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Route for testing authenticated users'
    #swagger.security = [{
      "bearerAuth": []
    }]
   */

  return res.send({ profileId: req.user.profileId });
});

router.delete("/", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = "Delete my account"
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    return res.send({ message: "Sorry to see you go.", user: deletedUser });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when delete account" });
  }
});

router.get("/following/posts", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = "Get following writers' posts"
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
            author: { $in: req.user.followings },
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
      .send({ message: "Something went wrong when get following posts" });
  }
});

router.get("/follow/:userId", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ["User"]
    #swagger.summary = "Is follow user"
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  const is_followed = req.user.followings.some(
    (userId) => userId.toString() === req.params.userId
  );
  return res.send({ is_followed });
});

router.post("/follow/:userId", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'User follow users'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const { userId } = req.params;
    const { followings } = req.user;

    if (!userId) {
      // #swagger.responses[400] = { description: "Please provide user's id to follow" }
      return res.status(400).send({
        message: "Please provide user's id to use this follow endpoint",
      });
    }

    if (req.user._id.toString() === userId) {
      return res
        .status(400)
        .send({ message: "User should not follow him or herself" });
    }

    const authorIndex = followings.findIndex((authorId) => {
      return authorId.toString() === userId;
    });

    // if user didn't follow this author -> now following
    if (authorIndex === -1) {
      followings.push(userId);
    }
    // if user followed this author -> now unfollowing
    else {
      followings.splice(authorIndex, 1);
    }

    await req.user.save();
    const message =
      authorIndex === -1
        ? `${req.user._id} follows ${userId}.`
        : `${req.user._id} unfollows ${userId}.`;

    // #swagger.responses[200] = { description: 'Success' }
    return res.send({ message });
  } catch (err) {
    // #swagger.responses[500] = { description: 'Error saving changes to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occur in follow user" });
  }
});

router.get("/recommended", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get recommended writers'
    #swagger.security = [{
      "bearerAuth": []
    }]
   */
  let users = [];
  try {
    users = await User.find().limit(10);
    users = users.map((user) => user.getPublicProfile());

    // #swagger.responses[200] = { description: 'Successfully recommend users' }
    return res.send(users);
  } catch (err) {
    // #swagger.responses[500] = { description: 'Error while finding in mongoose.' }
    return res
      .status(500)
      .send({ message: "Error while get recommended users" });
  }
});


module.exports = router;
