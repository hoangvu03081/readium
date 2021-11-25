/**
 * * This routes will forward all routes to the express app
 */

const router = require("express").Router();

const authRoute = require("./auth");
const visitorsRoute = require("./api/visitors");
const usersRoute = require("./api/users");
const postRoute = require("./api/posts")

/**
 *! Dev routes
 */
const User = require("../models/User");

router.get("/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.description = 'Get all users'
  const users = await User.find({}, { avatar: 0 });
  res.send(users);
});

router.delete("/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.description = 'Delete all users'
  await User.deleteMany();
  res.send();
});

/**
 *! Dev routes
 */

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/users", visitorsRoute);
router.use("/posts", postRoute)

module.exports = router;
