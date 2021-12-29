const router = require("express").Router();

const devRoute = require("./dev");
const authRoute = require("./auth");
const usersRoute = require("./api/users");
const profilesRoute = require("./api/profiles");
const collectionsRoute = require("./api/collections");
const postsRoute = require("./api/posts");
const commentsRoute = require("./api/comments");
const draftsRoute = require("./api/drafts");
const topicsRoute = require("./api/topics");

router.use("/dev", devRoute);
router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/users/profiles", profilesRoute);
router.use("/users/collections", collectionsRoute);
router.use("/posts", postsRoute);
router.use(commentsRoute);
router.use("/drafts", draftsRoute);
router.use("/topics", topicsRoute);

module.exports = router;
