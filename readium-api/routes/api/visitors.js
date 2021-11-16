/**
 ** Visitors / Unauthenticated users routes
 */

const router = require("express").Router();
const User = require("../../models/User");

router.get("/:id/avatar", async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get specific user's image'

  const avatar = await User.findById(req.params.id, { avatar: 1 });
  res.set("Content-Type", "image/png");
  
  // #swagger.responses[200] = { description: 'Send back user avatar' }
  res.send(avatar.avatar);
});

module.exports = router;
