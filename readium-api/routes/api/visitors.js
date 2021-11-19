/**
 ** Visitors / Unauthenticated users routes
 */

const router = require("express").Router();
const User = require("../../models/User");

router.get("/avatar/:id", async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get specific user's image'
  /*
    #swagger.parameters['id'] = {
      description: 'user id',
      in: 'path',
      type: 'string',
    }
  */

  if (!req.params.id) {
    // #swagger.responses[400] = { description: 'Send back user avatar' }
    return res.status(400).send({ message: ["Please send user id"] });
  }
  try {
    const avatar = await User.findById(req.params.id, { avatar: 1 });
    res.set("Content-Type", "image/png");
    // #swagger.responses[200] = { description: 'Send back user avatar' }
    return res.send(avatar.avatar);
  } catch (err) {
    // #swagger.responses[500] = { description: 'Object Id is error or mongodb error' }
    return res.status(500).send({ message: ["Error when fetching avatar"] });
  }
});

module.exports = router;
