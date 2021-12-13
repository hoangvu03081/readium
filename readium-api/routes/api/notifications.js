const router = require("express").Router();

const { authMiddleware } = require("../../utils/auth");

// get notifications
router.get("/", authMiddleware, async (req, res) => {
  try {
    
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong in get notifications" });
  }
});

// send notification

module.exports = router;
