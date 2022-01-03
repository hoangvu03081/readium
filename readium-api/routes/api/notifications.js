const router = require("express").Router();
const Notification = require("../../models/Notification");
const { resetNotifications } = require("./websocket-handler")();

router.get("/", async (req, res) => {
  /*
    #swagger.tags = ['Notification']
    #swagger.summary = 'Get all notifications'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    resetNotifications();
    const notifications = await Notification.find();
    return res.send(notifications);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong while fetching notifications" });
  }
});

module.exports = router;
