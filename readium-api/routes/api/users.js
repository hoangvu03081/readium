const router = require("express").Router();
const Post = require("../../models/Post");
const User = require("../../models/User");
const { getPostCoverImageUrl, authMiddleware } = require("../../utils");
const { deleteUser } = require("../../utils/elasticsearch");

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

//TODO: review
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
      post.imageUrl = getPostCoverImageUrl(post.id);
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

router.get("/recommended", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get recommended writers'
    #swagger.security = [{
      "bearerAuth": []
    }]
   */
  try {
    let users = await User.find().limit(10);
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
    const { _id, followings } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
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
      user.followers.push(_id);
    }
    // if user followed this author -> now unfollowing
    else {
      followings.splice(authorIndex, 1);
      user.followers.splice(
        user.followers.findIndex(
          (userId) => userId.toString() === _id.toString()
        ),
        1
      );
    }

    await user.save();
    await req.user.save();

    // #swagger.responses[200] = { description: 'Success' }
    return res.send(user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Error saving changes to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occur in follow user" });
  }
});

// TODO: need test
router.delete("/", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = "Delete my account"
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const id = req.user._id.toString();
    const deletedUser = await User.findById(id).populate("liked");

    const promises = deletedUser.liked.map((post) => {
      const uId = post.likes.findIndex((u) => u.toString() === id);
      if (uId !== -1) {
        post.likes.splice(uId, 1);
        return post.save();
      }
    });
    await Promise.all(promises);
    await User.deleteOne({ _id: id });

    deleteUser(id);

    return res.send({ message: "Sorry to see you go.", user: deletedUser });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when delete account" });
  }
});

module.exports = router;
