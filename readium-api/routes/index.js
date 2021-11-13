const router = require("express").Router();
1;

module.exports = function (passport) {
  const authRoute = require("./auth")(passport);
  const visitorsRoute = require("./api/visitors");
  const usersRoute = require("./api/users");
  /**
   *! Route used in development for testing
   */
  const User = require("../models/User");

  // ! GET ALL USERS
  router.get("/users", async (req, res) => {
    const users = await User.find({}, { avatar: 0 });
    res.send(users);
  });

  // ! DELETE ALL USERS
  router.delete("/users", async (req, res) => {
    await User.deleteMany();
    res.send();
  });

  /**
   *! Route used in development for testing
   */

  router.use(authRoute);
  router.use(visitorsRoute);
  router.use(usersRoute);
  return router;
};
