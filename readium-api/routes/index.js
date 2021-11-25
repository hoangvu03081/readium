/**
 * * This routes will forward all routes to the express app
 */

const router = require("express").Router();

const authRoute = require("./auth");
const usersRoute = require("./api/users");
const profileRoute = require("./api/profile");
const collectionRoute = require("./api/collection");

/**
 *! Dev routes
 */
const User = require("../models/User");
const collectionSchema = require("../models/Collection");
const Post = require("../models/Post");

router.get("/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = 'Get all users'
  const users = await User.find({});
  res.send(users);
});

router.get("/collections", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = "Get all users' collections"
  const users = await User.find();
  const collections = users
    .map((user) => user.collections)
    .reduce((acc, collections) => [...acc, ...collections], []);

  res.send(collections);
});

router.delete("/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.summary = 'Delete all users'
  await User.deleteMany();
  res.send();
});

router.delete("/", async (req, res) => {
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
router.use("/users/profile", profileRoute);
router.use("/users/collections", collectionRoute);

module.exports = router;
