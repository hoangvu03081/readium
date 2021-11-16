/**
 * * This routes will forward all routes to the express app
 */

const router = require("express").Router();

// * The route for authentication
const authRoute = require("./auth");
// * The route for visitors
const visitorsRoute = require("./api/visitors");
// * The route for authenticated users
const usersRoute = require("./api/users");

/**
 *! Route used in development for testing
 */
const User = require("../models/User");

// ! GET ALL USERS
router.get("/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.description = 'Get all users'
  const users = await User.find({}, { avatar: 0 });
  res.send(users);
});

// ! DELETE ALL USERS
router.delete("/users", async (req, res) => {
  // #swagger.tags = ['Dev']
  // #swagger.description = 'Delete all users'
  await User.deleteMany();
  res.send();
});

/**
 *! Route used in development for testing
 */

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/users", visitorsRoute);

module.exports = router;
