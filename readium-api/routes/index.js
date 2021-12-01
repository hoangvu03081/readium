/**
 * * This routes will forward all routes to the express app
 */

const router = require("express").Router();

const authRoute = require("./auth");
const usersRoute = require("./api/users");
const profilesRoute = require("./api/profiles");
const collectionsRoute = require("./api/collections");
const postsRoute = require("./api/posts");
const commentsRoute = require("./api/comments");

/**
 *! Dev routes
 */
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/dev/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = 'Get all users'
  const users = await User.find({}, { avatar: 0 });
  res.send(users);
});

router.get("/dev/collections", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = "Get all users' collections"
  const users = await User.find();
  const collections = users
    .map((user) => user.collections)
    .reduce((acc, collections) => [...acc, ...collections], []);

  res.send(collections);
});

router.get("/dev/posts", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = "Get all posts"
  const posts = await Post.find({}, { coverImage: 0 });
  return res.send(posts);
});

router.delete("/dev/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = 'Delete all users'
  await User.deleteMany();
  res.send();
});

router.delete("/dev", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = 'Delete all data'
  await User.deleteMany();
  await Post.deleteMany();
  res.send();
});

/**
 *! Dev routes
 */

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/users/profiles", profilesRoute);
router.use("/users/collections", collectionsRoute);
router.use("/posts", postsRoute);
router.use("/posts/:id/comments", commentsRoute);

module.exports = router;
