const router = require("express").Router();

const authRoute = require("./auth");
const usersRoute = require("./api/users");
const profilesRoute = require("./api/profiles");
const collectionsRoute = require("./api/collections");
const postsRoute = require("./api/posts");
const commentsRoute = require("./api/comments");
const draftsRoute = require("./api/drafts");
const topicsRoute = require("./api/topics");
const notificationsRoute = require("./api/notifications");

if (process.env.NODE_ENV === "development")
  router.use("/dev", require("./dev"));

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/users/profiles", profilesRoute);
router.use("/users/collections", collectionsRoute);
router.use("/posts", postsRoute);
router.use("/drafts", draftsRoute);
router.use("/topics", topicsRoute);
router.use("/notifications", notificationsRoute);
router.use(commentsRoute);

module.exports = router;
