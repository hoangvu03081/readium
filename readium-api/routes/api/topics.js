const router = require("express").Router();

router.get("/trending", async (req, res) => {
  /*
    #swagger.tags = ['Topic']
    #swagger.summary = 'Get all trending topics'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    return res.send([
      "Hỏi sir Sơn giá trị tag để return cứng trước",
      "đợi Vũ senpai làm hàm này",
    ]);
  } catch (err) {
    return res.send({ message: "Some errors occurred in get trending topics" });
  }
});

module.exports = router;
