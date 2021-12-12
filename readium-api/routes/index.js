const router = require("express").Router();

const devRoute = require("./dev");

const authRoute = require("./auth");
const usersRoute = require("./api/users");
const profilesRoute = require("./api/profiles");
const collectionsRoute = require("./api/collections");
const postsRoute = require("./api/posts");
const draftsRoute = require("./api/drafts");
const commentsRoute = require("./api/comments");

router.use("/dev", devRoute);
router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/users/profiles", profilesRoute);
router.use("/users/collections", collectionsRoute);
router.use("/posts", postsRoute);
router.use("/drafts", draftsRoute);
router.use("/posts/:id/comments", commentsRoute);

module.exports = router;
