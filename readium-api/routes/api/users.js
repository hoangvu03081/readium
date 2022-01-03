const router = require("express").Router();
const Post = require("../../models/Post");
const User = require("../../models/User");
const Notification = require("../../models/Notification");
const Comment = require("../../models/Comment");
const Collection = require("../../models/Collection");
const { getPostCoverImageUrl, authMiddleware } = require("../../utils");
const { deletePostMongoose } = require("../../utils/posts");
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

router.get("/recommended", async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Get recommended writers'
    #swagger.security = [{
      "bearerAuth": []
    }]
   */
  try {
    const count = await User.countDocuments();

    let random = Math.floor(Math.random() * count),
      acc = 0;

    while (count - random < 10 && acc >= 1 && count > 10) {
      acc += 0.1;
      random = Math.floor((Math.random() - acc) * count);
    }

    let users = await User.find().skip(random).limit(10);
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

    if (authorIndex === -1) {
      followings.push(userId);
      user.followers.push(_id);
    } else {
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

router.delete("/", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = "Delete account"
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const id = req.user._id.toString();
    const deletedUser = await User.findById(id);

    // delete posts of user
    let temp = await Post.find({ author: id });
    for (const post of temp) {
      await deletePostMongoose(post);
    }
    // delete likes from user
    temp = await Post.find({ likes: req.user._id });
    for (const post of temp) {
      post.likes.splice(
        post.likes.findIndex((uId) => uId.toString() === id),
        1
      );
      await post.save();
    }

    // delete from db users followings field who have ref to this user
    temp = await User.find({ followings: req.user._id });
    for (const user of temp) {
      user.followings.splice(
        user.followings.findIndex((uId) => uId.toString() === id),
        1
      );
      await user.save();
    }
    // delete from db users who followers field who have ref to this user
    temp = await User.find({ followers: req.user._id });
    for (const user of temp) {
      user.followers.splice(
        user.followers.findIndex((uId) => uId.toString() === id),
        1
      );
      await user.save();
    }
    // delete all notifications to this user
    await Notification.deleteMany({ to: req.user._id });
    // delete all comments of this users
    const comments = await Comment.find({ user: req.user._id }, { _id: 1 });
    const commentIds = comments.map((comment) => comment._id);
    temp = await Post.find({ comments: { $in: commentIds } });
    for (const post of temp) {
      post.comments.splice(
        post.comments.findIndex((cId) =>
          commentIds.some((c) => c.toString() === cId.toString())
        )
      );
      await post.save();
    }

    await Comment.deleteMany({ user: req.user._id });
    // delete collections of user
    await Collection.deleteMany({ user: req.user._id });
    // delete user
    await User.deleteOne({ _id: id });
    try {
      await deleteUser(id);
    } catch (err) {}
    deletedUser.id = deletedUser._id;
    delete deletedUser._id;
    return res.send({
      message: "Sorry to see you go.",
      user: deletedUser.getPublicProfile(),
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when delete account" });
  }
});

module.exports = router;
