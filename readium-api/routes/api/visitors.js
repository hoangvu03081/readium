/**
 ** Visitors / Unauthenticated users routes
 */

const router = require("express").Router();
const User = require("../../models/User");

router.get("/users/:id/avatar", async (req, res) => {
  const avatar = await User.findById(req.params.id, { avatar: 1 });
  res.set("Content-Type", "image/png");
  res.send(avatar.avatar);
});

module.exports = router;
